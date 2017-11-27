/**
 * Created by wmcclellan on 4/20/2015.
 * Generic Socket call Handler
 */

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];



module.exports = function (socket,io) {
    console.log('client connected');



};
