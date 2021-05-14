/* eslint-disable react/prefer-stateless-function */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from 'axios';
import Header from '../Header/Header';
import constants from '../../constants/constants';
// import TextDisplayCard from '../Cards/TextDisplayCard';
import TopBar from '../ToolBar/TopBar';
import RedditICon from '../../community.png';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      communities: '',
    };
  }

  componentDidMount = async () => {
    await this.getUserById();
  };

  getCommunitites = async () => {
    const userId = localStorage.getItem('userId');
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/community/getCommunityByMember/?id=${userId}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            communities: response.data.msg,
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

  redirectToCommunity = () => <Redirect to="/communityhomepage"></Redirect>; // community object as well

  getUserById = async () => {
    const userId = localStorage.getItem('userId');
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/users/getUserById/?id=${userId}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            user: response.data.data[0],
          });
          this.getCommunitites();
        }
        if (response.success) {
          this.checkStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { user, communities } = this.state;
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md={8}>
              <TopBar />
              <List>
                {communities.length > 0 &&
                  communities.map((m) => (
                    <ListItem
                      style={{ 'background-color': '#ffffff', height: '20%' }}
                      onClick={() => this.redirectToCommunity(m)}
                    >
                      <ListItemAvatar>
                        <Avatar src={m.images[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={m.community_name}
                        secondary={
                          <Typography className="header-label">
                            Created on:{m.createdAt}{' '}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Col>
            <Col md={4}>
              <br />
              <Row>
                <div style={{ marginLeft: '5%' }}>
                  <Row style={{ height: '50px', 'background-color': '#0579d3' }}>
                    <Col md={10}> &nbsp;</Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                    <Col md={2}>&nbsp;</Col>
                    <Col md={11}>
                      <Row>
                        <Col md={2}>&nbsp;</Col>
                        <Col md={1}>
                          {user.photo === '' ? (
                            <Avatar
                              alt="Remy Sharp"
                              src={RedditICon}
                              className="card-img-top"
                              style={{
                                height: '16px',
                                width: '16px',
                              }}
                            />
                          ) : (
                            <Avatar
                              alt="Remy Sharp"
                              src={user.photo}
                              className="card-img-top"
                              style={{
                                height: '16px',
                                width: '16px',
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: '10%', 'background-color': '#ffffff', height: '20%' }}>
                    <Col md={4}>
                      <Typography variant="dense">Name: </Typography>
                    </Col>
                    <Col md={6}>
                      <Typography variant="dense">{user.name}</Typography>
                    </Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                    <Col md={4}>
                      {' '}
                      <Typography variant="dense">Communities</Typography>
                    </Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                    <Col md={4}>
                      <Typography variant="dense">Location: {user.location}</Typography>
                    </Col>
                    <Col md={6}>
                      <Typography variant="dense">{user.location}</Typography>
                    </Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                    <Col md={4}>
                      {' '}
                      <Typography variant="dense">Preferences {user.preferences}</Typography>
                    </Col>
                  </Row>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
