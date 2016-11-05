/**
 * Created by zhangdongming on 16-11-5.
 */
var express=require('express');
var data=require('./accountData');
var router = express.Router();
var url=require('url');
router.post('/', function (req, res, next) {
    console.log(req.body);
    res.send("true");
});
router.get('/checkState',function (req,res,next) {
    console.log('getState');
    res.send(false);
});
router.get('/getLt',function (req,res,next) {
    console.log('getLt');
    res.send({
        lt:'this is a lt',
        execution:'this is a execution'
    });
});
module.exports=router;