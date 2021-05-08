import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Header from '../Header/Header';
import InvitationListCard from '../Cards/InvitationListCard';
import constants from '../../constants/constants';

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.input = {};
    this.state = {
      invitations: [],
      showModal: false,
      personName: '',
      names: [],
      selectedNames: [],
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.getInvitations = this.getInvitations.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
  }

  componentDidMount() {
    this.getInvitations();
  }

  getInvitations() {
    const userId = localStorage.getItem('user');
    axios
      .get(`${constants.baseUrl}/community/getinvitations?userId=${userId}`)
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

  getUsers(e) {
    const nameFilter = e.target.value;
    axios
      .get(`${constants.baseUrl}/users/getUsersByName?name=${nameFilter}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            names: response.data.data,
          });
        }
      })
      .catch((error) => {
        // this.setState({
        //  error: error.response.msg,
        // });
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  handleClose = () => this.setState({ showModal: false });

  handleShow = () => this.setState({ showModal: true });

  handleKeyDown = (evt) => {
    if (['Enter'].includes(evt.key)) {
      evt.preventDefault();
      const { selectedNames, personName } = this.state;
      if (personName.trim()) {
        this.setState({
          selectedNames: [...selectedNames, personName],
          personName: '',
        });
      }
    }
  };

  handleChange = (evt) => {
    this.setState({
      personName: evt.target.value,
    });
  };

  handleDelete = (item) => {
    const { selectedNames } = this.state;
    this.setState({
      selectedNames: selectedNames.filter((i) => i !== item),
    });
  };

  sendInvite(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user');
    const { selectedNames } = this.state;
    selectedNames.forEach((recepient) => {
      const formData = {
        sender: userId,
        ...this.input,
        // eslint-disable-next-line no-underscore-dangle
        recepient: recepient._id,
      };
      axios
        .post(`${constants.baseUrl}/community/invite`, formData)
        .then((response, error) => {
          if (!error) {
            this.getInvitations();
          }
        })
        .catch((error) => {
          // this.setState({
          //  error: error.response.msg,
          // });
          // eslint-disable-next-line no-alert
          alert(error);
        });
    });
  }

  inputHandler(event) {
    this.input[event.target.id] = event.target.value;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { invitations, showModal, personName, names, selectedNames } = this.state;

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
                    className="btn-primary"
                    type="button"
                    style={{
                      'background-color': '#da907e',
                      color: '#ffffff',
                      'border-radius': '9999px',
                      height: '30px',
                      marginBottom: '10px',
                    }}
                    onClick={this.handleShow}
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

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send Invitation</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.sendInvite}>
            <Modal.Body>
              <TextField
                fullWidth
                id="community_id"
                label="Community"
                variant="outlined"
                size="small"
                onChange={this.inputHandler}
                style={{ marginBottom: '10px' }}
                required
              />

              <Autocomplete
                multiple
                value={selectedNames}
                onChange={(event, newValue) => {
                  this.setState({ selectedNames: [...newValue], names: [] });
                }}
                options={names}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    variant="standard"
                    label="Recepient(s)"
                    placeholder="Type to search user..."
                    onKeyUp={this.getUsers}
                  />
                )}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default Invitations;
