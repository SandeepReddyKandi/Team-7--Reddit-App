const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require( '../utils/passport' )
auth();

const {
  addCommunity,
  getCommunity,
  getCommunityById,
  rateCommunity,
  sendInvite,
  getStatus,
  getCommunityByName,
  getRulesTopics,
} = require('../controllers/community');

// keep adding end-points here
router.post('/invite', checkAuth, sendInvite);
router.post('/rate', checkAuth, rateCommunity);
router.post('/add', checkAuth, addCommunity);
router.get('/communities', checkAuth, getCommunity);
router.get('/communities', checkAuth, getCommunityById);
router.post('/status', checkAuth, getStatus);
router.get('/gettr', checkAuth, getRulesTopics)
router.get('/getCommunityByName', checkAuth, getCommunityByName);


module.exports = router;
