/**
 * Created by zhangdongming on 16-9-5.
 */
var express = require('express');
var path=require('path');
//创建一个路由容器
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(path.join(__dirname, '../../../dev/index.html'));
    res.sendFile(path.join(__dirname, '../../../dev/index.html'));
});

module.exports = router;