import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Header from '../Header/Header';
import InvitationListCard from '../Cards/InvitationListCard';
import constants from '../../constants/constants';

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitations: [],
    };
    this.getInvitations = this.getInvitations.bind(this);
  }

  componentDidMount() {
    this.getInvitations();
  }

  getInvitations() {
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/community/getinvitations?userId=607c5f3cfca7772866d40925`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            invitations: response.data.data,
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    const { invitations } = this.state;

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
                <Col md={3}>&nbsp;</Col>
                <Col md={5}>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{ paddingLeft: '5%', marginBottom: '10px' }}
                  >
                    Invitations
                  </Typography>
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
                      marginBottom: '10px',
                    }}
                    onClick={this.handleJoin}
                    default
                  >
                    Send Invite
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row />
          <Row>
            <Col md={3}>&nbsp;</Col>
            <Col md={6}>
              <Row>&nbsp;</Row>
              {invitations.length >= 0 &&
                invitations.map((i) => (
                  <Row>
                    <InvitationListCard invitation={i} />
                  </Row>
                ))}
            </Col>
            <Col />
            <Col md={3}>&nbsp;</Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Invitations;
