const User = require('../models/User');
const GroupsController = require('./groups');
const ObjectId = require('mongodb').ObjectID;

exports.getAll = (req, res) => {
    User.find()
        .then(users => {
            const response = {
				count: users.length,
				users: users
			};
			if(users.length > 0){
				res.status(200).json(users);
			} else {
				res.status(404).json({message: 'No users found'})
			}
        })
        .catch(err => res.status(500).json({error: err}));
};

exports.getUser = (req, res) => {
	User.find( {_id: req.params.userId} )
		.then(user => {
			if(user){
				res.status(200).json(user);
			}else{
				res.status(404).json({message: 'User not found'});
			}
		})
		.catch(err => res.status(500).json({error: err}));
};

exports.joinGroup = (res, userId, groupId) => {
	User.findOneAndUpdate(
		{ _id: userId },
		{ "$push": { "groups": groupId } })
		.then(() => {
			return res.status(200).json({sucess: true})
		})
		.catch(err => res.status(500).json({error: err}));
}

exports.exitGroup = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.body.userId },
		{ "$pull": { "groups": req.body.groupId } })
		.then(() => {
			return res.status(200).json({sucess: true})
		})
		.catch(err => res.status(500).json({error: err}));
}

exports.delete = (req, res) => {
    User.findById(req.params.userId)
        .then(user => user.remove().then(() => res.status(200).json({message: 'User deleted'})))
        .catch(err => res.status(500).json({error: err}));
};

exports.getUserGroups = (req, res) => {
	User.findById(req.params.userId)
		.select('groups')
		.populate('groups')
		.then(groups => {
			return res.status(200).json(groups);
		})
		.catch(err => res.status(500).json({error: err}));
}