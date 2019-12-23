const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    fname: {
        type: String,
        trim: true,
        required: true,
    },
    lname: {
        type: String,
        trim: true,
        required: true,
    },
    username : {
        type: String,
        trim: true,
        required: true,
    },
    email : {
        type: String,
        trim: true,
        required: true,
    },
    password : {
        type: String,
        trim: true,
        required: true,
    },
    contact: {
        type: Number,
        trim: true,
        required: true
    },
    role : {
        type: String,
        trim: true,
        required: true,
    },
    createdDate :{
        type: Date,
        default : Date.now
    },
    updatedDate : {
        type: Date        
    },
    active : {
        type : Boolean,
        default : false
    },
    emailVerified : {
        type : Boolean,
        default : false
    }
});
module.exports = mongoose.model('Customer', CustomerSchema)