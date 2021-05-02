/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import MyCommunityReducer from './MyCommunityReducer';

export default configureStore(
  {
    reducer: {
      addCommunity: MyCommunityReducer,
    },
  },
  composeWithDevTools()
);
