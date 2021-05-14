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
import { Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import ChatIcon from '@material-ui/icons/Chat';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
// import SearchBar from "material-ui-search-bar";
import constants from '../../constants/constants';
import Logo from './Logo/Logo';
import Searchbar from './Searchbar/Searchbar';
import logout from '../../utils/logout';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    border: '1px solid #C8C8C8',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
      border: '1px solid #696969'
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: '10',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [searchText, setSearchText] = React.useState('');
  // const [searchResult, setSearchResult] = React.useState([]);

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const [userName, setUserName] = React.useState('');

  const token = localStorage.getItem('token');
  let loggedIn;
  if (token) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  Header.propTypes = {
    showLogin: PropTypes.func.isRequired,
    showSignup: PropTypes.func.isRequired,
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    props.showLogin(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    props.showSignup(true);
  };

  const getUserName = () => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${localStorage.getItem('user')}`)
      .then((res) => {
        const currentUser = res.data.data[0];
        setUserName(currentUser.name);
      });
  };

  // const handleSearchChange = (e) => {
  //   console.log("handleSearchChange: ", e);
  //   setSearchText(e);
  // }

  // const handleSearchRequest = async (e) => {
  //   console.log("handleSearchRequest: ", e);
  //   axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  //   axios.defaults.withCredentials = true;
  //   setTimeout(async () => {
  //     await axios
  //       .get(`${constants.baseUrl}/posts/searchPostsCriteria?searchText=${searchText}`)
  //       .then((response, error) => {
  //         if (!error) {
  //           console.log("Response: ", response);
  //           setSearchResult(response.data.data);
  //         }
  //         else {
  //           console.log("Error: ", error);
  //         }
  //       })
  //   }, 10)

  // }

  const handleNotificationsClick = (e) => {
    e.preventDefault();
    window.location.replace('/invitations');
  };

  const handleChatClick = (e) => {
    e.preventDefault();
    window.location.replace('/chat');
  };

  useEffect(() => {
    getUserName();
  }, []);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new messages" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ChatIcon onClick={handleChatClick} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon onClick={handleNotificationsClick} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Dropdown>
        <Dropdown.Toggle className="header-user" id="dropdown-basic">
          <AccountCircle />
          {userName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            {' '}
            <Link to="/user" style={{ cursor: 'pointer', color: 'black' }}>
              My Profile
                            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/createpost" style={{ cursor: 'pointer', color: 'black' }}>
              Create Post
                            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to="/createCommunity"
              style={{ cursor: 'pointer', color: 'black' }}
            >
              Create Community
                            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/myCommunity" style={{ cursor: 'pointer', color: 'black' }}>
              My Communities
                            </Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>
            <Link to="/" style={{ cursor: 'pointer', color: 'black' }}>
              Logout
                          </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );

  return (
    <header>
      <div className={classes.grow} style={{ marginLeft: '1%' }}>
        <AppBar position="static" color="default" width="100%">
          <Toolbar>
            <IconButton style={{ width: "10%", marginLeft: '5%' }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <Logo />
            </IconButton>
            <div className={classes.grow} />
            <Searchbar style={{ alignItems: 'left', width: '60%' }} />
            {loggedIn ? (
              <>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton aria-label="show 4 new messages" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <ChatIcon onClick={handleChatClick} />
                    </Badge>
                  </IconButton>
                  <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon onClick={handleNotificationsClick} />
                    </Badge>
                  </IconButton>
                  <Dropdown>
                    <Dropdown.Toggle className="header-user" id="dropdown-basic">
                      <AccountCircle />
                      {userName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {' '}
                        <Link to="/user" style={{ cursor: 'pointer', color: 'black' }}>
                          My Profile
                            </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/createpost" style={{ cursor: 'pointer', color: 'black' }}>
                          Create Post
                            </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          to="/createCommunity"
                          style={{ cursor: 'pointer', color: 'black' }}
                        >
                          Create Community
                            </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/myCommunity" style={{ cursor: 'pointer', color: 'black' }}>
                          My Communities
                            </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>
                        <Link to="/" style={{ cursor: 'pointer', color: 'black' }}>
                          Logout
                          </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMobileMenuOpen}
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </>
            ) : (
              <>
                <Col md={1.5} style={{ marginLeft: '10%' }}>
                  <Chip label="LOG IN" onClick={handleLogIn} />
                </Col>
                <Col md={1.5} >
                  <Chip label="SIGN UP" onClick={handleSignup} />
                </Col>
              </>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    </header>
  );
}
