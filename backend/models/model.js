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
        default: "Not set"
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone_number: {
        type: String,
        default: ""
    },
    followers: [{
        type: ObjectId,
        ref: "USER"
    }],
    following: [{
        type: ObjectId,
        ref: "USER"    
    }],
    profile_photo: {
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    }

});

mongoose.model('USER', userSchema);