/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addCommunity = createAsyncThunk('community/addCommunity', async (pckg) => {
  const response = await axios.post('http://localhost:3001/community/addCommunity', pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data };
  }
  return { auth: false, message: 'Server issue' };
});

export const getRulesTopic = createAsyncThunk('community/getRulesTopic', async (pckg) => {
  const response = await axios.get('http://localhost:3001/community/gettr', pckg);
  if (response.status === 200) {
    return { auth: true, response: response.data.msg };
  }
  return { auth: false, message: 'Server issue' };
});

export const addRulesTopic = createAsyncThunk('community/addRulesTopic', async (pckg) => {
  const response = await axios.get('http://localhost:3001/community/addtr', pckg);
  if (response.status === 200) {
    return { auth: true, message: "Successful" };
  }
  return { auth: false, message: 'Server issue' };
});


export const clearError = createAsyncThunk('community/addCommunity', async () => ({ auth: true }));
