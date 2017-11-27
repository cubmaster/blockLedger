

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var jwt = require('jwt-simple');
var config = require('../config/config.js')[env];

var setTokenAndSend  = function (user, res) {

    res.status(200).send(setToken(user));
}

var setToken = function(user) {
    'use strict';
    var payload = {
        sub: user
    };

    var token = jwt.encode(payload, config.privateKey);

    return {
        user:  {
            _id: user._id,
            ID: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            auth:user.Auth
        },
        token: token,
        message: 'Success'
    }
};

var getPayloadFromToken = function(token,res)
{
    var user = jwt.decode(token,config.privateKey);
    user.sub.password = null;
    user.sub.salt = null;
    user.sub.authenticated = true;
    res.status(200).send(user.sub);

};

var currentUser = function(req) {
    var token;
    var user;

    token = req.header('Authorization').replace('Bearer ','');
    user =  jwt.decode(token,config.privateKey);

    return user.sub;
};

module.exports = {

    SetTokenAndSend:setTokenAndSend,
    GetPayloadFromToken: getPayloadFromToken,
    CurrentUser: currentUser,
    SetToken:setToken
};

