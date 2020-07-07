var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Polygon = require('../models/PolygonModel');


//Create new Polygon
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Polygon content can not be empty"
        });
    }

    // Create a Polygon
    const polygon = new Polygon({
          geometry: {
            
            coordinates:req.body.geometry.coordinates
          },
          city: req.body.city
     });
  
    // Save Polygon in the database
    polygon.save()
    .then(data => {
        res.send(data);
        console.log(polygon)
        console.log("Polygon created");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the Polygon."
        });
    });
};

// Retrieve all Polygon from the database.
exports.findAll = (req, res) => {
    Polygon.find()
    .then(polygon => {
        res.send(polygon);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving Polygon."
        });
    });
};

// Find a single Polygon with a PolygonId
exports.findOne = (req, res) => {
    Polygon.findById(req.params.polygonId)
    .then(polygon => {
        if(!polygon) {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });            
        }
        res.send(polygon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving Polygon with id " + req.params.polygonId
        });
    });
};

// Update a Polygon
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Polygon content can not be empty"
        });
    }

    // Find and update Polygon with the request body
    Polygon.findByIdAndUpdate(req.params.polygonId, {
        coordinates: req.body.coordinates  || "No Polygon coordinates" 

    }, {new: true})
    .then(polygon => {
        if(!polygon) {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });
        }
        res.send(Polygon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.polygonId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Polygon.findByIdAndRemove(req.params.hotelId)
    .then(polygon => {
        if(!polygon) {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });
        }
        res.send({message: "Polygon deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Polygon not found with id " + req.params.polygonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Polygon with id " + req.params.polygonId
        });
    });
};


