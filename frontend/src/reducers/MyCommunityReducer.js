/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { clearError, addCommunity } from '../actions/MyCommunityActions';

export const MyCommunityReducer = createSlice({
  name: 'group',
  initialState: {
    community_name: '',
    topics: [],
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
  },
});

export default MyCommunityReducer.reducer;
