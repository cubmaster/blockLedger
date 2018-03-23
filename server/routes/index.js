var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/*', function (req, res) {
  console.log(path.join(__dirname, '../../dist/index.html'));
  console.log('jemp');
    res.sendFile(path.join(__dirname, '../../dist/index.html'));

});
module.exports = router;
