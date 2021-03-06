const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const SMSRoutes = require('./api/routes/SMS')
const userRoutes = require('./api/routes/users')

try{
    mongoose.connect('mongodb+srv://jeevan:Passcluster123@clusterfor-gharkakhana-zoisy.mongodb.net/SMSGroupTestDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });
    //+ process.env.MONGO_ATLAS_PW +
}catch{
    console.log("unable to connect to database");
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))  

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); 
    }
    next();
})

app.use('/SMS', SMSRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});
module.exports = app;