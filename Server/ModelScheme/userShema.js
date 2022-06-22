const mongoose = require('mongoose');


// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter your name'],  
      },
    email: {
        type: String,
        required: [true, 'please enter your email'],
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        default: false
    },
    id: {
        type: String
    }
  },{
      timestamps: true
  });


  module.exports =  mongoose.model('USER', UserSchema);