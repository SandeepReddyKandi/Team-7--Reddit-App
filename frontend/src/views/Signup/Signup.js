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
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import constants from '../../constants/constants';
import LoginICon from '../../login.png';
import GoogleICon from '../../google.png';
import ApplIcon from '../../apple.png';

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

  handleClose = () => {
    this.props.showSignup(false);
  };

  /*
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
      </Modal> */
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
          if (response.data.msg === 'Registered successfully') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.userId);
            this.setState({
              redirect: true,
            });
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
      <>
        <Modal
          size="lg"
          show={showSignup}
          onHide={() => this.handleClose(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Row>
            <Col md={2} className="login-image">
              <img src={LoginICon} className="Art login-image" alt="" />
            </Col>
            <Col md={10}>
              <Modal.Header closeButton style={{ 'border-bottom': 'none' }}>
                <Col md={10}>
                  <Row>
                    <h4 className="title">Signup</h4>
                  </Row>
                  <Row>
                    <Typography className="subtitle">
                      By continuing, you agree to our User Agreement and Privacy Policy.
                    </Typography>
                  </Row>
                </Col>
              </Modal.Header>
              <Container className="login-card">
                <Row>
                  <Col md={10}>
                    <Row>&nbsp;</Row>
                    <Row className="sso-button">
                      <Button
                        variant="outlined"
                        className="google-button sso-google-button"
                        bcolor="primary"
                      >
                        <img
                          src={GoogleICon}
                          style={{ width: '10%', height: '10%' }}
                          className="Art login-image"
                          alt=""
                        />
                        <Typography className="button-label">CONTINUE WITH GOOGLE</Typography>
                      </Button>
                    </Row>
                    <Row className="sso-button">
                      <Button
                        variant="outlined"
                        className="google-button sso-google-button"
                        bcolor="primary"
                      >
                        {' '}
                        <img
                          src={ApplIcon}
                          style={{ width: '10%', height: '10%' }}
                          className="Art login-image"
                          alt=""
                        />
                        <Typography className="button-label">CONTINUE WITH APPLE</Typography>
                      </Button>
                    </Row>
                    <Row className="sso-button">
                      <Button
                        variant="outlined"
                        className="google-button sso-google-button"
                        bcolor="primary"
                      >
                        <Row>
                          <Col md={1}>
                            {' '}
                            <MailIcon />
                          </Col>
                          <Col>
                            <Typography className="button-label">CONTINUE WITH MAIL</Typography>
                          </Col>
                        </Row>
                      </Button>
                    </Row>
                    <Row className="Sso__divider header-label m-small-margin ">
                      <span className="Sso__dividerLine" />
                      <span>OR</span>
                      <span className="Sso__dividerLine" />
                    </Row>

                    <form onSubmit={this.handleSignup} encType="multipart/form-data">
                      <Row>
                        {' '}
                        {this.state.errormessage !== '' ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.errormessage}
                          </div>
                        ) : null}
                      </Row>
                      <Row>
                        <input
                          type="text"
                          id="email"
                          data-testid="email"
                          onChange={this.nameChangeHandler}
                          className="google-button sso-google-button .login-textfield{"
                          placeholder="Name"
                          required
                        />
                      </Row>
                      <Row>
                        <input
                          type="email"
                          id="email"
                          data-testid="email"
                          onChange={this.emailChangeHandler}
                          className="google-button sso-google-button .login-textfield{"
                          placeholder="Email"
                          required
                        />
                      </Row>

                      <Row>
                        <input
                          type="password"
                          id="password"
                          data-testid="password"
                          onChange={this.passwordChangeHandler}
                          className="google-button sso-google-button .login-textfield{"
                          placeholder="password"
                          required
                        />
                      </Row>

                      <Row>
                        <button variant="primary" className="login-button" type="submit">
                          Signup
                        </button>
                      </Row>
                    </form>
                    <Row>&nbsp;</Row>
                    <Row>
                      <Typography className="subtitle">Already User? LOG IN</Typography>
                    </Row>
                    <Row />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Modal>
      </>
    );
  }
}
Signup.propTypes = {
  showSignup: PropTypes.func.isRequired,
};

export default Signup;
