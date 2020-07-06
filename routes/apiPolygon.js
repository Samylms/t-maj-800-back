module.exports = (app) => {
    const polygon_controller = require('../../controllers/polygonController');

    // Create a new polygon
    app.post('/polygon', polygon_controller.create);

    // Retrieve all polygon
    app.get('/polygon', polygon_controller.findAll);

    // Retrieve a single Polygon with polygonId
    app.get('/polygon/:polygonId', polygon_controller.findOne);

    // Update a Polygon with polygonId
    app.put('/polygon/:polygonId', polygon_controller.update);

    // Delete a polygon with polygonId
    app.delete('/polygon/:polygonId', polygon_controller.delete);
}