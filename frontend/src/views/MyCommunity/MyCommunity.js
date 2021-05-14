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
import TablePagination from '@material-ui/core/TablePagination';
import MyCommunityTab from './MyCommunityTab';
import { getMyCommunity, getRulesTopic } from '../../actions/MyCommunityActions';
import Header from '../Header/Header';
import logo from '../../side_bg.jpeg';
import MyCommunityCard from './MyCommunityCard';

// eslint-disable-next-line arrow-body-style
const MyCommunity = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.addCommunity);
  const [page, setPage] = useState([]);
  const [totalPage, setTotalPage] = useState(reduxData.community.length);
  
  useEffect(() => {
    dispatch(getMyCommunity(localStorage.getItem('user')))
  }, [dispatch])

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
      <Row style={{ height: '100px', 'background-color': '#0579d3' }}>
            <Col md={12}> &nbsp;</Col>
          </Row>
          <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
            <Col md={2}>&nbsp;</Col>

            <Col md={11}>
              <Row>
                <Col md={3}>&nbsp;</Col>
                <Col md={5}>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{
                      paddingLeft: '5%',
                      marginBottom: '10px',
                    }}
                  >
                    My CommunityPage
                  </Typography>
                </Col>
                <Col md={3}>&nbsp;</Col>
              </Row>
            </Col>
          </Row>
      <Row>
        <Col sm={3}>
          <p>Sample</p>
        </Col>
        <Col md={6}>
        <TablePagination
                  component="div"
                  count={20}
                  page={page}
                  onChangePage={null}
                  rowsPerPage={5}
                  onChangeRowsPerPage={null}
                  rowsPerPageOptions={[2, 5, 10]}
                />
          {reduxData.community.length > 0 ? 
            <div>{reduxData.community.map((community) => <MyCommunityCard community={community} />)}</div>
          : null}
          <TablePagination
                  component="div"
                  count={20}
                  page={page}
                  onChangePage={null}
                  rowsPerPage={5}
                  onChangeRowsPerPage={null}
                  rowsPerPageOptions={[2, 5, 10]}
                />
        </Col>
      </Row>
    </div>
  );
};

export default MyCommunity;
