/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { clearError, addCommunity, getRulesTopic } from '../actions/MyCommunityActions';

export const MyCommunityReducer = createSlice({
  name: 'group',
  initialState: {
    community_name: '',
    topics: ['abc', 'def'],
    rules: [],
    images: [],
  },
  extraReducers: {
    [clearError.fulfilled]: (state) => {
      state.error = false;
      state.feed = '';
      state.success = false;
    },
    [addCommunity.fulfilled]: (state) => {
      state.error = false;
      state.feed = '';
      state.success = false;
    },
    [getRulesTopic.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.rules = action.payload.response.rules;
        state.topics = action.payload.response.topics;
      }
    },
  },
});

export default MyCommunityReducer.reducer;
