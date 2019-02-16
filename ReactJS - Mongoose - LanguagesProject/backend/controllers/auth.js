const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwtKey');
const User = require('../models/User');
const Validator = require('validator');
const isEmpty = require('lodash.isempty');

function validateInputSignUp(data) {
    let errors = {};

    if(Validator.isEmpty(data.email)){
        errors.email = 'Este campo é obrigatório';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email é inválido';
    }
    if(Validator.isEmpty(data.firstName)){
        errors.firstName = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.lastName)){
        errors.lastName = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.userName)){
        errors.userName = 'Este campo é obrigatório';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Este campo é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

function validateInputLogin(data) {
    let errors = {};

    if(Validator.isEmpty(data.email)){
        errors.email = 'Este campo é obrigatório';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email é inválido';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Este campo é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

exports.signUp = (req, res) => {

    const { errors, isValid } = validateInputSignUp(req.body);
    if (!isValid){
        return res.status(400).json({errors});
    }

    User.findOne( {email: req.body.email} )
    .then(result => {
        if(result){
            return res.status(409).json({
                errors: {
                    global: 'Email já cadastrado'
                }
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash
                    });
                    newUser.save()
                            .then(createdUser => res.status(201).json({ success: true }))
                            .catch(err => res.status(500).json({error: err}));
                }
                });
            }
        })
        .catch(err => res.status(500).json({error: err}));
};

exports.logIn = (req, res, next) => {

    const { errors, isValid } = validateInputLogin(req.body);
    if (!isValid){
        return res.status(400).json({errors});
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user){
                return res.status(401).json({
                    errors: {
                        global: 'Login failed.'
                    }
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if(err){
                    return res.status(401).json({
                        errors: {
                            global: 'Login failed.'
                        }
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id,
                            firstName: user.firstName
                        },
                        jwtKey.secret,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Login successfull.',
                        token: token
                    });
                }
                return res.status(401).json({
                    errors: {
                        global: 'Login failed.'
                    }
                });
            });
        })
        .catch(err => res.status(500).json({error: err}))
};
        