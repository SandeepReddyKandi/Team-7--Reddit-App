// User
const USER_LOGIN = "userLogin";
const USER_SIGNUP = "userSignup";
const GET_USERS = "getUsers";

//Community
const ADD_COMMUNITY = "addCommunity";
const GET_COMMUNITY = "getCommunity";
const GET_COMMUNITY_BY_ID = "getCommunityById";
const DELETE_COMMUNITY_BY_ID = "deleteCommunity";

const GET_COMMUNITY_BY_NAME = "getCommunityByName";
const GET_COMMUNITY_BY_MEMBER = "getCommunityByMember";
const GET_COMMUNITY_BY_ADMIN = "getCommunityByAdmin";
const RATE_COMMUNITY = "rateCommunity";
const JOIN_COMMUNITY = "joinCommunity";
const GET_RULES_TOPICS = "getRulesTopics";
const DOWNVOTE_POST = "downvotePost";

//Post
const ADD_POST = "addPost";
const GET_POST = "getPost";
const GET_POST_BY_PAGE = "getPostByPage";
const UPVOTE_POST = "upvotePost";

//Comment
const ADD_COMMENT = "addComment";
const GET_COMMENT = "getComment";

//Invitation
const SEND_INVITE = "sendInvite";
const GET_STATUS = "getStatus";
const GET_INVITATIONS = "getInvitations";

//Post
const ADD_POST_TEXT='addPostText';
const ADD_POST_IMAGE='addPostImage';
const ADD_POST_LINK='addPostLink';
const GET_POST_COMMUNITY='getPostCommunity';

module.exports = {
  GET_USERS,
  USER_LOGIN,
  USER_SIGNUP,
  GET_USERS,
  ADD_COMMUNITY,
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  DELETE_COMMUNITY_BY_ID,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  DOWNVOTE_POST,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  GET_COMMUNITY_BY_MEMBER,
  GET_COMMUNITY_BY_ADMIN,
  RATE_COMMUNITY,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  GET_POST_BY_PAGE,
  GET_COMMENT,
  SEND_INVITE,
  GET_INVITATIONS,
  JOIN_COMMUNITY,
  GET_STATUS,
  GET_RULES_TOPICS,
  GET_POST_COMMUNITY,
  UPVOTE_POST,
};
