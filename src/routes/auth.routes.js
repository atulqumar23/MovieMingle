const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // file ka naam tumhare hisaab se

// @desc Register user
// @route POST /api/auth/register
router.post('/register', authController.register);

// @desc Login user
// @route POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
