/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

import React from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

  const handleProfilelick = (e) => {
    e.preventDefault();
    history.push(`/user/:${localStorage.getItem('user')}`);
  };

  const handleCreatePostClick = (e) => {
    e.preventDefault();
    history.push('/createpost');
  };

  const handleCreateCommunityClick = (e) => {
    e.preventDefault();
    history.push(`/createCommunity`);
  };

  const handleMyCommunityClick = (e) => {
    e.preventDefault();
    history.push(`/myCommunity`);
  };

  const handleLogout = (e) => {};
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
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle className="header-user" id="dropdown-basic">
                            {localStorage.getItem('user')}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={handleProfilelick}>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleCreatePostClick}>
                              Create Post
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleCreateCommunityClick}>
                              Create Community
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleMyCommunityClick}>
                              My Communities
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
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
