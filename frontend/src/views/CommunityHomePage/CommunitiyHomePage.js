import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import RedditICon from '../../community.png';
import TextDisplayCard from '../Cards/TextDisplayCard';
import AboutCommunityCard from '../Cards/AboutCommunityCard';
import CommunityRulesCard from '../Cards/CommunityRulesCard';
import CommunityAppBar from '../ToolBar/CommunityAppBar';
import constants from '../../constants/constants';

// import Container from 'react-bootstrap/Container';

class CommunityHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { community: {}, post: false };
    this.getCommunity();
  }

  handleChange = () => {};

  createPost = () => {
    const { post } = this.state;
    this.setState({ post: !post });
  };

  componentDidUpdate = () => {
    this.getCommunity();
  };

  getCommunity = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/community/communities/?id=608b8305cf9ebd2d9694e801`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            community: response.data.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { post, community } = this.state;
    if (post) {
      return <Redirect to="/createpost" />;
    }
    return (
      <>
        <Header />
        <div>
          <Row style={{ height: '100px', 'background-color': '#0579d3' }}>
            <Col md={12}> &nbsp;</Col>
          </Row>
          <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
            <Col md={2}>&nbsp;</Col>

            <Col md={11}>
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
                    onClick={this.handleSignupModal}
                    default
                  >
                    Join
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row />
          <Row>
            <Col md={2}>&nbsp;</Col>
            <Col md={6}>
              <Row>&nbsp;</Row>
              <Row>
                <CommunityAppBar />
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <TextDisplayCard />
              </Row>
            </Col>
            <Col md={1} />
            <Col md={3}>
              <Row>&nbsp;</Row>
              <Row>
                <AboutCommunityCard community_info={community} />
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <CommunityRulesCard />
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CommunityHomePage;
