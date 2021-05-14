/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/UserActions';

export const UserReducer = createSlice({
  name: 'user',
  initialState: { user: [] },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.user = action.payload.response;
      }
    },
  },
});

export default UserReducer.reducer;
