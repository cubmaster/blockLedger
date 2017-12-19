var mongoose = require('mongoose');

module.exports = function() {

  var Block = mongoose.Schema({

    name: String,
    address: String,
    privateKey: String,
    user: String

  });

  mongoose.model('Blocks', Block);

};
