const express = require('express');
const router = express.Router();
const { auth, checkAuth } = require('../utils/passport');
auth();

const {
  register,
  login,
  profile,
  autoLogin,
  getUsers,
  getUsersByName,
} = require('../controllers/users');

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.get('/getUsersByName', checkAuth, getUsersByName);
router.get('/autoLogin', checkAuth, autoLogin);
router.post('/profile', checkAuth, profile);
router.get('/getUsers', checkAuth, getUsers);

module.exports = router;
