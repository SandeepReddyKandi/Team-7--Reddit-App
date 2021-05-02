const express = require('express');
const router = express.Router();

const { addCommunity, getCommunity, getCommunityById, rateCommunity } = require('../controllers/community');

// keep adding end-points here
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.get('/communities', getCommunity);
router.get('/communities', getCommunityById);

module.exports = router;
