const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length > 0){
            return res.status(409).json({
                message: "Mail Exist"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
        
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User Created'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    }).catch(error => {
        return res.status(500).json({
            error: "Can't process request"
        })
    })  
}

exports.user_delete = (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted",
            request: {
                type: "POST",
                url: "locahost:3200/users/",
                body: {
                    user: 'String',
                    password: 'String'
                }
            }
        })    
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.users_get_all = (req, res, next) => {
    User.find()
    .select('email')
    .exec()
    .then(docs => {
        const response = { 
            count: docs.length,
            users: docs.map(doc => {
                return {
                    email: doc.email,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "localhost:3200/users/" + doc._id
                    }
                }
            }) 
        };
        res.status(200).json(response);
    })
    .catch(error =>{
        res.status(500).json({
            error: error
        })
    })
}

exports.user_login = (req, res, next) => {
    //console.log("req.body.email", req);
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(404).json({
                message: 'Auth Failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password)
            .then(result => {
                if(result){
                   const token =  jwt.sign({
                            email: user[0].email,
                            id: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    })
                }else{
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            })
            .catch(error =>{
                return res.status(500).json({
                    error1: error
                })
            })
    })
}