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
      [clearError.fulfilled]: (state) => {
          state.message = null;
          state.error = null;
      },
      [removeMemberFromCommunity.fulfilled]: (state,action) => {
        if (action.payload.auth) {
          state.message = "Successfully removed";
        }
      }
    },
  });
  
  export default CommunityModerationReducer.reducer;