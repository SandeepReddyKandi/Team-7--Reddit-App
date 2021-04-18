const express = require('express');
const router = express.Router();

const { register, login, profile } = require('../controllers/users');

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.post('/profile', profile);

module.exports = router;