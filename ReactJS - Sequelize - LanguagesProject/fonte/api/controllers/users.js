const Users = require('../models').Users;
const Groups = require('../models').Groups;
const UsersGroups = require('../models').UsersGroups;

exports.getUsers = (req, res, next) => {
	Users.findAll()
		.then(usersResult => {
			const response = {
				count: usersResult.length,
				users: usersResult
			};
			if(usersResult.length > 0){
				res.status(200).json(response);
			} else {
				res.status(404).json({message: 'No users found'})
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		});
}

exports.getUser = (req, res, next) => {
	const id = req.params.userId;
	Users.findById(id)
		.then(user => {
			console.log('From Database ' + user);
			if(user){
				res.status(200).json(user);
			}else{
				res.status(404).json({message: 'No valid entry found for the given parameters'})
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
}

exports.deleteUser = (req, res, next) => {
	Users.destroy({ where: {id: req.params.userId} })
	.then(result => {
		if(result === 1){
			res.status(200).json({message: 'User deleted'})
		}
		else{
			res.status(500).json({message: 'User not deleted due to paranormal activities'})
		}
		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

}

exports.updateUser = (req, res, next) => {
	Users.update(
		{
			Name: req.body.name,
			Email: req.body.email,
			BirthDate: req.body.birthDate
		},
		{
			where: {id: req.params.userId},
			returning: true,
  			plain: true
		}
		)
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err})
		});
}

exports.joinGroup = (req, res, next) => {
	const userId = req.params.userId;
	const groupId = req.params.groupId;
	const entry = {
		UserId: userId,
		GroupId: groupId
	}
	UsersGroups.create(entry)
		.then(result => {
			console.log(result);
			res.status(201).json({message: 'Welcome to your new group'})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
}

exports.exitGroup = (req, res, next) => {
	const userId = req.params.userId;
	const groupId = req.params.groupId;
	const entry = {
		UserId: userId,
		GroupId: groupId
	}
	UsersGroups.destroy({ where: {UserId: userId, GroupId: groupId} })
	.then(result => {
		if(result === 1){
			res.status(200).json({message: 'You exited the group'})
		}
		else{
			res.status(500).json({message: 'You did not exit the group due to many possible reasons. Going to stay here forever'})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});

}

exports.groupsOfUser = (req, res, next) => {
	UsersGroups.findAll({ where: {UserId: req.params.userId} })
		.then(groups => {
			const response = {
				count: groups.length,
				groups: groups
			};
				res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
}