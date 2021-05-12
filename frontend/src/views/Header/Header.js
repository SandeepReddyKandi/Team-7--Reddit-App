/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useHistory } from "react-router-dom";
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
import Logo from './Logo/Logo';
import Searchbar from './Searchbar/Searchbar';

// import { authContext } from "../../context/AuthContext";
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '190px'
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
        minWidth: '30px'
      }
    }
  },
}))(MenuItem);

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const history = useHistory();
  let loggedIn;
  if (token) {
    loggedIn = true;
  }
  else {
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    history.push(`/users/${userName}`)
  }

  return (
    <header style={{ width: '100%' }}>
      <Row>
        <Col>
          <AppBar position="static" color="default" width="100%">
            <Toolbar variant="dense">
              <Col md={3} alignContent>
                <Logo />
              </Col>
              <Col md={7}>
                <div >
                  <Searchbar />
                </div>
              </Col>
              <Col md={2}>
                <Row>
                  {loggedIn ? (
                    <>
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true" style={{ width: "90%", border: "1px solid rgb(230,230,230)", borderRadius: "2px" }}
                        color="transparent"
                        onClick={handleClick}>
                        {userName || 'UserName'}
                      </Button>
                      <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)} style={{ width: "235px", minHeight: "300px" }}
                        onClose={handleClose}
                      >
                        <StyledMenuItem onClick={navigateToProfile}>
                          <ListItemIcon>
                            <AccountBoxIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                          <ListItemIcon>
                            <PostAddIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText primary="Create Post" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                          <ListItemIcon>
                            <LibraryAddIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText primary="Create Community" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                          <ListItemIcon>
                            <LibraryBooksIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText primary="My Communities" />
                        </StyledMenuItem>
                        <StyledMenuItem >
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText primary="Log Out" />
                        </StyledMenuItem>
                      </StyledMenu>
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
    </header >
  );
}
