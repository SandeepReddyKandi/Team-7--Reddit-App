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
  getInvitationsForCommunity,
  getCommunityAnalytics,
  getRulesTopics,
  getInvitations,
  getInvitationsByPage,
  getcommunityinvite,
  acceptcommunityinvite,
  rejectcommunityinvite,
  getCommunityVoteCount,
  leaveCommunity,
  getCommunityNameById,
  approveInvite,
} = require('../controllers/community');

router.post('/approveInvite', checkAuth, approveInvite);
router.get('/getInvitations', checkAuth, getInvitations);
router.post('/getInvitationsByPage', checkAuth, getInvitationsByPage);
router.get('/getInvitationByCommunity', checkAuth, getInvitationsForCommunity);
router.post('/invite', checkAuth, sendInvite);
router.post('/rate', checkAuth, rateCommunity);
router.get('/getVoteCount', checkAuth, getCommunityVoteCount);
router.post('/add', checkAuth, addCommunity);
router.get('/communities', checkAuth, getCommunity);
router.get('/communities/:community_id', checkAuth, getCommunityById);
router.post('/status', checkAuth, getStatus);
router.get('/gettr', checkAuth, getRulesTopics);
router.get('/getCommunityByName', checkAuth, getCommunityByName);
router.post('/getCommunityByPage', checkAuth, getCommunityByPage);
router.get('/getCommunityByAdmin', checkAuth, getCommunityByAdmin);
router.post('/get-community-analytics', checkAuth, getCommunityAnalytics);
router.get('/getCommunityByMember', checkAuth, getCommunityByMember);
router.get('/deletecommunitybyid', checkAuth, deleteCommunityById);
router.get('/getcommunityinvite', checkAuth, getcommunityinvite);
router.post('/acceptcommunityinvite', checkAuth, acceptcommunityinvite);
router.post('/rejectcommunityinvite', checkAuth, rejectcommunityinvite);
router.get('/leavecommunity', checkAuth, leaveCommunity);
router.get('/getCommunityNameById', checkAuth, getCommunityNameById);

module.exports = router;
