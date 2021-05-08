const express = require('express');
const router = express.Router();

const { register, login, profile, getUsersByName } = require('../controllers/users');

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.post('/profile', profile);
router.get('/getUsersByName', getUsersByName);

module.exports = router;
