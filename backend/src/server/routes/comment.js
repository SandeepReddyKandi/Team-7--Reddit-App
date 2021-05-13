const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
auth();
const {
  addComment,
  getComment,
  upvoteComment,
  downvoteComment,
  addSubComment,
} = require('../controllers/comment');

// keep adding end-points here
router.post('/add', checkAuth, addComment);
router.get('/', checkAuth, getComment);
router.post('/upvote', checkAuth, upvoteComment);
router.post('/downvote', checkAuth, downvoteComment);
router.post('/subcomment', checkAuth, addSubComment);

module.exports = router;
