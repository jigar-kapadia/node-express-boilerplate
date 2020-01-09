const userModel = require('../models/user.model');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSecretKey;

var createUser = (req, res, next) => {
    userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role }, function (err, result) {
        if (err)
            next(err);
        else
            res.json({ status: "success", message: "User added successfully!!!", data: result });

    });
};

var authenticate = (request, response, next) => {
    userModel.findOne({ username: request.body.username }, (err, result) => {
        if (err) {
            next(err);
        }
        else {
            if (bcrpyt.compareSync(request.body.password, result.password)) {
                const token = jwt.sign({ id: result._id }, secretKey, { expiresIn: '10h' });
                response.json({ status: "success", message: "user found!!!", data: { token: token } });
            }
            else{
                response.json({ status : "failed", message: "Incorrect Username/Password"})
            }
        }
    })
}

module.exports = {
    createUser,
    authenticate
}