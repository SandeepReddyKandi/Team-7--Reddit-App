/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Header from '../Header/Header';
import InvitationListCard from '../Cards/InvitationListCard';
import constants from '../../constants/constants';

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitations: [],
      showModal: false,
      personName: '',
      names: [],
      selectedNames: [],
      communities: [],
      selectedCommunity: '',
      page: 0,
      rows: 2,
      totalRows: 10,
    };
    this.getInvitations = this.getInvitations.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.getCommunities = this.getCommunities.bind(this);
  }

  componentDidMount() {
    this.getInvitations();
  }

  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rows: parseInt(event.target.value, 10), page: 0 });
    this.getInvitations();
  };

  handleChangePage = (e, newpage) => {
    e.preventDefault();
    this.setState({ page: newpage }, async () => {
      this.getInvitations();
    });
  };

  getInvitations() {
    const { page, rows } = this.state;
    const userId = localStorage.getItem('user');
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    const data = {
      userId,
      page,
      rows,
    };
    axios
      .post(`${constants.baseUrl}/community/getInvitationsByPage`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            invitations: response.data.data.invitations,
            totalRows: response.data.data.totalRows,
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  getCommunities(e) {
    const communityNameFilter = e.target.value;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/community/getCommunityByName?name=${communityNameFilter}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            communities: response.data.data,
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

  getUsers(e) {
    const nameFilter = e.target.value;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
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
    const { selectedNames, selectedCommunity } = this.state;
    selectedNames.forEach((recepient) => {
      const formData = {
        sender: userId,
        community_id: selectedCommunity._id,
        recepient: recepient._id,
      };
      axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
      axios.defaults.withCredentials = true;
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
    this.handleClose();
  }

  render() {
    const {
      invitations,
      showModal,
      // eslint-disable-next-line no-unused-vars
      personName,
      names,
      selectedNames,
      communities,
      page,
      rows,
      totalRows,
    } = this.state;

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
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rows}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10]}
          />
        </div>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send Invitation</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.sendInvite}>
            <Modal.Body>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                size="small"
                onChange={(event, newValue) => {
                  this.setState({ selectedCommunity: newValue, communities: [] });
                }}
                options={communities}
                getOptionLabel={(option) => option.community_name}
                style={{ marginBottom: '10px' }}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label="Type to search community..."
                    variant="outlined"
                    onKeyUp={this.getCommunities}
                    required
                  />
                )}
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
                    required={selectedNames.length === 0}
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
