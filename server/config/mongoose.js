var mongoose = require('mongoose');
var mods = require('./models.js');
var dataInit = require('./dataInit.js');

module.exports = function (app,config) {
    mongoose.connect(config.db, { useMongoClient: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log(config.db + ' opened');
    });

    mods.initialize();

    dataInit.initialize();



};
