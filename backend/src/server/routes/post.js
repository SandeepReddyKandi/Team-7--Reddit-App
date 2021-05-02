const express = require('express');
const router = express.Router();

const { addPost, getPost } = require('../controllers/post');

// keep adding end-points here
router.post('/add', addPost);
router.get('/', getPost);

module.exports = router;
