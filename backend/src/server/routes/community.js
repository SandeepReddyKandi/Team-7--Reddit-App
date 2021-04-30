const express = require('express');
const router = express.Router();

const { addCommunity, getCommunity, getCommunityById, rateCommunity } = require('../controllers/community');

// keep adding end-points here
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.post('/', getCommunity);
router.get('/', getCommunityById);

module.exports = router;
