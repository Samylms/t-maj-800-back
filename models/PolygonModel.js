'use strict';
let mongoose = require('mongoose');

let polygonSchema = mongoose.Schema({
  geometry: { 
  
    coordinates: {
      type: [],
      required: true
    }
  },
  city:String
});

module.exports = mongoose.model('Polygon', polygonSchema);