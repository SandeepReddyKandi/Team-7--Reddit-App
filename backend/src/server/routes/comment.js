const express = require('express');
const router = express.Router();

const { addComment, getComment } = require('../controllers/comment');

// keep adding end-points here
router.post('/add', addComment);
router.get('/', getComment);

module.exports = router;
