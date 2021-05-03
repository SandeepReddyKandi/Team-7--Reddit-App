const express = require('express');
const router = express.Router();

const { addCommunity, getCommunity, getCommunityById, getRulesTopics } = require('../controllers/community');

// keep adding end-points here
router.post('/add', addCommunity);
router.post('/', getCommunity);
router.get('/', getCommunityById);
router.get('/gettr', getRulesTopics)

module.exports = router;
