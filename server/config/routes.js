
var ntlm = require('express-ntlm');
var dbUser = require('mongoose').model('User');
var jwtUtil = require('../utilities/jwt.js');
var UserFunctions = require('../utilities/UserFunctions.js');
var express = require('express');

var cors = require('cors');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];

//Pages
var index = require('../routes/index');
var usersCtrl = require('../routes/users');
var node_modules = require('../routes/nodeModules');

//APIs
var API = require('../routes/API');
var fileUpload = require('../routes/fileUpload');

module.exports = function (app) {

    if (config.Auth === 'NTLM') {
        app.use(ntlm());

        app.all('*', function(request, response,next) {

            var thisuser = request.ntlm.DomainName + '\\' + request.ntlm.UserName;
            thisuser = thisuser.toLowerCase();
            dbUser.findOne({username:thisuser},function(err,obj) {
                if (obj == null) {
                    UserFunctions.CreateNewUser(thisuser,'','NTLM','','',[]);

                }
            });

            next();
        });
    }

    app.options('*', cors()); // include before other routes
    app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });
    app.use('/api/user', usersCtrl);
//    app.use('/api/uploads',fileUpload);
    app.use('/api',API);
   // app.use('/modules', node_modules);
    //app.use('*', index);

}