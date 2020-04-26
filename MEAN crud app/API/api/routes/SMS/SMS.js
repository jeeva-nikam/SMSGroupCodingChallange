
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const SMS = require('../../models/SMS')
const data = require('./data.json')
const checkAuth = require('../../../api/middleware/check-auth')

//Seeding database from data.json
router.get('/seedDataBase', (req, res, next) => {
    SMS.insertMany(data)
    .then(result => {
        return res.status(200).json({
            message: "bulk data inserted successfully"
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

//Get all records
router.get('/', (req, res, next) => {
    SMS.find()
    .exec()
    .then(docs => {
        const response = { 
            count: docs.length,
            SMSGroupData: docs.map(doc => {
                return {
                    city: doc.city,
                    start_date: doc.start_date,
                    end_date: doc.end_date,
                    price: doc.price,
                    status: doc.status,
                    color: doc.color,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "localhost:3200/SMS/" + doc._id
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
})

//Save record 
router.post('/', checkAuth, (req, res, next) => {
    const sms = new SMS({
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        start_date: req.body.start_date,
        end_date:req.body.end_date,
        price: req.body.price,
        status: req.body.status,
        color: req.body.color
    });

    sms.save()
    .then(result => {
        res.status(201).json({
            message: 'Record saved successfully',
            savedClient: {
                city: result.city,
                start_date: result.start_date,
                end_date: result.end_date,
                price: result.price,
                status: result.status,
                color: result.color,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "locahost:3200/SMS/" + result._id
                }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    SMS.findById(id)
    .select('city start_date end_date price status color')
    .exec()
    .then(doc => {
       
        if(doc){
            res.status(200).json({
                SMSGroupRecord: doc,
                request: {
                    type: "GET",
                    description: 'Get all clients',
                    url: "locahost:3200/clients/"
                }
            });
        }else{
            res.status(404).json({message:'No valid entry found'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
})

router.patch('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    SMS.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Record updated',
            request: {
                type: "GET",
                url: "locahost:3200/SMS/" + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    SMS.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Record deleted",
            request: {
                type: "POST",
                url: "locahost:3200/SMS/",
                body: {
                    city: 'String',
                    start_date: 'String',
                    end_date: 'String',
                    price: 'String',
                    status: 'String',
                    color: 'String'
                }
            }
        })    
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router;