/**
 * Created by zhangdongming on 16-9-16.
 */
var express=require('express');
var data=require('./appData');
var router = express.Router();
var url=require('url');
router.get('/all', function (req, res, next) {
    res.send(data().getApps());
});
module.exports=router;