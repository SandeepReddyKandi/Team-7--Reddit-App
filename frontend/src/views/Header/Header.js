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
import Talk from 'talkjs';
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
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
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

  const [name, setName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [unreadCount, setUnreadCount] = React.useState(0);

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
      .get(`${constants.baseUrl}/users/getUserById?id=${localStorage.getItem('userId')}`)
      .then((res) => {
        const currentUser = res.data.data[0];
        setName(currentUser.name);
        setUserName(currentUser.userName);
      });
  };

  const getUnreadCount = () => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${localStorage.getItem('userId')}`)
      .then((response) => {
        const currentUser = response.data.data[0];
        // eslint-disable-next-line no-underscore-dangle
        currentUser.id = currentUser._id;
        Talk.ready
          .then(() => {
            const me = new Talk.User(currentUser);
            if (!window.talkSession) {
              window.talkSession = new Talk.Session({
                appId: 'tdR0ruWV',
                me,
              });
            }
            window.talkSession.unreads.on('change', (conversationIds) => {
              setUnreadCount(conversationIds.length);
            });
          })
          .catch((e) => console.error(e));
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
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
    console.log("notification click")
    e.preventDefault();
    window.location.replace('/invitations');
  };

/*eslint-disable*/
const [CommunityName, setCommunityName] = React.useState(null);
const handleGetCommunityInvite=async(e)=>{
  console.log("inside get community");
  // const userId= localStorage.getItem("user");
  const data={
    userId: localStorage.getItem("userId")
  }
  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const test = await axios.get(`${constants.baseUrl}/community/getcommunityinvite`,data);
  console.log("------testcheckget----", test.data.data.invitations);
  const inviteList= test.data.data.invitations;

  var finalArray = inviteList.map(function (obj) {
    return getcommunityname(obj.community_id);
  });
  setCommunityName([...finalArray]);
  console.log("checking123", CommunityName);
}

  const handleGetCommunityInvite = async (e) => {
    e.preventDefault();
    const data = { userId: localStorage.getItem("user") }

    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    const test = await axios.get(`${constants.baseUrl}/community/getcommunityinvite`, data);
    const inviteList = test.data.data.invitations;

    var finalArray = inviteList.map(function (obj) {
      return obj.community_id;
    });
    setCommunityName([...finalArray]);
  }

  const onAcceptInvite = (e) => {
    e.preventDefault();
    const community = e.target.value;
  }

  const onRejectInvite = (e) => {
    e.preventDefault();
  }

const getcommunityname=async(e)=>{
  // e.preventDefault();
  console.log("testingcheck",e);
  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const res= await axios.get(`${constants.baseUrl}/community/getCommunityNameById?id=${e}`)
  console.log(res)
  // .then((res)=>{
  //   console.log("comunity name",test);
  //   console.log("comunity name check",res.data.data);
  // })
}

  const handleChatClick = (e) => {
    e.preventDefault();
    window.location.replace('/chat');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserName();
      getUnreadCount();
    }
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
        <IconButton aria-label="show new messages" color="inherit">
          <Badge badgeContent={unreadCount} color="secondary">
            <ChatIcon onClick={handleChatClick} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <Dropdown>
        <Dropdown.Toggle className="header-user" id="dropdown-basic">
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon onClick={handleGetCommunityInvite} />
            </Badge>
          </IconButton>
        </Dropdown.Toggle>
        <Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
      <MenuItem>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <InsertInvitationIcon onClick={handleNotificationsClick} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Dropdown style={{ marginLeft: '10%' }}>
        <Dropdown.Toggle className="header-user" id="dropdown-basic">
          <AccountCircle />
          {name}
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
                  <IconButton aria-label="show new messages" color="inherit">
                    <Badge badgeContent={unreadCount} color="secondary">
                      <ChatIcon onClick={handleChatClick} />
                    </Badge>
                  </IconButton>
                  <Dropdown>

        <Dropdown.Toggle className="header-user" id="dropdown-basic">
            <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon onClick={handleGetCommunityInvite}/>
            </Badge>
            </IconButton>
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {CommunityName && typeof CommunityName === 'object'?<div>
        {CommunityName.map((p) => (
                            <Dropdown.Item eventKey={p} value={p} onChange={getcommunityname}>{'   '}
                              <Button onClick={onAcceptInvite} value={p} variant="outline-secondary">Accept</Button>{'   '}
                              <Button onClick={onRejectInvite} value={p} variant="outline-secondary">Decline</Button>
                            </Dropdown.Item>
                          ))}
                          </div>:<Dropdown.Item>
        {' '}
        </Dropdown.Item> }
        </Dropdown.Menu>
      </Dropdown>

                  <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <InsertInvitationIcon onClick={handleNotificationsClick} />
                    </Badge>
                  </IconButton>
                  <Dropdown>
                    <Dropdown.Toggle className="header-user" id="dropdown-basic">
                      <AccountCircle />
                      {name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {' '}
                        <Link to={`/my-profile/${userName}`} style={{ cursor: 'pointer', color: 'black' }}>
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
                          style={{ cursor: 'pointer', color: 'black' }}>
                          Create Community
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/myCommunity" style={{ cursor: 'pointer', color: 'black' }}>
                          My Communities
                            </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          to="/communitysearchpage"
                          style={{ cursor: 'pointer', color: 'black' }}>
                          Search Community
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
