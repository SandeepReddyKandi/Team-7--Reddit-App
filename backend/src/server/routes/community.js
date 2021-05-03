const express = require('express');
const router = express.Router();

const {
  addCommunity,
  getCommunity,
  getCommunityById,
  rateCommunity,
  sendInvite,
  getStatus,
} = require('../controllers/community');

// keep adding end-points here
router.post('/invite', sendInvite);
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.get('/communities', getCommunity);
router.get('/communities', getCommunityById);
router.post('/status', getStatus);

module.exports = router;
