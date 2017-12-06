var User = require('mongoose').model('User'),
    express = require('express');
var Mongoose = require('mongoose');
var jwt = require('../utilities/jwt');
var router = express.Router();

var obj;


router.param('obj',function(req,res,next,obj)
{
    req.Schema = Mongoose.model(obj);
    next();
});

router.param('id',function(req,res,next,id)
{
    if(id =='save' || id=='list' || id=='create' || id=='delete')
    {

        next();
    }else{

        req.Schema.findById(id, function (err, obj) {
        if(err==null)
            req.Object = obj;
            next();
        });

    }

});


router.route('/:obj/create')
    .post(function (req, res) {
        var obj = new req.Schema(req.body);

        obj.save(function (err, data) {
            if (err) return res.send(500, {error: err});
            res.json(data);
        });
});

//.route('/:obj/:id/delete')
//    .post(function (req, res) {
//        req.Schema.remove({_id: req.Object._id},function(err){
//            if (err) return res.send(500, {error: err});
//        });
//
//    });

//if Object schema has a roles property then it's a secure object and user must have role in correct
//context to access it
router.route('/:obj/list')
    .post(function (req, res) {

        var fil = {};
        if(req.body.filter!=undefined)
            fil = req.body.filter;
        req.Object = new req.Schema();




        if (req.Object!= undefined && req.Object._doc.hasOwnProperty("Roles")) {
            var user = jwt.CurrentUser(req);
            var userRoleID = [];
            for(var i=0;i<user.roles.length;i++)
            {
                if(user.roles[i].Right == req.body.filter.mode)
                    userRoleID.push(user.roles[i]._id);
            }


            fil.Roles = {$in: userRoleID };
            req.Schema.find(fil,
                function (err, List) {
                    if (err) return res.send(500, { error: err });

                    res.json(List);
                });
        }else{

            req.Schema.find(fil.where,
                function (err, List) {
                    if (err)
                        return res.send(500, { error: err });
                    res.json(List);
                });
        }



    })
    .get (function (req,res){

      req.Schema.find({},
        function (err, List) {
          if (err)
            return res.send(500, { error: err });
          res.json(List);
        });
    });

router.route('/:obj/save')
    .post(function (req, res) {

        var query = {'_id':req.body._id};
        delete req.body._id;
        delete req.body.__v;
        req.Schema.findOneAndUpdate(query, req.body, {upsert:true}, function(err, obj){
            if (err) return res.send(500, { error: err });
            return res.status(200).send(obj);
        });

    });

router.route('/:obj/delete')
    .post(function (req, res) {

        req.Schema.findByIdAndRemove(req.Object.id,null,function(err){
            if (err) return res.send(500, { error: err });
            return res.status(200);
        });

    });

router.route('/:obj/:id')
    .get(function (req, res) {
       return res.json(req.Object);
    })
    .delete(function(req,res){
      req.Schema.remove({_id: req.Object._id},function(err){
        if (err) return res.send(500, {error: err});
      });
    });
module.exports = router;
