/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { clearError, addCommunity, getRulesTopic, getMyCommunity } from '../actions/MyCommunityActions';

export const MyCommunityReducer = createSlice({
  name: 'group',
  initialState: {
    community_name: '',
    topics: ['abc', 'def'],
    rules: [],
    images: [],
    community: [{
      community_name:"Test Com",
      description:" This is a new community.",
      images:[],
      posts: 23,
      members: 4,
      createdAt: "2021-04-30T04:09:41.307+00:00",
      rules: [],
      topics: ["topic1", "topic2"],
    }],
    error: false,
    feed: '',
    success: false,
  },
  extraReducers: {
    [clearError.fulfilled]: (state) => {
      state.error = false;
      state.feed = '';
      state.success = false;
    },
    [addCommunity.fulfilled]: (state, action) => {
      if (action.payload.auth){
        state.success = true
        state.feed = "Community created successfully";
      }
      else{
        state.error = false;
        state.feed = 'database issue, please use with other community name';
      }
    },
    [addCommunity.rejected]: (state) => {
      state.error = true;
      state.feed = 'database issue, please use with other community name';
    },
    [getRulesTopic.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.rules = action.payload.response.rules;
        state.topics = action.payload.response.topics;
      }
    },
    [getMyCommunity.fulfilled]: (state, action) => {
      if (action.payload.auth) {
        state.community = action.payload.response;
      }
    },
  },
});

export default MyCommunityReducer.reducer;
