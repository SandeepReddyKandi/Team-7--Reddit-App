const express = require('express');
const router = express.Router();

const { register, login, profile, getUsers } = require('../controllers/users');

// keep adding end-points here
router.post('/register', register);
router.post('/login', login);
router.post('/profile', profile);
router.get('/getUsers', getUsers);

module.exports = router;