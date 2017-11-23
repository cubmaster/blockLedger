var mongoose = require('mongoose');

module.exports = function() {

  var Account = mongoose.Schema({

    name: String,
    address: String,
    privateKey: String,
    user: String

  });

  mongoose.model('Account', Account);

};
