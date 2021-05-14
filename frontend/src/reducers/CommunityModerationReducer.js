/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMyCommunity, getMyInvitations, clearError, approveInvitataion } from '../actions/CommunityModerationAction';

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
      error: null,
      message: null,
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
          state.message = "Successfully approved";
        }
        else{
          state.error = "User Not Approved";
        }

      },
      [clearError.fulfilled]: (state) => {
          state.message = null;
          state.error = null;
      }
    },
  });
  
  export default CommunityModerationReducer.reducer;