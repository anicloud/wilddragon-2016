/**
 * Created by zhangdongming on 16-9-6.
 */
var express=require('express');
var data=require('./accountData');
var notificationData=require('../socketData');
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
router.post('/invite',function (req,res,next) { //inviteResult
    console.log(req.body);
    res.send(data().inviteResult(req.body));
});
router.post('/quit',function (req,res,next) {
    res.send(data().quitGroup(req.body));
});
router.post('/kick',function (req,res) {
    res.send(data().kickGroup());
});
router.get('/invitation',function(req,res){
    res.send(notificationData().groupInviteNotification());
});
module.exports=router;
    