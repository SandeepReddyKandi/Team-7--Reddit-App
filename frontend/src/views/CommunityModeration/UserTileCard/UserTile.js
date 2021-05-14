/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {Row,Col} from 'react-bootstrap';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import './UserTile.css';

export default function UserTile({users, removeMember}) {
    return (
        <div className="community-section">
            <div className="communities-wrapper">
                {users.map((user, index) => (
                    <div className="community hoverable">
                        <Row>
                        <Col md={1}>
                        <span>{index + 1}</span>
                        </Col>
                        <Col md={1}>
                        <img src={user.photo} alt="logo"/>
                        </Col>
                        <Col md={4}>
                        <span className="name">{user.name}</span>
                        </Col>
                        <Col md={{offset:2}}>
                        <IconButton aria-label="share">
                              <RemoveCircleOutlineIcon onClick={() => removeMember(user._id)} />
                          </IconButton>
                        </Col>
                        </Row>
                    </div>
                ))}
            </div>           
        </div>
    );
}