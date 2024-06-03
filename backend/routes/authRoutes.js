const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/forgot-password', requestPasswordReset);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
