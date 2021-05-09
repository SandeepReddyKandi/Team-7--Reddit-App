/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import Header from '../Header/Header';
import RedditICon from '../../community.png';
import TextDisplayCard from '../Cards/TextDisplayCard';
import AboutCommunityCard from '../Cards/AboutCommunityCard';
import CommunityRulesCard from '../Cards/CommunityRulesCard';
import CommunityAppBar from '../ToolBar/CommunityAppBar';
import constants from '../../constants/constants';
// import ImageCard from '../Cards/ImageCard';
// import LinkCard from '../Cards/LinkCard';

// import Container from 'react-bootstrap/Container';

class CommunityHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: { descriptions: '', members: [], page: 0, rows: 5, totalRows: 10 },
      post: false,
      showPage: false,
      status: {
        status: '',
      },
    };
    this.checkStatus();
    this.getCommunity();
  }

  componentDidMount() {}

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

  checkStatus = async () => {
    const data = {
      userId: '607c5f3cfca7772866d40925',
      community_id: '608b8305cf9ebd2d9694e801',
    };
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/community/status/`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            status: response.data.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  handleJoin = async () => {
    const data = {
      sender: '',
      recepient: '',
      community_id: '',
    };
    axios.defaults.withCredentials = true;
    await axios
      .post(`${constants.baseUrl}/community/invite/`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            status: response.data.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  handleChangeRowsPerPage = () => {
    this.getPost();
  };

  getPost = async () => {
    const { page, rows } = this.state;
    const { communityId } = this.state;
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/post/?community_id=${communityId}&page=${page}&rows=${rows}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            community: response.data.data[0],
            showPage: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  getCommunity = async () => {
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/community/communities/?id=608b8305cf9ebd2d9694e801`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            community: response.data.data[0],
            showPage: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { post, community, showPage, status, page, rows, totalRows } = this.state;
    if (post) {
      return <Redirect to="/createpost" />;
    }
    return (
      <>
        <Header />
        {showPage === true && (
          <div>
            <Row style={{ height: '100px', 'background-color': '#0579d3' }}>
              <Col md={12}> &nbsp;</Col>
            </Row>
            <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
              <Col md={2}>&nbsp;</Col>

              <Col md={12}>
                <Row>
                  <Col md={2}>&nbsp;</Col>
                  <Col md={1}>
                    <Avatar alt="Remy Sharp" src={RedditICon} className="card-img-top" />
                  </Col>
                  <Col md={5}>
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
                    {status.status === '' && (
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
                    {status.status === 'pending' && (
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
                    {status.status === 'active' && (
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
                        default
                      >
                        LEAVE
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row />
            <Row>
              <Col md={2}>&nbsp;</Col>
              <Col md={5}>
                <Row style={{ 'margin-top': '5px' }}>
                  <CommunityAppBar />
                </Row>
                {community.posts.length >= 0 &&
                  community.posts.map((p) => (
                    <Row>
                      <TextDisplayCard post={p} />
                    </Row>
                  ))}
                <TablePagination
                  component="div"
                  count={totalRows}
                  page={page}
                  onChangePage={this.handleChangePage}
                  rowsPerPage={rows}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  rowsPerPageOptions={[2, 5, 10]}
                />
              </Col>

              <Col md={2}>
                <Row className="border">
                  <AboutCommunityCard community_info={community} status={status.status} />
                </Row>

                <Row className="border">
                  <CommunityRulesCard />
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}

export default CommunityHomePage;
