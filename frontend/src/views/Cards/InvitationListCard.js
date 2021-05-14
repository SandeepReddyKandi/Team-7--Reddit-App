/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Row, Col } from 'react-bootstrap';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
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
      communityName: '',
    };
  }

  componentDidMount() {
    const { invitation } = this.props;
    this.getUserById(invitation.sender, true);
    this.getUserById(invitation.recepient, false);
    this.getCommunityNameById(invitation.community_id);
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

  getCommunityNameById(communityId) {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/community/getCommunityNameById?id=${communityId}`)
      .then((response) => {
        this.setState({ communityName: response.data.data });
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line no-unused-vars
    const { invitation } = this.props;
    const { sender, recepient, communityName } = this.state;
    return (
      <>
        <Card style={{ marginTop: '30px', width: '720px' }}>
          <CardActionArea>
            <CardContent>
              <Row>
                <Col md={6}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Community: {communityName}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Sender: {sender.name}&nbsp;&nbsp;Recepient: {recepient.name}
                  </Typography>
                </Col>
                <Col md={6}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    style={{ alignContent: 'center' }}
                  >
                    Status: {invitation.status}
                    &nbsp;&nbsp;
                    {invitation.status === 'pending' && <AccessTimeIcon fontSize="large" />}
                    {invitation.status === 'accepted' && <ThumbUpRoundedIcon fontSize="large" />}
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

InvitationListCard.propTypes = {
  invitation: PropTypes.objectOf.isRequired,
};

export default InvitationListCard;
