/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import React from 'react';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import constants from '../constants/constants';
// import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: this.props.showLogin,
      email: '',
      password: '',
      redirect: false,
      errormessage: '',
    };
  }

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

  handleLogin = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`${constants.baseUrl}/users/login/`, data)
      .then((response, error) => {
        if (error) {
          this.setState({ errormessage: error.msg });
        } else {
          const { result } = response;
          if (response.data.success) {
            this.setState({
              redirect: true,
            });
            localStorage.setItem('token', response.token);
          }
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errormessage: error.response.data.msg });
      });
  };

  handleClose = () => {
    this.props.showLogin(false);
  };

  render() {
    const { showLogin } = this.state;
    if (this.state.redirect) {
      return <Redirect to="./dashboard" />;
    }
    return (
      <Modal
        show={showLogin}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <form data-testid="alert" className="form-signin" onSubmit={this.handleLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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

                  <div className="clearfix">
                    <Typography>Email Address</Typography>
                    <input
                      type="email"
                      id="email"
                      data-testid="email"
                      onChange={this.emailChangeHandler}
                      className="form-control"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="clearfix">
                    <Typography>Password</Typography>
                    <input
                      type="password"
                      id="password"
                      data-testid="password"
                      onChange={this.passwordChangeHandler}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
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
              Login
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
Login.propTypes = {
  showLogin: PropTypes.func.isRequired,
};

export default Login;
