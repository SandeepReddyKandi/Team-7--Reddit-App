const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
auth();
const {
  addComment,
  getComment,
  upvoteComment,
  downvoteComment,
} = require('../controllers/comment');

// keep adding end-points here
router.post('/add', checkAuth, addComment);
router.get('/', checkAuth, getComment);
router.post('/upvote', checkAuth, upvoteComment);
router.post('/downvote', checkAuth, downvoteComment);

module.exports = router;
