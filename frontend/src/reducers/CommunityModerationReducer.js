/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMyCommunity } from '../actions/CommunityModerationAction';

export const CommunityModerationReducer = createSlice({
    name: 'group',
    initialState: {
      community: [{
        community_name:"Test Com",
        description:" This is a new community.",
        images:[],
        posts: 23,
        members: 4,
        createdAt: "2021-04-30T04:09:41.307+00:00",
        rules: [],
        topics: ["topic1", "topic2"],
      }]
    },
    extraReducers: {
      [getMyCommunity.fulfilled]: (state, action) => {
        if (action.payload.auth) {
          state.community = action.payload.response;
        }
      },
    },
  });
  
  export default CommunityModerationReducer.reducer;