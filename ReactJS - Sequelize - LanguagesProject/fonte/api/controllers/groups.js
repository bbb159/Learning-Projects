const Groups = require('../models').Groups;
const UsersGroups = require('../models').UsersGroups;

exports.getGroups = (req, res, next) => {
    Groups.findAll()
        .then(groupsResult => {
            if(groupsResult.length > 0){
                const response = {
                    count: groupsResult.length,
                    groups: groupsResult
                };
                res.status(200).json(response);
            }
            res.status(404).json({message: 'No groups found'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}

exports.getGroup = (req, res, next) => {
    const id = req.params.groupId;
    Groups.findById(id)
        .then(group => {
            console.log('From database ' + group);
            if(group){
                res.status(200).json(group);
            } else {
                res.status(404).json({message: 'No valid group for this entry'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
}

exports.newGroup = (req, res, next) => {
    Groups.findOne({ where: {Name: req.body.name} })
        .then(group => {
            if(group){
                return res.status(409).json({
                    message: 'Name already chosen'
                });
            } else {
                const group = {
                    Name: req.body.name,
                    Language: req.body.language,
                    Description: req.body.description
                };
                Groups.create(group)
                    .then(createdGroup => {
                        console.log(createdGroup);
                        res.status(201).json({
                            message: 'Nice, group created. Invite your friends',
                            createdGroup: createdGroup
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
            }
        });
}

exports.deleteGroup = (req, res, next) => {
    const id = req.body.groupId;
    Groups.destroy({ where: {id: req.params.groupId} })
        .then(result => {
            if(result === 1){
                res.status(200).json({message: 'Group deleted'})
            }
            else{
                res.status(500).json({message: 'Group not deleted due to paranormal activities'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.usersOfGroup = (req, res, next) => {
	UsersGroups.findAll({ where: {GroupId: req.params.groupId} })
		.then(users => {
			const response = {
				count: users.length,
				users: users
			};
				res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
}