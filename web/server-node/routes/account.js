/**
 * Created by zhangdongming on 16-9-6.
 */
'use strict';
var express=require('express');
var data=require('./accountData');
var router = express.Router();
var url=require('url');
router.get('/', function (req, res, next) {
    res.send(data().getAccount());
});
router.get('/contacts',function (req,res,next) {
   res.send(data().getContacts()); 
});
router.get('/query/:queryString',function (req,res,next) {
    res.send(data().queryContacts(req.params.queryString));
});


module.exports=router;
    