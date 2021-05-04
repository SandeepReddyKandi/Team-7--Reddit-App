const mongoose = require("mongoose");
const express = require("express");
const app = express();

const {
  USER_LOGIN,
  USER_SIGNUP,
  GET_COMMUNITY,
  ADD_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  GET_RULES_TOPICS,
  RATE_COMMUNITY,
  ADD_POST,
  ADD_COMMENT,
  GET_COMMENT,
  SEND_INVITE,
  GET_POST,
  GET_STATUS,
} = require("./kafka/topics");

//user
const userLogin = require("./services/users/userLogin");
const userSignup = require("./services/users/userSignup");

//Community
const addCommunity = require("./services/Community/AddCommunity");
const getCommunity = require("./services/Community/GetCommunity");
const getCommunityById = require("./services/Community/GetCommunityById");

const getCommunityByName = require("./services/Community/GetCommunityByName");
const rateCommunity = require("./services/Community/RateCommunity");
const getRulesTopics = require("./services/Community/GetRulesTopics");
//Post
const addPost = require("./services/Post/AddPost");
const getPost = require("./services/Post/GetPost");

//Comment
const addComment = require("./services/Comment/AddComment");
const getComment = require("./services/Comment/GetComment");

//Invitation
const sendInvite = require("./services/Invitation/SendInvite");
const getStatus = require("./services/Invitation/GetStatus");

//Post
const addPostText = require("./services/Post/AddPostText");
const addPostImage = require("./services/Post/AddPostImage");
const addPostLink = require("./services/Post/AddPostLink");
// const getPost = require("./services/Post/GetPost");
// const getPostbyID = require("./services/Post/GetPostbyID");

const port = 3001;
const connection = require("./kafka/connection");

// /* Db Connection */
// const db = connectToDatabase().then(() => {
//     app.listen(port, console.log("Server is listening on port :", port));
//   });

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
        console.log(data);
      });
      return;
    });
  });
}

// User
handleTopicRequest(USER_LOGIN, userLogin);
handleTopicRequest(USER_SIGNUP, userSignup);

//Community
handleTopicRequest(ADD_COMMUNITY, addCommunity);
handleTopicRequest(GET_COMMUNITY, getCommunity);
handleTopicRequest(GET_COMMUNITY_BY_ID, getCommunityById);
handleTopicRequest(GET_RULES_TOPICS, getRulesTopics);

//Post
handleTopicRequest(ADD_POST_TEXT, addPostText);
handleTopicRequest(ADD_POST_IMAGE, addPostImage);
handleTopicRequest(ADD_POST_LINK, addPostLink);
// handleTopicRequest(GET_POST, getPost);
// handleTopicRequest(GET_POST_BY_ID, getPostbyID);
handleTopicRequest(GET_COMMUNITY_BY_NAME, getCommunityByName);
handleTopicRequest(RATE_COMMUNITY, rateCommunity);

//Post
handleTopicRequest(ADD_POST, addPost);
handleTopicRequest(GET_POST, getPost);

//Comment
handleTopicRequest(ADD_COMMENT, addComment);
handleTopicRequest(GET_COMMENT, getComment);

//Invitation

handleTopicRequest(SEND_INVITE, sendInvite);
handleTopicRequest(GET_STATUS, getStatus);

