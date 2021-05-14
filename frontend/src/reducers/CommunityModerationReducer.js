/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMyCommunity, getMyInvitations, clearError, approveInvitataion, removeMemberFromCommunity } from '../actions/CommunityModerationAction';

export const CommunityModerationReducer = createSlice({
    name: 'group',
    initialState: {
      community: [{
        community_name:"No Community available",
        description:" This is a not a community.",
        images:[],
        posts: 0,
        members: 0,
        createdAt: "",
        rules: [],
        topics: [],
      }],
      error: false,
      feed: '',
      success: false,
      invitations: []
    },
    extraReducers: {
      [getMyCommunity.fulfilled]: (state, action) => {
        if (action.payload.auth) {
          state.community = action.payload.response;
        }
        else{
          state.error = "No data found";
        }
      },
      [getMyInvitations.fulfilled]: (state, action) => {
        if (action.payload.auth) {
          state.invitations = action.payload.response;
        }
        else{
          state.error = "No data found";
        }
      },
      [approveInvitataion.fulfilled]: (state, action) => {
        if (action.payload.auth) {
          state.feed = "Successfully approved";
          state.success = true;
          const newList = []
          for (const i in state.invitations){
            if(state.invitations[i]._id === action.payload.exitElement){
              continue;
            }
            newList.push(state.invitations[i])
          }
          state.invitations= newList;
        }
        else{
          state.error = "User Not Approved";
        }
      },
      [approveInvitataion.rejected]: (state) => {
          state.feed = "Request Rejected By DB";
          state.error = true;
      },
      [clearError.fulfilled]: (state) => {
          state.feed = false;
          state.error = null;
          state.success = false
      },
      [removeMemberFromCommunity.fulfilled]: (state,action) => {
        if (action.payload.auth) {
          state.feed = "Successfully removed";
          state.success = true;
        }
      },
      [removeMemberFromCommunity.rejected]: (state,action) => {
        if (action.payload.auth) {
          state.feed = "unsuceessful operation";
          state.error = true;
        }
      }
    },
  });
  
  export default CommunityModerationReducer.reducer;