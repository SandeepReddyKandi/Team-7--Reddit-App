const express = require('express');
const router = express.Router();

const { addComment } = require('../controllers/comment');

// keep adding end-points here
router.post('/add', addComment);

module.exports = router;
