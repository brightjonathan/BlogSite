const mongoose = require('mongoose');


// User Schema
const TourSchema = new mongoose.Schema({
    title: {
        type: String,
      },
    description: {
        type: String,
    },
    name: {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: {
        type: [String]
    },
    imageFile: {
        type: String,
    },
    likes: {
        type: [String],
        default: [],
    }
  },{
      timestamps: true
  });


  module.exports =  mongoose.model('TOUR', TourSchema);

  