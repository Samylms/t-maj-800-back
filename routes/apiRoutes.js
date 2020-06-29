'use strict';

module.exports = function(app) {

const passportJWT = require('../auth/jwtAuth');
const userController = require('../controllers/userController');


    app.route('/users').get(passportJWT.authenticate('jwt', { session: false }), userController.users);
    app.route('/users/login').post(userController.users_login);
    app.route('/users/logout').get(passportJWT.authenticate('jwt', { session: false }), function (req, res) {
        req.logout();
        res.json({ success: true });
    });

    app.route('/users/signup').post(userController.users_create);
    app.route('/users/:id_user').get(passportJWT.authenticate('jwt',{session:false}), userController.user);
    app.route('/users/edit').patch(passportJWT.authenticate('jwt',{session:false}), userController.users_update);
    app.route('/users/:id_user').delete(passportJWT.authenticate('jwt',{session:false}), userController.users_delete);


}