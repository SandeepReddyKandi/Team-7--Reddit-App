// User
const USER_LOGIN = "userLogin";
const USER_SIGNUP = "userSignup";

//Community
const ADD_COMMUNITY = "addCommunity";
const GET_COMMUNITY = "getCommunity";
const GET_COMMUNITY_BY_ID = "getCommunityById";
const GET_COMMUNITY_BY_NAME = "getCommunityByName";
const RATE_COMMUNITY = "rateCommunity";

//Post
const ADD_POST = "addPost";
const GET_POST = "getPost";

//Comment
const ADD_COMMENT = "addComment";
const GET_COMMENT = "getComment";

//Invitation
const SEND_INVITE = "sendInvite";

//Post
const ADD_POST_TEXT='addPostText';
const ADD_POST_IMAGE='addPostImage';
const ADD_POST_LINK='addPostLink';
// const GET_POST='getPost';
// const GET_POST_BY_ID='getPostbyID';

module.exports = {
  USER_LOGIN,
  USER_SIGNUP,
  ADD_COMMUNITY,
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  RATE_COMMUNITY,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  GET_COMMENT,
  SEND_INVITE,
};
