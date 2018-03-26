var path = require('path');

var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var passport = require('passport');
var ppconfig = require('./passport');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];



module.exports = function (app)
{


    // view engine setup
    //app.set('templates', path.join(__dirname, '../Templates'));
    //app.set('view engine', 'pug');
    //app.set('view options', {basedir: path.join(__dirname, '../Views')});
    //app.locals.basedir = path.join(__dirname, 'views');

    // uncomment after placing your favicon in /public



    app.use(express.static(path.join(__dirname, '../../dist')));
  //  app.use(express.static(path.join(__dirname, '../../node_modules')));
 //   app.use(cookieParser());

    app.use(logger('dev'));

   // app.use(session({secret: 'multi vision unicorns',resave:false,saveUninitialized:false}));

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    app.use(passport.initialize());
    if(config.Auth !=='NTLM')
    {

        passport.use('local-register', ppconfig.register);
        passport.use('local-login', ppconfig.login);
    }

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

};
