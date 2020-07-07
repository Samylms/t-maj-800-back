'use strict';
let mongoose = require('mongoose');

let polygonSchema = mongoose.Schema({
  geometry: { 
    type: {
      type: String,  
      enum: ['Point'],  
      required: true 
    }, 
    coordinates: {
      type: [],
      required: true
    }
  },
  city:String
});

module.exports = mongoose.model('Polygon', polygonSchema);