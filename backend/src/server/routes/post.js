const express = require('express');
const router = express.Router();

const {
  addPost,
  getPost,
  getPostByUserId,
  getPostByPage,
  updatePostUpvote,
  updatePostDownvote,
} = require('../controllers/post');

// keep adding end-points here
router.post('/add', addPost);
router.get('/', getPost);
router.get('/post', getPostByPage);
router.post('/upvote', updatePostUpvote);
router.post('/downvote', updatePostDownvote);
module.exports = router;
