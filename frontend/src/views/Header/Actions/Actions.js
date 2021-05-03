/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import './Actions.css';
import PersonIcon from '@material-ui/icons/Person';
import Col from 'react-bootstrap/Col';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SecurityIcon from '@material-ui/icons/Security';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Chip from '@material-ui/core/Chip';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

export default function Actions(props) {
  const handleMenu = () => {};

  const handleProfilelick = () => {};
  const handleGroupClick = () => {};
  const handleLogout = () => {};
  const handleSignup = (e) => {
    e.preventDefault();
    props.showSignup(true);
  };

  const handleLogIn = () => {
    props.showLogin(true);
  };

  return (
    <div className="actions">
      <Col />
      <Col>
        <Chip label="LOG IN" onClick={handleLogIn} />
      </Col>
      <Col>
        <Chip label="Signup" onClick={handleSignup} />
      </Col>
      <div className="profile">
        <Dropdown>
          <Dropdown.Toggle className="header-user">
            {' '}
            <IconButton onClick={handleMenu} size="small">
              <PersonIcon />
              <ArrowDropDownIcon />
            </IconButton>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfilelick}>
              {' '}
              <CopyrightIcon />
              Reddit Coins
            </Dropdown.Item>
            <Dropdown.Item onClick={handleGroupClick}>
              {' '}
              <SecurityIcon />
              Reddit Premium
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <HelpOutlineIcon />
              Help Center
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogIn}>
              <ExitToAppIcon />
              Login/Signup
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
Actions.propTypes = { showSignup: PropTypes.func.isRequired, showLogin: PropTypes.func.isRequired };
