/**
 * Created by wmcclellan on 9/16/2016.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */

router.get('*', function (req, res,next) {
   // res.render(path.join('/../../node_modules',req.url);
   // res.render('./node_modules' + req.url.);
    res.sendFile(path.join(__dirname + '/../../node_modules/' + req.url));


});
module.exports = router;
