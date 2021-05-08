const express = require('express');
const router = express.Router();

const { auth, checkAuth } = require( '../utils/passport' )
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
  getRulesTopics,
  getInvitations,
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

router.get('/getInvitations', getInvitations);
router.post('/invite', sendInvite);
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.get('/communities', getCommunity);
router.get('/communities', getCommunityById);
router.post('/status', getStatus);
router.get('/gettr', getRulesTopics);
router.get('/getCommunityByName', getCommunityByName);
router.get('/getCommunityByAdmin', getCommunityByAdmin);
router.get('/getCommunityByMember', getCommunityByMember);
router.get('/deletecommunitybyid', deleteCommunityById);

module.exports = router;
