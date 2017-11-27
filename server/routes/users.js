var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');
var jwtUtil = require('../utilities/jwt.js');
var express = require('express');

var router = express.Router();
var passport = require('passport');
var Role = require('mongoose').model('Role')

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];
var UserFunctions = require('../utilities/UserFunctions.js');

router.post('/update', function (req, res)
                    {
    //TODO: Validate user form JWT and make sure they are changing only themselves unless they are admin

    User.findById(req.body._id,
          function (err, thisUser)
          {

              thisUser.lastName = req.body.lastName;
              thisUser.firstName = req.body.firstName;
              if (req.body.password != null)
              {
                  thisUser.password = encrypt.hashPwd(thisUser.salt, req.body.password);
              }

              thisUser.email = req.body.email;
              thisUser.profileImage = req.body.profileImage;
              thisUser.save(function (err, user, numberAffected) {
                  if (err) res.body = 'Error';
                  else res.body = 'Saved';
                  jwtUtil.SetTokenAndSend(thisUser, res);
              });

          }
      );
});

router.post('/create', passport.authenticate('local-register'),
function (req, res) {

    UserFunctions.CreateNewUser(req.body.username, req.body.email, req.body.password, req.body.lastName, req.body.firstName,[],
        function (user) {
            if (user !== undefined) {
                jwtUtil.SetTokenAndSend(user, res);
            }

        }
    );

});

router.post('/login', passport.authenticate('local-login'),
    function (req, res) {
        if (config.Auth == 'NTLM')
        {
            var thisuser = req.ntlm.DomainName + '\\' + req.ntlm.UserName;
            thisuser = thisuser.toLowerCase();
            User.findOne({username: thisuser}, function (err, obj) {
                var user = obj._doc;
                if (user != null) {
                    var u = {
                      ID: user.ID,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      isAutheticated: user.authenticated

                    };

                    jwtUtil.SetTokenAndSend(u, res);
                }
            });
        }else {
            jwtUtil.SetTokenAndSend(req.user, res);
        }

    });

router.post('/get',
    function (req, res) {
        if (config.Auth == 'NTLM') {
            var thisuser = req.ntlm.DomainName + '\\' + req.ntlm.UserName;
            thisuser = thisuser.toLowerCase();
            User.findOne({username: thisuser}, function (err, obj) {
                var user = obj._doc;
                if (user != null) {
                    user.password = null;
                    user.salt = null;
                    user.authenticated = true;
                    user.auth = config.Auth;
                    res.status(200).send(user);// jwtUtil.SetToken(user));
                }
            });
        }else {
            if (req.header('Authorization') !== undefined) {
                var token = req.header('Authorization').replace('Bearer ', '');
                jwtUtil.GetPayloadFromToken(token, res);
            }

        }

    });

router.get('/list',
    function (req, res) {
        User.find({},
            function (err, Users) {

                res.send(Users);
            });

    }
);

module.exports = router;
