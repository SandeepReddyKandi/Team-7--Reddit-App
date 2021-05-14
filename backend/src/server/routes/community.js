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
  getCommunityByPage,
  getCommunityByAdmin,
  getCommunityByMember,
  getRulesTopics,
  getInvitations,
  getInvitationsByPage,
  getCommunityVoteCount,
  leaveCommunity,
} = require('../controllers/community');

router.get('/getInvitations', checkAuth, getInvitations);
router.post('/getInvitationsByPage', checkAuth, getInvitationsByPage);
router.post('/invite', checkAuth, sendInvite);
router.post('/rate', checkAuth, rateCommunity);
router.get('/getVoteCount', checkAuth, getCommunityVoteCount);
router.post('/add', checkAuth, addCommunity);
router.get('/communities', checkAuth, getCommunity);
router.get('/communities', checkAuth, getCommunityById);
router.post('/status', checkAuth, getStatus);
router.get('/gettr', checkAuth, getRulesTopics);
router.get('/getCommunityByName', checkAuth, getCommunityByName);
router.post('/getCommunityByPage', checkAuth, getCommunityByPage);
router.get('/getCommunityByAdmin', checkAuth, getCommunityByAdmin);
router.get('/getCommunityByMember', checkAuth, getCommunityByMember);
router.get('/deletecommunitybyid', checkAuth, deleteCommunityById);
router.get('/leavecommunity', checkAuth, leaveCommunity);

module.exports = router;
