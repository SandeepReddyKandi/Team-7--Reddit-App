const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
const AWS = require('aws-sdk');
const multer = require('multer');
auth();

const {
  register,
  login,
  profile,
  autoLogin,
  getUsers,
  getUsersByName,
  getUserById,
} = require('../controllers/users');

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
  const params = {
    Bucket: 'redditapp',
    Key: `${req.file.originalname}`,
    Body: req.file.buffer,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(data);
  });
});

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.get('/getUsersByName', checkAuth, getUsersByName);
router.get('/getUserById', checkAuth, getUserById);
router.get('/autoLogin', checkAuth, autoLogin);
router.post('/profile', checkAuth, profile);
router.get('/getUsers', checkAuth, getUsers);
router.post('/logout', (req, res) => {
  res.clearCookie('authtkn');
  res.json({ message: 'Logged Out' });
});

module.exports = router;
