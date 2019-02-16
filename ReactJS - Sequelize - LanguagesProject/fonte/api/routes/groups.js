const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const GroupsController = require('../controllers/groups');

router.get('/all', checkAuth, GroupsController.getGroups);

router.get('/:groupId', checkAuth, GroupsController.getGroup);

router.post('/new', checkAuth, GroupsController.newGroup);

router.delete('/:groupId', checkAuth, GroupsController.deleteGroup);

router.get('/participants/:groupId', checkAuth, GroupsController.usersOfGroup);

module.exports = router;