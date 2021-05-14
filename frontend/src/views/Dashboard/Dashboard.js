/* eslint-disable react/prefer-stateless-function */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import AppBar from '@material-ui/core/AppBar';
import Header from '../Header/Header';
import DashboardAppBar from '../ToolBar/DashboardAppBar';
import TextDisplayCard from '../Cards/TextDisplayCard';
import SideBar from './Sidebar/Sidebar';
import TopBar from '../ToolBar/TopBar';
import constants from '../../constants/constants';
import AdvertisementCard from '../Cards/AdvertisementCard/AdvertisementCard';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      errormessage: '',
      posts: [],
      searchText: '',
      searchResult: []
    };
  }

  componentDidMount() {
    this.getPost();
  }

  handleSearchChange = (e) => {
    console.log("handleSearchChange: ", e);
    this.state.searchText = e;
    // setSearchText(e);
  }

  handleSearchRequest = async (e) => {
    console.log("handleSearchRequest: ", e);
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    setTimeout(async () => {
      await axios
        .get(`${constants.baseUrl}/posts/searchPostsCriteria?searchText=${this.searchText}`)
        .then((response, error) => {
          if (!error) {
            console.log("Response: ", response);
            this.state.searchResult = response.data.data;
            // setSearchResult(response.data.data);
          }
          else {
            console.log("Error: ", error);
          }
        })
    }, 10)

  }

  getPost = () => {
    const userId = localStorage.getItem('user');
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/post/?user=${userId}`)
      .then((response, error) => {
        if (error) {
          this.setState({ errormessage: error.msg });
        } else {
          this.setState({ posts: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { errormessage, posts } = this.state;

    return (
      <div>
        <Header />
        <Container>
          {errormessage ? (
            <div className="alert alert-danger" role="alert">
              {errormessage}
            </div>
          ) : null
          }
          <Row>
            <Col md={8}>
              <br />
              <DashboardAppBar />
              <AppBar position="static" color="white" style={{ marginBottom: '10px' }}>
                <SearchBar style={{ width: '100%' }}
                  value="" placeholder="Search Posts..."
                  onChange={this.handleSearchChange}
                  onRequestSearch={this.handleSearchRequest}
                />
              </AppBar>

              <TopBar style={{ marginTop: '2%' }} />
              {posts.map((p) => (
                <TextDisplayCard post={p} />
              ))}
            </Col>
            <Col md={4}>
              <br />
              <Row>
                <div
                  style={{
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid darkgray',
                    backgroundColor: 'white',
                  }}>
                  <SideBar />
                </div>
              </Row>
              <br />
              <Row>
                <div
                  className="bars-wrapper-inside"
                  style={{
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid darkgray',
                    backgroundColor: 'white',
                  }}
                >
                  <AdvertisementCard />
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
