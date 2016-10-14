/**
 * Created by zhangdongming on 16-9-6.
 */
var express=require('express');
var data=require('./deviceData');
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
module.exports=router;