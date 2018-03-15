/**
 * Created by wmcclellan on 7/10/2015.
 */

//var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption.js');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];


var _NewUser;
_NewUser = function (UserName, email, pwd, lastName, firstName, Roles, cb) {

    Roles = Roles || [];

    var salty = encrypt.createSalt();

    var newUser = new User({
        email: email,
        password: encrypt.hashPwd(salty, pwd),
        username: UserName.toLowerCase(),
        salt: salty,
        lastName: lastName,
        firstName: firstName,
        roles: Roles
    });
    newUser.save(function (err) {
        if (err != null) {
            console.log(err.message);
        }
        cb(newUser);
    });

};


module.exports =  {
    CreateNewUser: _NewUser
};
