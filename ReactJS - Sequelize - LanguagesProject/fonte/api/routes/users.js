const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

router.get('/all', checkAuth, UsersController.getUsers);

router.get('/:userId', checkAuth, UsersController.getUser);

router.delete('/:userId', checkAuth, UsersController.deleteUser);

router.patch('/:userId', checkAuth, UsersController.updateUser);

router.post('/:userId/join/:groupId', checkAuth, UsersController.joinGroup);

router.post('/:userId/exit/:groupId', checkAuth, UsersController.exitGroup);

router.get('/:userId/yourGroups', checkAuth, UsersController.groupsOfUser);

module.exports = router;