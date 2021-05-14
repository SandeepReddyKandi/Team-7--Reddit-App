/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {getPosts } from '../actions/DashboardActions';

export const DashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    posts: []
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export default DashboardReducer.reducer;