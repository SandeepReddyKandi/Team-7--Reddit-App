/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import constants from '../constants/constants'

export const getMyCommunity = createAsyncThunk('community/moderation/getMyCommunity', async (pckg) => {
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${constants.baseUrl}/community/getCommunityByAdmin/?id=${pckg}`);
    if (response.status === 200) {
      return { auth: true, response: response.data.msg };
    }
    return { auth: false, message: 'Server issue' };
  });

export const getMyInvitations = createAsyncThunk('community/moderation/getMyInvitations', async (pckg) => {
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${constants.baseUrl}/community/getInvitationByCommunity/?id=${pckg}`);
    if (response.status === 200) {
      return { auth: true, response: response.data.msg };
    }
    return { auth: false, message: 'Server issue' };
});

export const approveInvitataion = createAsyncThunk('community/moderation/approveInvite', async (pckg) => {
  axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${constants.baseUrl}/community/approveInvite`, pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data.msg, exitElement: pckg.invite_id };
  }
  return { auth: false, message: 'Server issue' };
});

export const removeMemberFromCommunity = createAsyncThunk('community/moderation/removeMember', async (pckg) => {
  axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${constants.baseUrl}/community/removeUserCommunity`, pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data.msg };
  }
  return { auth: false, message: 'Server issue' };
});


export const clearError = createAsyncThunk('community/moderation/clearError', async () => ({ auth: true }));
  