const express = require('express');
const router = express.Router();

const { addCommunity, getCommunity, getCommunityById } = require('../controllers/community');

// keep adding end-points here
router.post('/add', addCommunity);
router.get('/communities', getCommunity);
router.get('/communities', getCommunityById);

module.exports = router;
