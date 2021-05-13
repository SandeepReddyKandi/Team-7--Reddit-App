const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
auth();

const {
  addPost,
  getPost,
  getPostByPage,
  updatePostUpvote,
  updatePostDownvote,
  sortPostByUpvote,
  sortPostByDownvote,
  sortPostByDate,
  getPostById,
  addPostText,
  addPostImage,
  addPostLink,
  getPostCommunity,
} = require('../controllers/post');

// keep adding end-points here
router.post('/add', checkAuth, addPost);
router.get('/', checkAuth, getPost);
router.get('/post', getPostByPage);
router.get('/post/id', getPostById);
router.post('/upvote', updatePostUpvote);
router.post('/upvote/sort', sortPostByUpvote);
router.post('/downvote', updatePostDownvote);
router.post('/downvote/sort', sortPostByDownvote);
router.post('/date/sort', sortPostByDate);

router.post('/link', checkAuth, addPostLink);
router.post('/text', checkAuth, addPostText);
router.post('/image', checkAuth, addPostImage);
router.get('/community', checkAuth, getPostCommunity);

module.exports = router;
