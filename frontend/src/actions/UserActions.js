/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import constants from '../constants/constants';

export const getUser = createAsyncThunk('community/getMyCommunity', async (id) => {
  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios
    .get(`${constants.baseUrl}/users/getUserById?id=${id}`)
    .then((response) => {
      if (response.status === 200) {
        return { auth: true, response: response.data };
      }
      return { auth: false, message: 'Server issue' };
    })
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(error);
    });
});
