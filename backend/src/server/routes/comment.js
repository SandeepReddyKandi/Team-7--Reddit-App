const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require( '../utils/passport' )
auth();
const { addComment, getComment } = require('../controllers/comment');

// keep adding end-points here
router.post('/add', checkAuth, addComment);
router.get('/', checkAuth, getComment);

module.exports = router;
