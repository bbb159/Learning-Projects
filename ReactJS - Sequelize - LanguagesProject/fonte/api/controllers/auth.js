const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

exports.signUp = (req, res, next) => {
    Users.findOne({ where: {Email: req.body.email} })
        .then(result => {
            if(result){
                return res.status(409).json({
                    message: 'Email already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = {
                            Name: req.body.name,
                            BirthDate: req.body.birthDate,
                            Email: req.body.email,
                            Password: hash
                        };
                        Users.create(user)
                            .then(createdUser => res.status(201).json(createdUser))
                            .catch(err => res.status(500).json({error: err}));
                    }
                });
            }
        });
}

exports.logIn = (req, res, next) => {
    Users.findOne({ where: {Email: req.body.email} })
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'Login failed.'
                });
            }
            bcrypt.compare(req.body.password, user.Password, (err, result) =>{
                if(err){
                    return res.status(401).json({
                        message: 'Login failed.'
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email: user.Email,
                            userId: user.id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Login successfull.',
                        token: token
                    });
                }
                return res.status(200).json({
                    message: 'Login failed.'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}
