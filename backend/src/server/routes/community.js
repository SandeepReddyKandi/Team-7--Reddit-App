const express = require('express');
const router = express.Router();


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
} = require('../controllers/community');

// keep adding end-points here
router.post('/invite', sendInvite);
router.post('/rate', rateCommunity);
router.post('/add', addCommunity);
router.get('/communities', getCommunity);
router.get('/communities', getCommunityById);
router.post('/status', getStatus);
router.get('/gettr', getRulesTopics)
router.get('/getCommunityByName', getCommunityByName);
router.get('/getCommunityByAdmin', getCommunityByAdmin);
router.get('/getCommunityByMember', getCommunityByMember);
router.get('/deletecommunitybyid', deleteCommunityById);


module.exports = router;
