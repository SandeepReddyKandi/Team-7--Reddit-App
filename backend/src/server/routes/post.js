const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
auth();

const {
  addPost,
  getPost,
  getPostByUserId,
  getPostByPage,
  updatePostUpvote,
  updatePostDownvote,
  sortPostByUpvote,
  sortPostByDownvote,
  sortPostByDate,
} = require('../controllers/post');

// keep adding end-points here
router.post('/add', checkAuth, addPost);
router.get('/', checkAuth, getPost);
router.get('/post', getPostByPage);
router.post('/upvote', updatePostUpvote);
router.post('/upvote/sort', sortPostByUpvote);
router.post('/downvote', updatePostDownvote);
router.post('/downvote/sort', sortPostByDownvote);
router.post('/date/sort', sortPostByDate);
module.exports = router;
