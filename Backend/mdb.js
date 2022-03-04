const mongoose = require('mongoose');

const uriString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const connectTOMongo = ()=>{
    mongoose.connect(uriString,(err)=>{
        if(err)
            console.log("Cannot Connect to mongoDB - error : ",err);
        else
            console.log("Connected to mongoDB");
    });
}

module.exports = connectTOMongo;