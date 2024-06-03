const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController')
const { limiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', limiter,loginUser);

module.exports = router;