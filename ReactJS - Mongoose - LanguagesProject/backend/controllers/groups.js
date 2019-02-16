const Group = require('../models/Group');
const User = require('../models/User');
const Validator = require('validator');
const isEmpty = require('lodash.isempty');
const UsersController = require('./users');

function validateInputNewGroup(data) {
    let errors = {};

    if(Validator.isEmpty(data.name)){
        errors.name = 'Este campo é obrigatório';
    }
    if(Validator.isEmpty(data.language)){
        errors.language = 'Este campo é obrigatório';
    }
    if(Validator.isEmpty(data.description)){
        errors.description = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.location)){
        errors.location = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.level)){
        errors.level = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.maxUsersAmount)){
        errors.maxUsersAmount = 'Este campo é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

exports.getAllGroups = (req, res) => {
    Group.find()
        .then(groups => {
			res.status(200).json(groups);
        })
        .catch(err => res.status(500).json({error: err}));
};

exports.getGroup = (req, res) => {
    Group.findOne( {_id: req.params.id} )
        .then(group => {
            if (group) {
                res.status(200).json(group);
            } else {
                return res.status(409).json({
                    errors: {
                        global: 'Grupo não encontrado.'
                    }
                }); 
            }
        })
        .catch(err => res.status(500).json({error: err}));
};

exports.addUserToGroup = (req, res) => {
    Group.findOne({ _id: req.body.groupId, members: req.body.userId })
        .then(result => {
            if(result) {
                return res.status(409).json({errors: {global: 'Grupo não existe ou usuário já pertence a esse grupo'}});
            }
        })
        .catch(err => res.status(500).json({error: err}));
    
    Group.findOneAndUpdate(
        { _id: req.body.groupId },
        { "$push": { "members": req.body.userId }})
        .then(() => { UsersController.joinGroup(res, req.body.userId, req.body.groupId) })
        .catch(err => res.status(500).json({error: err}));   
}

exports.removeUserFromGroup = (req, res) => {
    Group.findOne({ _id: req.body.groupId, members: req.body.userId })
        .then(result => {
            if(!result) {
                return res.status(409).json({errors: {global: 'Grupo não existe ou usuário não pertence a esse grupo'}});
            }
        })
        .catch(err => res.status(500).json({error: err}));
    
    Group.findOneAndUpdate(
        { _id: req.body.groupId },
        { "$pull": { "members": req.body.userId }})
        .then(() => { UsersController.exitGroup(req, res) })
        .catch(err => res.status(500).json({error: err}));
}

exports.deleteGroup = (req, res) => {
    //FUNCIONA TAMBÉM
    // Group.findOneAndRemove({ _id: req.body.groupId }, function(err, post) {
    //     post.remove().then(result => {
    //                 return res.status(200).json(result);
    //             })
    //             .catch(err => res.status(500).json({error: err}));
    // });
    Group.findOneAndRemove({ _id: req.body.groupId })
        .then(post => {
            post.remove()
                .then(result => {
                    return res.status(200).json(result);
                })
        })
        .catch(err => res.status(500).json({error: err}));
}

exports.createNewGroup = (req, res) => {
    const { errors, isValid } = validateInputNewGroup(req.body);
    if (!isValid){
        return res.status(400).json({errors});
    }

    Group.findOne( {name: req.body.name} )
    .then(result => {
        if(result){
            return res.status(409).json({
                errors: {
                    global: 'Já existe um grupo com esse nome. Hora de usar a criatividade e escolher um nome único!'
                }
            });
        } else {
            const newGroup = new Group({
                name: req.body.name,
                language: req.body.language,
                description: req.body.description,
                location: req.body.location,
                level: req.body.level,
                maxUsersAmount: req.body.maxUsersAmount,
                owner: req.body.owner
            });
            newGroup.members.push(req.body.owner);
            newGroup.save()
                    .then((groupCreated) => {
                        UsersController.joinGroup(res, req.body.owner, groupCreated._id)
                    })
                    .catch(err => res.status(500).json({error: err}));    
        }
        });
}

exports.findGroupsByIdList = (idList) => {
    Group.find({
        _id: { $in: {...idList} }
    }).then(result => {
        return result;
    }).catch(err => {return err});
}

exports.getUsersFromGroup = (req, res) => {
    Group.findById(req.params.groupId)
        .select('members')
        .populate('members')
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(err => res.status(500).json({error: err}));
}

exports.belongsToGroup = (req, res) => {
    Group.findOne({ _id: req.params.groupId ,members : req.params.userId })
        .then(result => {
            if (result) {
                return res.status(200).json('true');
            }else {
                return res.status(200).json('false');
            }
        })
        .catch(err => res.status(500).json({error: err}));
}

exports.addComment = (req, res) => {
    Group.findOne(
        { 
            _id: req.params.groupId,
            'comments.authorId': { $in: req.body.authorId } 
        }
    )
        .then(exists => {
            if (exists) {
                res.status(409).json({
                    errors: {
                        global: 'Você já comentou nesse grupo. Se deseja alterar seu comentário, por favor apague o anterior!'
                    }
                });
            }else {
                const comment = {
                    authorId: req.body.authorId,
                    authorName: req.body.authorName,
                    commentBody: req.body.commentBody
                }
                Group.findByIdAndUpdate(
                    req.params.groupId,
                    { $addToSet: { comments: comment } }
                )
                    .then(() => res.status(200).json('success'))
                    .catch(err => res.status(500).json({error: err}));
            }
        }).catch(err => res.status(500).json({error: err}));
    
}

exports.deleteComment = (req, res) => {
    Group.findByIdAndUpdate(
        req.params.groupId,
        { $pull: { comments: { _id: req.body.commentId}}}
    )
        .then(() => res.status(200).json('success'))
        .catch(err => res.status(500).json({error: err}));
}