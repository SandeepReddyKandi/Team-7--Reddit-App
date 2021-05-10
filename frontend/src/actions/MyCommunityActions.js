/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addCommunity = createAsyncThunk('community/addCommunity', async (pckg) => {
  axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.withCredentials = true;
  const response = await axios.post('http://localhost:3001/community/add', pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data };
  }
  return { auth: false, message: 'Server issue' };
});

export const getRulesTopic = createAsyncThunk('community/getRulesTopic', async (pckg) => {
  axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.withCredentials = true;
  const response = await axios.get('http://localhost:3001/community/gettr', pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data.msg };
  }
  return { auth: false, message: 'Server issue' };
});

export const getMyCommunity = createAsyncThunk('community/getMyCommunity', async (pckg) => {
  axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
  axios.defaults.withCredentials = true;
  const response = await axios.get('http://localhost:3001/community/getCommunityByMember', pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data.msg };
  }
  return { auth: false, message: 'Server issue' };
});


export const clearError = createAsyncThunk('community/addCommunity', async () => ({ auth: true }));
