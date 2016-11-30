/**
 * Created by zhangdongming on 16-9-6.
 */
var express=require('express');
var data=require('./deviceData');
var RetData=require('./ret-data');
var router = express.Router();
router.get('/all', function (req, res, next) {
    res.send(data().getDevices());
});
router.get('/function/:masterId/:slaveId',function (req,res) {
    var masterId=req.param.masterId;
    var slaveId=req.param.slaveId;
    res.send(data().getSlaveFunctions(masterId,slaveId));
});
router.get('/function/:masterId',function (req,res) {
    var masterId=req.param.masterId;
    res.send(data().getMasterFunctions(masterId));
});
router.put('/modify',function (req,res) {
    var device=req.body;
    console.log(device);
    res.send(data().modifyDevice(device));
});
router.post('/bind',function(req,res){
    var device=req.body;
   res.send(data().bindDevice(device)) 
});
router.post('/unbind',function(req,res){
    res.send(data().unbindDevice(req.body));
});
router.post('/share',function (req,res) {
    res.send(data().shareDevice(req.body))
});
router.post('/findslaves',function (req,res) {
    var masterId=req.body.deviceId;
    console.log(masterId);
    res.send(data().getSlaveList(masterId));
});
router.post('/sendBindList',function (req,res) {
    var content=req.body;
    console.log('content',content);
    res.send(new RetData(true,'',true));
});
module.exports=router;