/**
 * Created by zhangdongming on 16-9-3.
 */
'use strict';
var express=require('express');
var mime=require('mime');
var url=require('url');
var path=require('path');
var formidable=require('formidable');
var queryString = require('querystring');
var bodyParser=require('body-parser');
//router
var routes = require('./routes/index');
var account=require('./routes/account');
var group=require('./routes/group');
var device = require('./routes/device');
var application=require('./routes/app');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dev')));
app.use('/',routes);
app.use('/account',account);
app.use('/group',group);
app.use('/device',device);
app.use('/app',application);
app.listen(3000);
