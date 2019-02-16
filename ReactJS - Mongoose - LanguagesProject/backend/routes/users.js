const express = require('express');
const router = express.Router();

//Import middleware to check authorization
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');
const User = require('../models/User');


router.get('/all', UsersController.getAll);
router.get('/:userId', UsersController.getUser);
router.delete('/:userId', checkAuth, UsersController.delete);
router.get('/:userId/groups', UsersController.getUserGroups);

module.exports = router;