/* eslint no-underscore-dangle: ["error", { "allow": ["__place"] }] */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import RedditICon from '../../community.png';
import TextDisplayCard from '../Cards/TextDisplayCard';
import ImageDisplayCard from '../Cards/ImageDisplayCard';
import UrlDisplayCard from '../Cards/UrlDisplayCard';
import AboutCommunityCard from '../Cards/AboutCommunityCard';
import CommunityRulesCard from '../Cards/CommunityRulesCard';
import CommunityAppBar from '../ToolBar/CommunityAppBar';
import ImageModal from './ImageModal';
import constants from '../../constants/constants';

import * as communityAction from '../../actions/CommunityHomePageActions';

import CommunityMembersList from '../Cards/CommunityMembersList';

class CommunityHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: this.props,
      page: 0,
      rows: 2,
      totalRows: 0,
      post: false,
      posts: [],
      showPage: false,
      show: false,
      status: {
        status: '',
      },
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    await this.setState({ community: location.community, redirect: false });
    await this.checkStatus();

    await this.getCommunity();
    await this.getPost();
  }

  createPost = () => {
    const { post } = this.state;
    this.setState({ post: !post });
  };

  handleChangePage = (e, newpage) => {
    e.preventDefault();
    if (this.selectedGroup === undefined) {
      this.setState({ page: newpage }, async () => {
        this.getPost();
      });
    } else {
      this.setState({ page: newpage }, async () => {
        this.getPost();
      });
    }
  };

  handleModal = (e) => {
    this.setState({ show: e });
  };

  checkStatus = async () => {
    const { community } = this.state;
    const data = {
      userId: localStorage.getItem('userId'), // localStorage.getItem('userId'),
      community_id: community._id,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/community/status/`, data)
      .then((response, error) => {
        if (!error) {
          if (response.data) {
            this.setState({
              status: response.data.data.status,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sortPostByUpvote = async () => {
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
      .post(`${constants.baseUrl}/post/upvote/sort`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            posts: response.data.data.data,
            totalRows: response.data.data.totalRows,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  sortPostByDownvote = async () => {
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
            posts: response.data.data.data,
            totalRows: response.data.data.totalRows,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  sortPostByDate = async () => {
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
            posts: response.data.data.data,
            totalRows: response.data.data.totalRows,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleLeave = async () => {
    const { community } = this.props.location;
    const data = {
      user_id: localStorage.getItem('userId'),
      community_id: community._id,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/community/leavecommunity/`, data)
      .then((response, error) => {
        if (response) {
          if (response.data.msg === 'Community member removed successfully') {
            this.setState({ redirect: true });
          }
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleJoin = async () => {
    const { community } = this.props.location;
    const data = {
      sender: localStorage.getItem('userId'),
      recepient: community.admin_id,
      community_id: community._id,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/community/invite/`, data)
      .then((response, error) => {
        if (!error) {
          this.checkStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rows: parseInt(event.target.value, 10), page: 0 });
    this.getPost();
  };

  getPost = async () => {
    const { page, rows } = this.state;
    const { community } = this.state;
    const community_id = community.community_id;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/post/post/?id=${community_id}&page=${page}&rows=${rows}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            posts: response.data.data.data,
            totalRows: response.data.data.totalRows,
          });
        }
        if (response.success) {
          this.checkStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCommunity = async () => {
    const { community } = this.state;
    const community_id = community._id;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/community/communities/?id=${community_id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            this.setState({
              community: response.data.data[0],
              showPage: true,
            });
            this.getPost();
          }
        } else {
          console.log('something went wrong');
        }
      });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      <Redirect to="/dashboard" />;
    }
    const { post, posts, show, community, showPage, status, page, rows, totalRows } = this.state;
    if (post && status === 'approved') {
      return <Redirect to="/createpost" />;
    }

    return (
      <>
        <Header />
        {showPage === true && (
          <div>
            <Row style={{ height: '15vh', 'background-color': '#0579d3' }}>
              <Col md={12}> &nbsp;</Col>
            </Row>
            <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
              <Col md={2}>&nbsp;</Col>

              <Col md={12}>
                <Row>
                  <Col md={2}>&nbsp;</Col>
                  <Col md={1}>
                    {community.images.length > 0 !== '' ? (
                      <Avatar alt="Remy Sharp" src={community.images[0]} className="card-img-top" />
                    ) : (
                      <Avatar alt="Remy Sharp" src={RedditICon} className="card-img-top" />
                    )}
                  </Col>
                  <Col md={4}>
                    <Typography variant="h5" component="h5">
                      {' '}
                      {community.community_name}
                    </Typography>
                    <div>
                      <Typography variant="h7" component="h7" className="header-label">
                        {community.community_id}
                      </Typography>
                    </div>
                  </Col>
                  <Col md={3}>
                    {status === '' && (
                      <Button
                        data-testid="Signup"
                        size="small"
                        className="btn-primary"
                        type="button"
                        style={{
                          'background-color': '#da907e',
                          color: '#ffffff',
                          'border-radius': '9999px',
                          height: '30px',
                        }}
                        onClick={this.handleJoin}
                        default
                      >
                        Join
                      </Button>
                    )}
                    <div>
                      {status === 'pending' && (
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          style={{
                            'background-color': '#da907e',
                            color: '#ffffff',
                            'border-radius': '9999px',
                            height: '30px',
                          }}
                          disabled
                          default
                        >
                          Waiting for Approval
                        </Button>
                      )}
                    </div>
                    <div>
                      {status === 'approved' && (
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          style={{
                            'background-color': '#da907e',
                            color: '#ffffff',
                            'border-radius': '9999px',
                            height: '30px',
                          }}
                          onClick={this.handleLeave}
                          default
                        >
                          LEAVE
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
                {show && <ImageModal show={this.handleModal} images={community.images} />}
              </Col>
            </Row>
            <Row />
            <Row>
              <Col md={2}>&nbsp;</Col>
              <Col md={6}>
                <Row style={{ 'margin-top': '5px' }}>
                  <CommunityAppBar
                    upvote={this.sortPostByUpvote}
                    downvote={this.sortPostByDownvote}
                    date={this.sortPostByDate}
                    show={this.handleModal}
                  />
                </Row>
                {posts.length > 0 ? (
                  posts.map((p) => (
                    <Row>
                      {p.url === '' && p.images.length === 0 ? (
                        <TextDisplayCard community={community} post={p} />
                      ) : p.images.length > 0 ? (
                        <ImageDisplayCard community={community} post={p} />
                      ) : (
                        <UrlDisplayCard community={community} post={p} />
                      )}
                    </Row>
                  ))
                ) : (
                  <Typography>No Posts</Typography>
                )}

                {totalRows > 0 && (
                  <TablePagination
                    component="div"
                    count={totalRows}
                    page={page}
                    onChangePage={this.handleChangePage}
                    rowsPerPage={rows}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[2, 5, 10]}
                  />
                )}
              </Col>
              <Col md={3}>
                <Row className="border">
                  <AboutCommunityCard community_info={community} status={status.status} />
                </Row>

                <Row className="border">
                  <CommunityRulesCard community={community} />
                </Row>
                <Row className="border">
                  <CommunityMembersList community_info={community} />
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}

CommunityHomePage.propTypes = {
  community: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  // getCommunity: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    community: state.communityHome.community[0],
  };
};

const mapDispatchToProps = {
  getCommunity: communityAction.getCommunity,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CommunityHomePage);
