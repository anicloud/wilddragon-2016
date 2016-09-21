/**
 * Created by zhangdongming on 16-9-6.
 */
var express=require('express');
var data=require('./accountData');
var router = express.Router();
router.get('/all', function (req, res, next) {
    res.send(data().getGroups());
});
router.post('/create',function (req,res,next) {
    res.send(data().createGroup(req.body));
});
router.post('/delete',function (req,res,next) {
    var id=req.body.groupId;
    res.send(data().deleteGroup(id)); 
});
router.put('/invite',function (req,res,next) { //inviteResult
    console.log(req.body);
    res.send(data().inviteResult(req.body));
});
router.put('/quit',function (req,res,next) {
    res.send(data().quitGroup(req.body));
});
module.exports=router;
    