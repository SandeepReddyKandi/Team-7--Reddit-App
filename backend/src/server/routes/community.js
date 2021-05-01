const express = require('express');
const router = express.Router();

const {
  addCommunity,
  getCommunity,
  getCommunityById,
  rateCommunity,
  sendInvite,
} = require('../controllers/community');

// keep adding end-points here
router.post('/invite', sendInvite);
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.post('/', getCommunity);
router.get('/', getCommunityById);

module.exports = router;
