/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import { Form, Carousel } from 'react-bootstrap';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line import/no-named-as-default-member
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { FaTimes } from 'react-icons/fa';
import MyCommunityTab from './MyCommunityTab';
import { getMyCommunity, getRulesTopic } from '../../actions/MyCommunityActions';
import Header from '../Header/Header';
import logo from '../../side_bg.jpeg';
import MyCommunityCard from './MyCommunityCard';

// eslint-disable-next-line arrow-body-style
const MyCommunity = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.addCommunity);
  useEffect(() => {
    dispatch(getMyCommunity({member_id: localStorage.getItem('user')}))
  }, [dispatch])
  
  const handleGetUsers = async (e) => {
    const response = await axios.get('http://localhost:3001/users/getUsers');
  };

  const input = document.querySelector('topic');
  if (input !== null) {
    input.addEventListener('keyup', (e) => {
      let event;
      if (!e) event = window.event;
    });
  }

  return (
    <div>
      <Header />

      <Button onClick={handleGetUsers}>Get Users</Button>
      <Row>
        <Col sm={3}>
          <p>Sample</p>
        </Col>
        <Col md={6}>
          <MyCommunityCard communities={reduxData.community} />
        </Col>
      </Row>
    </div>
  );
};

export default MyCommunity;
