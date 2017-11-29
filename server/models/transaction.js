var mongoose = require('mongoose');

module.exports = function() {

  var Transaction = mongoose.Schema({

    timestamp: Date,
    fromAddress: String,
    toAddress: String,
    value: Number,
    receipt:String,
    user: String

  });

  mongoose.model('Transaction', Transaction);

};
