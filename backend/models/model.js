const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone_number: {
        type: String,
    },
    followers: [{
        type: ObjectId,
        ref: "USER"
    }],
    following: [{
        type: ObjectId,
        ref: "USER"    
    }]


});

mongoose.model('USER', userSchema);