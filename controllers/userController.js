const utils = require('../lib/utils');
const User = require('../models/userModel');

exports.users = function (req, res, next) {
    User.find({}, function (err, users) {
        let userMap = {};
        users.forEach(function (user) {
            userMap[user._id.toString()] = { id: user._id, firstname: user.firstname, lastname: user.lastname, role: user.role };
        });
        res.status(200).json(userMap);
    })
}

exports.users_create = function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const pseudo = req.body.pseudo;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(401).json({ success: false, msg: "the user already exist!" });
        }else{
            const newUser = new User({
                firstname: firstname,
                lastname: lastname,
                pseudo: pseudo,
                email: email,
                hash: hash,
                salt: salt
            });

            newUser.save().then((user) => {
                const jwt = utils.issueJWT(user);
                res.status(200).json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
            }).catch(err => next(err));
        }

    });
}


exports.users_login = function (req, res, next) {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).json({ success: false, msg: "could not find user or wrong password" });
			return;
        }


        const isvalid = utils.validPassword(req.body.password, user.hash, user.salt);

        if (isvalid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ success: true, id: user._id, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {
            res.status(401).json({ success: false, msg: "could not find user or wrong password" });
        }
    });
}

exports.user = function (req, res) {
    User.findById(req.params.id_user).then((user) => {
        if (user) {
            res.status(200).json({ user_id: user._id, login: user.pseudo, email: user.email, name: user.name, firstname: user.firstname })
        } else {
            res.status(404).json({ message: "this user doesn't exist" });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

exports.users_update = function (req, res) {
    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    User.findByIdAndUpdate(req.body.user_id, {
        pseudo: pseudo,
        email: email,
        firstname: firstname,
        lastname: lastname,
        hash: hash,
        salt: salt
    }, function (err, user) {
        if (err) {
            res.status(404).send(err)
        } else {
            res.status(200).json({ success: true, user: user._id });
        }
    });
}

exports.users_delete = function (req, res) {
    User.findByIdAndDelete(req.params.user_id, function (err, result) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).json({ message: "the user has been deleted" })
        }
    })
}