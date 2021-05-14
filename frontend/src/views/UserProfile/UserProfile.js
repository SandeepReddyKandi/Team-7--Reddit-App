
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import axios from 'axios';
import Header from '../Header/Header';
import constants from '../../constants/constants';
import RedditICon from '../../community.png';
import MyCommunityCard from '../MyCommunity/MyCommunityCard';

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

  getCommunitites = async () => {
    const userId = localStorage.getItem('userId');
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/community/getCommunityByMember/?id=${userId}`)
      .then((response, error) => {
        if (!error) {
          console.log("**********inside not error*******")
          this.setState({
            communities: response.data.msg,
          });
          console.log("**********inside not error*******", response)

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

  render() {
    const { user, communities } = this.state;
    console.log("comuuniteefe", communities);
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md={8}>
              <br />
              <List>

                {communities.length > 0 &&
                  communities.map((m) => (
                    <MyCommunityCard community={m} />
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
                  <Row style={{ paddingTop: '10%', 'background-color': '#ffffff', height: '20%', alignContent: 'center' }}>
                    <Col md={4}>
                      <Typography variant="dense">Name: </Typography>
                    </Col>
                    <Col md={6}>
                      <Typography variant="dense">{user.name}</Typography>
                    </Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%', alignContent: 'center' }}>
                    <Col md={5}>
                      <Typography variant="dense">Location:</Typography>
                    </Col>
                    <Col md={7}>
                      <Typography variant="dense">{user.location}</Typography>
                    </Col>
                  </Row>
                  <Row style={{ 'background-color': '#ffffff', height: '20%', alignContent: 'center' }}>
                    <Col md={4}>
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
