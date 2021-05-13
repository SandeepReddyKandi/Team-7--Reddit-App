/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import './TextDisplayCard.css';
import axios from 'axios';
import constants from '../../constants/constants';

// eslint-disable-next-line react/prefer-stateless-function
class InvitationListCard extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      sender: '',
      recepient: '',
    };
  }

  componentDidMount() {
    const { invitation } = this.props;
    this.getUserById(invitation.sender, true);
    this.getUserById(invitation.recepient, false);
  }

  getUserById(id, isSender) {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${id}`)
      .then((response) => {
        if (isSender) {
          this.setState({ sender: response.data.data[0] });
        } else {
          this.setState({ recepient: response.data.data[0] });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { invitation } = this.props;
    const { sender, recepient } = this.state;
    return (
      <div className="posts-wrapper">
        <Card style={{ marginTop: '2em' }}>
          <div className="post">
            <Row style={{ minWidth: '50vw', height: '100%' }}>
              <Col md={12} style={{ paddingLeft: '5%' }}>
                <Row>
                  <Col md={6}>
                    <span className="title">Community: {invitation.community_id}</span>
                    <span>
                      <br />
                      Sender: {sender.name}
                    </span>
                    <span>
                      <br />
                      Recepient: {recepient.name}
                    </span>
                  </Col>
                  <Col md={6}>
                    <span className="title">Status: {invitation.status}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

InvitationListCard.propTypes = {
  invitation: PropTypes.objectOf.isRequired,
};

export default InvitationListCard;
