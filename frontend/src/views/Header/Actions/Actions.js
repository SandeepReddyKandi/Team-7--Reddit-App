/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from "react";
import "./Actions.css";
import PersonIcon from "@material-ui/icons/Person";
import Col from 'react-bootstrap/Col';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from '@material-ui/core/IconButton';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SecurityIcon from '@material-ui/icons/Security';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Chip from '@material-ui/core/Chip';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from "react-modal";

export default function Actions() {

    const handleMenu = () => {

    };

    const handleProfilelick = () => {

    };
    const handleGroupClick = () => {

    };
    const handleLogout = () => {

    };
    const handleLogIn = () => {

    };

    const handleLoginModal = () => {
        console.log("****Open Login Modal window******")
    };

    const handleSignupModal = () => {
        console.log("****Open SignUp Modal window******")
    };

    return (
        <div className="actions">
            <Col md={2} />
            <Col md={3}>
                <Chip
                    label="LOG IN"
                    clickable
                    style={{ backgroundColor: "transparent", fontWeight: 600, border: "1px solid var(--border-color)" }}
                    onClick={handleLoginModal}
                />
                <Modal
                    contentLabel="Log In">
                    <h2>Enter Credentials</h2>
                    <hr />
                    <form >

                        <span >
                            <input
                                type="text"
                                required
                            />
                            <div >
                                <input
                                    type="number"
                                    required
                                />
                            </div>
                        </span>
                        <br />
                        <div className="buttons">
                            <button type="button" className="cancelbutton">
                                Cancel
                            </button>
                            <input type="submit" value="Save" className="savebutton" />
                        </div>
                    </form>
                </Modal>
            </Col>
            <Col md={3}>
                <Chip
                    label="SIGN UP"
                    clickable
                    color="primary"
                    onClick={handleSignupModal}
                />
            </Col>
            <Col md={3}>
                <div className="profile">
                    <Dropdown>
                        <Dropdown.Toggle className="header-user"
                            style={{ backgroundColor: "transparent", border: "0px" }}>
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
            </Col>
        </div>
    );
}