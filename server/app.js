var express = require('express');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/config.js')[env];
var app = express();



//require('./config/mongoose.js')(app, config);

require('./config/express.js')(app);

require('./config/routes.js')(app);

require('./config/errors.js')(app);

module.exports = app;
