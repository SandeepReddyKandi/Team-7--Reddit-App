const express = require('express');
const router = express.Router();

const { addPostText, addPostImage, addPostLink, getPost, getPostbyID } = require('../controllers/posts');

// keep adding end-points here
router.post('/link', addPostLink);
router.post('/text', addPostText);
router.post('/image', addPostImage);
router.get('/', getPost);
router.get('/', getPostbyID);

module.exports = router;
