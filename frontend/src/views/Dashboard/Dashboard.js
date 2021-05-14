/* eslint-disable react/prefer-stateless-function */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import AppBar from '@material-ui/core/AppBar';
import Header from '../Header/Header';
import DashboardAppBar from '../ToolBar/DashboardAppBar';
import TextDisplayDashboardCard from '../Cards/TextDisplayDashboardCard';
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
    this.setState({ searchText: e });
  };

  handleSearchRequest = async (e) => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    setTimeout(async () => {
      await axios
        .get(`${constants.baseUrl}/posts/searchPostsCriteria?searchText=${this.state.searchText}`)
        .then((response, error) => {
          if (!error) {
            this.setState({ searchResult: response.data.data });
            this.getFilteredPost();
          } else {
            console.log('Error: ', error);
          }
        });
    }, 10);
  };

  getFilteredPost = () => {
    if (this.state.searchResult.length > 0) this.setState({ posts: this.state.searchResult });
    else this.getPost();
  };

  getPost = () => {
    const userId = localStorage.getItem('userId');
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/post/?user=${userId}`)
      .then((response, error) => {
        if (error) {
          this.setState({ errormessage: error.msg });
        } else {
          this.setState({ posts: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
        const errormessage =
          error.response && error.response.data
            ? error.response.data.msg
            : 'Something went wrong while getting posts';
        this.setState({ errormessage });
      });
  };

  sortPostByUpvote = async () => {
    //const { community, page, rows } = this.state;
    const data = {
      userId: localStorage.getItem('userId')
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/posts/sortDashPostsByUpvotes`, data)
      .then((response, error) => {
        if (!error) {
          //if (this.state.searchResult.length > 0){
          this.state.searchResult.forEach((element) => {
            console.log('element', element);
          });
          //} else {
          // this.setState({
          //   posts: response.data.data,
          // });
          // }
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  sortPostByUser = async () => {
    const { community, page, rows } = this.state;
    const data = {
      userId: localStorage.getItem('userId'),
      id: community._id,
      page,
      rows,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/post/downvote/sort`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            posts: response.data.data,
            totalRows: response.data.data.length,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  sortPostByComment = async () => {
    const { community, page, rows } = this.state;
    const data = {
      userId: localStorage.getItem('userId'),
      id: community._id,
      page,
      rows,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/post/date/sort`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            posts: response.data.data,
            totalRows: response.data.data.length,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
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
          ) : null}
          <Row>
            <Col md={8}>
              <br />
              <DashboardAppBar
                upvote={this.sortPostByUpvote}
                user={this.sortPostByUser}
                comment={this.sortPostByComment}
                show={this.handleModal}
              ></DashboardAppBar>
              <AppBar position="static" color="white" style={{ marginBottom: '10px' }}>
                <SearchBar
                  style={{ width: '100%' }}
                  value=""
                  placeholder="Search Posts..."
                  onChange={this.handleSearchChange}
                  onRequestSearch={this.handleSearchRequest}
                />
              </AppBar>

              <TopBar style={{ marginTop: '2%' }} />
              {!posts.length && <div>Nothing to show</div>}
              {posts.map((p) => (
                <TextDisplayDashboardCard post={p} />
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
                  }}
                >
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
