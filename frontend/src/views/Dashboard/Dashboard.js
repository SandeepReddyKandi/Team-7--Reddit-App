/* eslint-disable react/prefer-stateless-function */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Header from '../Header/Header';
import CommunityAppBar from '../ToolBar/CommunityAppBar';
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
    };
    this.getPost();
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    const userId = localStorage.getItem('userId');
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
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
        const errormessage = error.response && error.response.data ? error.response.data.msg : 'Something went wrong while getting posts'
        this.setState({ errormessage });
      });
  };

  render() {
    const { errormessage, posts } = this.state;

    return (
      <div>
        <Header />
        <Container>
          <Row>
            {' '}
            {errormessage !== '' ? (
              <div className="alert alert-danger" role="alert">
                {errormessage}
              </div>
            ) : null}
          </Row>
          <Row>
            <Col md={8}>
              <br />
              <CommunityAppBar />
              <TopBar />
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
