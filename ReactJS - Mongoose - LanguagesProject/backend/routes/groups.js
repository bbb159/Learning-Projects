const express = require('express');
const router = express.Router();

//Import middleware to check authorization
const checkAuth = require('../middleware/check-auth');

const GroupsController = require('../controllers/groups');


router.get('/all', GroupsController.getAllGroups);
router.post('/new', GroupsController.createNewGroup);
router.get('/:id', GroupsController.getGroup);
router.post('/join', GroupsController.addUserToGroup);
router.post('/exit', GroupsController.removeUserFromGroup);
router.delete('/delete', GroupsController.deleteGroup);
router.get('/:userId/belongsTo/:groupId', GroupsController.belongsToGroup);
router.get('/:groupId/members', GroupsController.getUsersFromGroup);
router.post('/:groupId/addComment', GroupsController.addComment);
router.delete('/:groupId/deleteComment', GroupsController.deleteComment);

module.exports = router;