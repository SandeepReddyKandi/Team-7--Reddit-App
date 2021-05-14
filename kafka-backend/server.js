const mongoose = require("mongoose");
const express = require("express");
const app = express();

const {
  USER_LOGIN,
  USER_SIGNUP,
  GET_USER_BY_USER_NAME,
  UPDATE_USER_PROFILE,
  GET_USERS_BY_NAME,
  GET_USER_BY_ID,
  GET_COMMUNITY,
  ADD_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  GET_COMMUNITY_ANALYTICS,
  DELETE_COMMUNITY_BY_ID,
  GET_COMMUNITY_BY_ADMIN,
  GET_COMMUNITY_BY_MEMBER,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  GET_POST_BY_ID,
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  SORT_POST_BY_UPVOTE,
  SORT_POST_BY_DOWNVOTE,
  GET_INVITATIONS_FOR_COMMUNITY,
  APPROVE_INVITE,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  GET_COMMUNITY_BY_PAGE,
  GET_RULES_TOPICS,
  RATE_COMMUNITY,
  GET_COMMUNITY_VOTE_COUNT,
  GET_COMMUNITY_NAME_BY_ID,
  ADD_POST,
  GET_POST_BY_PAGE,
  ADD_COMMENT,
  GET_COMMENT,
  SEND_INVITE,
  GET_POST,
  GET_STATUS,
  GET_POST_COMMUNITY,
  GET_USERS,
  GET_INVITATIONS,
  GET_INVITATIONS_BY_PAGE,
  SORT_POST_BY_DATE,
  ADD_SUB_COMMENT,
  SEARCH_POST_BY_CRITERIA,
  LEAVE_COMMUNITY,
  SORT_DASHPOSTS_BY_UPVOTES
} = require("./kafka/topics");

//user
const userLogin = require("./services/users/userLogin");
const updateUserProfile = require("./services/users/updateUserProfile");
const userSignup = require("./services/users/userSignup");
const getUsersByName = require("./services/users/GetUsersByName");
const getUserByUserName = require("./services/users/getUserByUserName");
const getUserById = require("./services/users/GetUserById");
const getUsers = require("./services/users/getUsers");

//Community
const addCommunity = require("./services/Community/AddCommunity");
const getCommunity = require("./services/Community/GetCommunity");
const getCommunityById = require("./services/Community/GetCommunityById");
const getCommunityByAdmin = require("./services/Community/GetCommunityByAdmin");
const getCommunityAnalytics = require("./services/Community/GetCommunityAnalytics");
const getCommunityByMember = require("./services/Community/GetCommunityByMember");
const deleteCommunityById = require("./services/Community/DeleteCommunityById");
const getCommunityByPage = require("./services/Community/GetCommunityByPage");
const getCommunityByName = require("./services/Community/GetCommunityByName");
const rateCommunity = require("./services/Community/RateCommunity");
const getCommunityVoteCount = require("./services/Community/GetCommunityVoteCount");
const getRulesTopics = require("./services/Community/GetRulesTopics");
<<<<<<< HEAD
const leaveCommunity = require("./services/Community/LeaveCommunity");
=======
const getCommunityNameById = require("./services/Community/GetCommunityNameById");
>>>>>>> d1d0d71a96dd812b07ec1a4964c3d1ae52d4ed82

//Post
const addPost = require("./services/Post/AddPost");
const getPost = require("./services/Post/GetPost");
const getPostByPage = require("./services/Post/GetPostByPage");
const upvotePost = require("./services/Post/UpvotePost");
const sortPostByUpvote = require("./services/Post/SortPostWithUpvote");
const sortPostByDownvote = require("./services/Post/SortPostWithDownvote");
const getPostById = require("./services/Post/GetPostById");

//Comment
const addComment = require("./services/Comment/AddComment");
const getComment = require("./services/Comment/GetComment");
const upvoteComment = require("./services/Comment/UpvoteComment");
const downvoteComment = require("./services/Comment/DownvoteComment");
const addSubComment = require("./services/Comment/AddSubComment");

//Invitation
const sendInvite = require("./services/Invitation/SendInvite");
const getStatus = require("./services/Invitation/GetStatus");
const getInvitations = require("./services/Invitation/GetInvitations");
const getInvitationsByPage = require("./services/Invitation/GetInvitationsByPage");
const getInvitationsForCommunity = require("./services/Invitation/GetInvitationsForCommunity");
const approveInvite = require("./services/Invitation/ApproveInvite");

//Post
const addPostText = require("./services/Post/AddPostText");
const addPostImage = require("./services/Post/AddPostImage");
const addPostLink = require("./services/Post/AddPostLink");
const getPostCommunity = require("./services/Post/GetPostCommunity");
const downvotePost = require("./services/Post/DownvotePost");
const sortPostByDATE = require("./services/Post/SortPostByDate");
const searchPostsByCriteria = require("./services/Post/SearchPostsByCriteria");
const sortDashPostsByUpvotes = require("./services/Post/SortDashPostsByUpvotes");
// const getPost = require("./services/Post/GetPost");
// const getPostbyID = require("./services/Post/GetPostbyID");

const port = 3001;
const connection = require("./kafka/connection");

const uri =
  "mongodb+srv://admin:admin@cluster0.0uwhi.mongodb.net/RedditDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log("Data:", data);
      });
      return;
    });
  });
}

// User
handleTopicRequest(USER_LOGIN, userLogin);
handleTopicRequest(UPDATE_USER_PROFILE, updateUserProfile);
handleTopicRequest(USER_SIGNUP, userSignup);
handleTopicRequest(GET_USER_BY_USER_NAME, getUserByUserName);
handleTopicRequest(GET_USERS_BY_NAME, getUsersByName);
handleTopicRequest(GET_USER_BY_ID, getUserById);
handleTopicRequest(GET_USERS, getUsers);

//Community
handleTopicRequest(ADD_COMMUNITY, addCommunity);
handleTopicRequest(GET_COMMUNITY, getCommunity);
handleTopicRequest(GET_COMMUNITY_BY_ID, getCommunityById);
handleTopicRequest(GET_RULES_TOPICS, getRulesTopics);
handleTopicRequest(DELETE_COMMUNITY_BY_ID, deleteCommunityById);
handleTopicRequest(GET_COMMUNITY_BY_MEMBER, getCommunityByMember);
handleTopicRequest(GET_COMMUNITY_BY_ADMIN, getCommunityByAdmin);
handleTopicRequest(GET_COMMUNITY_BY_PAGE, getCommunityByPage);
handleTopicRequest(GET_COMMUNITY_NAME_BY_ID, getCommunityNameById);
handleTopicRequest(GET_COMMUNITY_ANALYTICS, getCommunityAnalytics);

//Post
handleTopicRequest(ADD_POST_TEXT, addPostText);
handleTopicRequest(ADD_POST_IMAGE, addPostImage);
handleTopicRequest(ADD_POST_LINK, addPostLink);
handleTopicRequest(GET_POST_COMMUNITY, getPostCommunity);
// handleTopicRequest(GET_POST_BY_ID, getPostbyID);
handleTopicRequest(GET_COMMUNITY_BY_NAME, getCommunityByName);
handleTopicRequest(RATE_COMMUNITY, rateCommunity);
handleTopicRequest(GET_COMMUNITY_VOTE_COUNT, getCommunityVoteCount);

//Post
handleTopicRequest(ADD_POST, addPost);
handleTopicRequest(GET_POST, getPost);
handleTopicRequest(GET_POST_BY_PAGE, getPostByPage);
handleTopicRequest(GET_POST_BY_ID, getPostById);
handleTopicRequest(UPVOTE_POST, upvotePost);
handleTopicRequest(DOWNVOTE_POST, downvotePost);
handleTopicRequest(SORT_POST_BY_UPVOTE, sortPostByUpvote);
handleTopicRequest(SORT_POST_BY_DOWNVOTE, sortPostByDownvote);
handleTopicRequest(SORT_POST_BY_DATE, sortPostByDATE);
handleTopicRequest(SORT_POST_BY_DATE, sortPostByDATE);
handleTopicRequest(SEARCH_POST_BY_CRITERIA, searchPostsByCriteria);
handleTopicRequest(SORT_DASHPOSTS_BY_UPVOTES, sortDashPostsByUpvotes);

//Comment
handleTopicRequest(ADD_COMMENT, addComment);
handleTopicRequest(GET_COMMENT, getComment);
handleTopicRequest(UPVOTE_COMMENT, upvoteComment);
handleTopicRequest(DOWNVOTE_COMMENT, downvoteComment);
handleTopicRequest(ADD_SUB_COMMENT, addSubComment);

//Invitation
handleTopicRequest(GET_INVITATIONS, getInvitations);
handleTopicRequest(GET_INVITATIONS_BY_PAGE, getInvitationsByPage);
handleTopicRequest(SEND_INVITE, sendInvite);
handleTopicRequest(GET_STATUS, getStatus);
handleTopicRequest(LEAVE_COMMUNITY, leaveCommunity);
handleTopicRequest(GET_INVITATIONS_FOR_COMMUNITY, getInvitationsForCommunity);
handleTopicRequest(APPROVE_INVITE, approveInvite);
