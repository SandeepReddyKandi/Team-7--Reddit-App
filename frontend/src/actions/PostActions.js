/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import constants from '../constants/constants';

export const getPost = createAsyncThunk('/post/post', async (community_id, rows, page) => {
  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const response = await axios.get(
    `${constants.baseUrl}/post/post/?id=${community_id}&page=${page}&rows=${rows}`
  );

  if (response.status === 200) {
    return { auth: true, response: response.data.data };
  }
  return { auth: false, message: 'Server issue' };
});
