const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

// POST /users/create
// Create user
router.post('/signup', AuthController.signUp);

router.post('/login', AuthController.logIn);

module.exports = router;