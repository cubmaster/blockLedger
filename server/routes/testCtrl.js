
var express = require('express');

var router = express.Router();


router.get('/', function (req, res){

  return res.send("Found ME");
});
module.exports = router;
