const express = require('express');
const router = express.Router();

const { register, login, profile, getusers } = require('../controllers/users');

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.get('/logins', getusers);
router.post('/profile', profile);

module.exports = router;
