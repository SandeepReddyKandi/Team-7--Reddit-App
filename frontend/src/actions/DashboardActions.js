/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('/dash/posts', async (pckg) => {
  return {posts: pckg};
});