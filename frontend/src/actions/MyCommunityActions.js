/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addCommunity = createAsyncThunk('community/addCommunity', async (pckg) => {
  const response = await axios.post('http://localhost:3001/addCommunity', pckg);
  if (response.status === 200) {
    return { auth: true, response };
  }
  return { auth: false, message: 'Server issue' };
});

export const clearError = createAsyncThunk('community/addCommunity', async () => ({ auth: true }));
