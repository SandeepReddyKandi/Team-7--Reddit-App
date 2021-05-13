/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */

import React, { useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import Chip from '@material-ui/core/Chip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import history from '../../history';
import Logo from './Logo/Logo';
import Searchbar from './Searchbar/Searchbar';

// import { authContext } from "../../context/AuthContext";
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '190px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    marginBottom: '2px',
    paddingLeft: '5px',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
        minWidth: '30px',
      },
    },
  },
}))(MenuItem);

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUserName] = React.useState('');

  const token = localStorage.getItem('token');
  let loggedIn;
  if (token) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    props.showLogin(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    props.showSignup(true);
  };

  Header.propTypes = {
    showLogin: PropTypes.func.isRequired,
    showSignup: PropTypes.func.isRequired,
  };

  const getUserName = () => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${localStorage.getItem('user')}`)
      .then((res) => {
        console.log("response:", res)
        const currentUser = res.data.data[0];
        setUserName(currentUser.name);
      });
  };

  useEffect(() => {
    getUserName();
  }, []);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    window.location.replace("/invitations");
  };

  const handleChatClick = (e) => {
    e.preventDefault();
    window.location.replace("/chat");
  };

  const handleMyCommunityClick = (e) => {
    e.preventDefault();
    history.push(`/myCommunity`);
  };

  const handleLogout = (e) => { };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Row>
        <Col>
          <AppBar position="static" color="default" width="100%">
            <Toolbar variant="dense">
              <Col md={3} alignContent>
                <Logo />
              </Col>
              <Col md={7}>
                <div>
                  <Searchbar />
                </div>
              </Col>
              <Col md={2}>
                <Row>
                  {loggedIn ? (
                    <>
                      <Col md={2}>
                        <ChatIcon onClick={handleChatClick} style={{marginTop:'35%', cursor: 'pointer', color: 'black' }} />
                      </Col>
                      <Col md={2}>
                        <NotificationsIcon onClick={handleNotificationClick} style={{marginTop:'35%', cursor: 'pointer', color: 'black' }} />
                      </Col>
                      <Col md={1.5}>
                        <Dropdown>
                          <Dropdown.Toggle className="header-user" id="dropdown-basic">
                            {userName}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>My Profile</Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/createpost" style={{ cursor: 'pointer', color: 'black' }}>
                                Create Post
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/createCommunity" style={{ cursor: 'pointer', color: 'black' }}>
                                Create Community
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/myCommunity" style={{ cursor: 'pointer', color: 'black' }}>
                                My Communities
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col md={1.5}>
                        <Chip label="LOG IN" onClick={handleLogIn} />
                      </Col>
                      <Col>
                        <Chip label="SIGN UP" onClick={handleSignup} />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Toolbar>
          </AppBar>
        </Col>
      </Row>
    </header>
  );
}
