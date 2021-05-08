const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require( '../utils/passport' )
auth();
const { addPost, getPost, getPostByUserId } = require('../controllers/post');

// keep adding end-points here
router.post('/add', checkAuth, addPost);
router.get('/', checkAuth, getPost);
module.exports = router;
