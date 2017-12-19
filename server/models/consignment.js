var mongoose = require('mongoose');

module.exports = function() {

  var Consignment = mongoose.Schema({

    timestamp: Date,
    fromAddress: String,
    buyerAddress:String,
    price: Number,
    state: String,
    location:String,
    user: String,
    description: String,
    contractAddress: String,
    receipt: Object
  });

  mongoose.model('Consignment', Consignment);

};
