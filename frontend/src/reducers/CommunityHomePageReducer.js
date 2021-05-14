/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCommunity } from '../actions/CommunityHomePageActions';

export const CommunityHomePageReducer = createSlice({
  name: 'group',
  initialState: { community: [{ post: [], members: [], images: [] }], comments: [] },
  extraReducers: {
    [getCommunity.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.community = action.payload.response.data;
      }
    },
  },
});

export default CommunityHomePageReducer.reducer;
