var mongoose = require('mongoose');

module.exports = function() {

  var Consignment = mongoose.Schema({

    timestamp: Date,
    fromAddress: String,
    Price: Number,
    location:String,
    user: String,
    description: String,
    contractAddress: String
  });

  mongoose.model('Consignment', Consignment);

};
