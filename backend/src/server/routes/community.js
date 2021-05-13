const express = require('express');
const router = express.Router();

const { auth, checkAuth } = require('../utils/passport');
auth();

const {
  addCommunity,
  getCommunity,
  getCommunityById,
  deleteCommunityById,
  rateCommunity,
  sendInvite,
  getStatus,
  getCommunityByName,
  getCommunityByAdmin,
  getCommunityByMember,
  getCommunityAnalytics,
  getRulesTopics,
  getInvitations,
} = require('../controllers/community');

router.get('/getInvitations', checkAuth, getInvitations);
router.post('/invite', checkAuth, sendInvite);
router.post('/rate', checkAuth, rateCommunity);
router.post('/add', checkAuth, addCommunity);
router.get('/communities', checkAuth, getCommunity);
router.get('/communities', checkAuth, getCommunityById);
router.post('/status', checkAuth, getStatus);
router.get('/gettr', checkAuth, getRulesTopics);
router.get('/getCommunityByName', checkAuth, getCommunityByName);
router.get('/getCommunityByAdmin', checkAuth, getCommunityByAdmin);
router.get('/get-community-analytics', getCommunityAnalytics);
router.get('/getCommunityByMember', checkAuth, getCommunityByMember);
router.get('/deletecommunitybyid', checkAuth, deleteCommunityById);

module.exports = router;
