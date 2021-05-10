/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import constants from '../constants/constants';

export const getCommunity = createAsyncThunk('community/getCommunity', async (pckg) => {
  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${constants.baseUrl}/community/communities/?id=${pckg}`);
  if (response.status === 200) {
    return { auth: true, response: response.data };
  }
  return { auth: false, message: 'Server issue' };
});

export const clearError = createAsyncThunk('community/addCommunity', async () => ({ auth: true }));
