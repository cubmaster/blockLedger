/**
 * Created by wmcclellan on 4/2/2015.
 */

var mongoose = require('mongoose');

module.exports = function() {

    var Role = mongoose.Schema({
        Right: {type: String, enum: ['Read.', 'Write', 'Edit', 'Submit']},
        Name: String
    });

    mongoose.model('Role', Role);

};
