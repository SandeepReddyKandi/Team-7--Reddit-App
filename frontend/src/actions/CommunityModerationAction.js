/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import constants from '../constants/constants'

export const getMyCommunity = createAsyncThunk('community/getMyCommunity', async (pckg) => {
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${constants.baseUrl}/community/getCommunityByAdmin/?id=${pckg}`);
    if (response.status === 200) {
      return { auth: true, response: response.data.msg };
    }
    return { auth: false, message: 'Server issue' };
  });
  