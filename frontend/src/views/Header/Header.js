/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SecurityIcon from '@material-ui/icons/Security';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import logo from '../../logo.png';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      el: false,
      showLogin: false,
      showSignup: false,
    };
  }

  handleLoginModal = () => {
    const { showLogin } = this.state;
    this.setState({ showLogin: !showLogin });
  };

  handleSignupModal = () => {
    const { showSignup } = this.state;
    this.setState({ showSignup: !showSignup });
  };

  handleClose = () => {
    this.setState({
      el: false,
    });
  };

  handleMenu = () => {
    const { el } = this.state;
    const st = !el;
    this.setState({
      el: st,
    });
  };

  handleProfileMenuOpen = () => {};

  render() {
    const { showLogin, showSignup } = this.state;
    return (
      <header>
        <Row>
          <Col>
            <Row>
              <AppBar position="static" color="default">
                <Toolbar variant="dense">
                  <Col md={4}>
                    <div>
                      <img src={logo} alt="" style={{ height: '40px' }} />
                    </div>
                  </Col>
                  <Col md={5}>
                    <div>
                      <SearchIcon className="searchIcon" />
                      <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </div>
                  </Col>
                  <Col md={2}>
                    <form className="form-inline my-2 my-lg-0">
                      <div>
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          onClick={this.handleLoginModal}
                          default
                          style={{
                            'background-color': '#ffffff',
                            'border-color': '#0579d3',
                            'border-radius': '9999px',
                          }}
                        >
                          Login
                        </Button>
                      </div>
                      <div>
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          style={{
                            'background-color': '#0579d3',
                            color: '#ffffff',
                            'border-radius': '9999px',
                          }}
                          onClick={this.handleSignupModal}
                          default
                        >
                          Sign Up
                        </Button>
                      </div>
                    </form>
                  </Col>
                  <Col md={2}>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle className="header-user">
                          {' '}
                          <IconButton onClick={this.handleMenu} size="small">
                            <AccountCircle />
                          </IconButton>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={this.handleProfilelick}>
                            {' '}
                            <CopyrightIcon />
                            Reddit Coins
                          </Dropdown.Item>
                          <Dropdown.Item onClick={this.handleGroupClick}>
                            {' '}
                            <SecurityIcon />
                            Reddit Premium
                          </Dropdown.Item>
                          <Dropdown.Item onClick={this.handleLogout}>
                            <HelpOutlineIcon />
                            Help Center
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={this.handleLogout}>
                            <ExitToAppIcon />
                            Login/Signup
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Col>
                </Toolbar>
              </AppBar>
            </Row>
          </Col>
        </Row>
        {showLogin && <Login showLogin={this.handleLoginModal} />}
        {showSignup && <Signup showSignup={this.handleSignupModal} />}
      </header>
    );
  }
}

export default Header;
