/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getPost } from '../actions/PostActions';

export const PostReducer = createSlice({
  name: 'post',
  initialState: {},
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.post = action.payload.response;
      }
    },
  },
});

export default PostReducer.reducer;
