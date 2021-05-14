/* eslint-disable no-underscore-dangle */
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
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import TablePagination from '@material-ui/core/TablePagination';
// eslint-disable-next-line import/no-named-as-default-member
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { FaTimes } from 'react-icons/fa';
import { getMyCommunity, getMyInvitations } from '../../actions/CommunityModerationAction';
import Header from '../Header/Header';
import logo from '../../side_bg.jpeg';
import CommunityModerationCard from './CommunityModerationCard';
import RequestTab from './UserTileCard/RequestTab';
import CommunityModal from './CommunityModal'

// eslint-disable-next-line arrow-body-style
const CommunityModeration = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.communitymoderation);
  const [requestCommunity, toggleRequest] = useState(reduxData.community[0]._id)
  const [page, setPage] = useState([]);
  const [userListModal, setUserListModal] = useState([])
  const [invitationList, setInvitationList] = useState([])
  const [communityIdModal, setIdModal] = useState('')
  const [totalPage, setTotalPage] = useState(reduxData.community.length);
  const [modalToggle, setModalToggle] = useState(false);
  const [communityModal, setCommunityModal] = useState(null);
useEffect(() => {
 dispatch(getMyCommunity(localStorage.getItem('userId')))
}, [dispatch])

useEffect(() => {
  setInvitationList(reduxData.invitataions)
}, [reduxData.invitataions])

  const input = document.querySelector('topic');
  if (input !== null) {
    input.addEventListener('keyup', (e) => {
      let event;
      if (!e) event = window.event;
    });
  }
  const getToggleInvitation = (communityId) => {
    dispatch(getMyInvitations(communityId))
  }
  const showModal = (userList, communityId) => {
    setUserListModal(userList);
    setIdModal(communityId);
    setModalToggle(true);
  }
  const exitModal = () => {
    setModalToggle(false);
  }
  return (
    <div>
    <CommunityModal isOpen={modalToggle} userList={userListModal} community={communityIdModal} exitModal={exitModal} />
    <Header />
    <Row style={{marginTop: "2%"}}>
      <Col sm={3}>
    <RequestTab communityId={requestCommunity} invitataions={invitationList}/>
      </Col>
      <Col md={6}>
        {reduxData.community.length > 0 ?
          <div>{reduxData.community.map((community) => <CommunityModerationCard community={community} requestToggle={getToggleInvitation} showModal={showModal} />)}</div>
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

export default CommunityModeration;
