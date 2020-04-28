const mongoose = require('mongoose');

const SMSSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, //mongoose.Schema.Types.ObjectId
    city: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date:{type: Date, required: true},
    price: {type: String, required: true},
    status: {type: String, required: true},
    color: {type: String, required: true},
    created_on: {type: Date, default: Date.now}
});


module.exports = mongoose.model('SMS', SMSSchema); 