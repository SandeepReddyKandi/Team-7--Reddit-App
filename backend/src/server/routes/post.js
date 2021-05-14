const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
const AWS = require('aws-sdk');
const multer = require('multer');
auth();

const {
  addPost,
  getPost,
  getPostByPage,
  updatePostUpvote,
  updatePostDownvote,
  sortPostByUpvote,
  sortPostByDownvote,
  sortPostByDate,
  getPostById,
  addPostText,
  addPostImage,
  addPostLink,
  getPostCommunity,
  getPostByCommunity,
} = require('../controllers/post');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});
const upload = multer({ storage }).single('userprofile');
const s3 = new AWS.S3({
  accessKeyId: 'AKIARGSBJRNBLKLYG7UH',
  secretAccessKey: '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',
});

router.put('/uploadfile', upload, (req, res) => {
  console.log('check file---', req.file);
  const params = {
    Bucket: 'redditapp',
    Key: `${Date.now()}${req.file.originalname}`,
    Body: `${req.file.buffer}`,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(data);
  });
});

// keep adding end-points here
router.post('/add', checkAuth, addPost);
router.get('/', checkAuth, getPost);
router.get('/post', getPostByPage);
router.get('/post/id', getPostById);
router.post('/upvote', updatePostUpvote);
router.post('/upvote/sort', sortPostByUpvote);
router.post('/downvote', updatePostDownvote);
router.post('/downvote/sort', sortPostByDownvote);
router.post('/date/sort', sortPostByDate);

router.post('/link', checkAuth, addPostLink);
router.post('/text', checkAuth, addPostText);
router.post('/image', checkAuth, addPostImage);
router.get('/community', checkAuth, getPostCommunity);
router.get('/post/community', checkAuth, getPostCommunity);

module.exports = router;
