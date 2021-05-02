const express = require('express');
const router = express.Router();

const { addPost } = require('../controllers/post');

// keep adding end-points here
router.post('/add', addPost);

module.exports = router;
