var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.param('obj',function(req,res,next,obj)
{
    req.folder = obj;
    next();
});

router.route('/:obj')
    .post(upload.single('file'),function (req, res)
    {
        console.log(req.file);
        req.file.buffer = req.file.buffer.toString('base64');

        res.json(req.file);

    });

module.exports = router;
