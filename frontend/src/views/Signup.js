/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import React from 'react';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import constants from '../constants/constants';

// import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line react/prefer-stateless-function
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: this.props.showSignup,
      name: '',
      email: '',
      password: '',
      redirect: false,
      errormessage: '',
    };
  }

  handleClose = () => {
    this.props.showSignup(false);
  };

  // username change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSignup = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`${constants.baseUrl}/users/register/`, data)
      .then((response, error) => {
        if (error) {
          this.setState({ errormessage: error.msg });
        } else {
          const { result } = response;
          if (response.data.msg === 'Logged in successfully') {
            this.setState({
              redirect: true,
            });
            localStorage.setItem('token', response.data.token);
          }
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { showSignup } = this.state;
    if (this.state.redirect) {
      return <Redirect to="./dashboard" />;
    }
    return (
      <Modal show={showSignup} onHide={this.handleClose} backdrop="static" keyboard={false}>
        <form className="form-signin" onSubmit={this.handleSignup}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Typography>
                By continuing, you agree to our User Agreement and Privacy Policy.
              </Typography>
            </div>

            <Dropdown.Divider />
            <Container>
              <Row>
                <Col>
                  {this.state.errormessage !== '' ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errormessage}
                    </div>
                  ) : null}
                  <div className="form-label-group">
                    <Typography>My name is</Typography>
                    <input
                      type="name"
                      onChange={this.nameChangeHandler}
                      id="name"
                      className="form-control"
                      placeholder="Full Name"
                      data-testid="name"
                    />
                  </div>
                  <div className="form-label-group">
                    <Typography>Heres my email address</Typography>
                    <input
                      type="email"
                      id="email"
                      onChange={this.emailChangeHandler}
                      className="form-control"
                      placeholder="email"
                      data-testid="email"
                      required
                    />
                  </div>
                  <Typography>And heres my password</Typography>
                  <input
                    type="password"
                    id="password"
                    onChange={this.passwordChangeHandler}
                    className="form-control"
                    placeholder="Password"
                    data-testid="password"
                    required
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{ 'background-color': '#0579d3', color: '#ffffff', 'border-color': '#0579d3' }}
              type="submit"
            >
              Signup
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
Signup.propTypes = {
  showSignup: PropTypes.func.isRequired,
};

export default Signup;
