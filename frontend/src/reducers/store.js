/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import MyCommunityReducer from './MyCommunityReducer';
import CommunityHomePageReducer from './CommunityHomePageReducer';
import CommunityModerationReducer from './CommunityModerationReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';

export default configureStore(
  {
    reducer: {
      addCommunity: MyCommunityReducer,
      communityHome: CommunityHomePageReducer,
      communitymoderation: CommunityModerationReducer,
      user: UserReducer,
      post: PostReducer,
    },
  },
  composeWithDevTools()
);
