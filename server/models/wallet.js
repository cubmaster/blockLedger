var mongoose = require('mongoose');

module.exports = function() {

  var Wallet = mongoose.Schema({
    account: String,
    name: String,
    passPhrase: String,
    user: String

  });

  mongoose.model('Wallet', Wallet);

};
