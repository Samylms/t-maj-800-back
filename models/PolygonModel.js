'use strict';
let mongoose = require('mongoose');

let polygonSchema = mongoose.Schema({
  geometry: { 
    type: {
      type: String,  
      enum: ['Polygon'],  
      required: true 
    }, 
    coordinates: {
      type: [],
      required: true
    }
  },
  type:String
});

module.exports = mongoose.model('Polygon', polygonSchema);