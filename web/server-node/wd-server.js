/**
 * Created by zhangdongming on 16-9-3.
 */
'use strict';
var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 9000;
var mime=require('mime');
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
var login=require('./routes/login');

var socketData=require('./socketData');
// var websocket=require('./websocket');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.get('/node_modules/eruda/eruda.min.js',function (req,res) {
//     console.log(path.join(__dirname, '../node_modules/eruda/eruda.min.js'));
//     res.sendfile(path.join(__dirname, '../node_modules/eruda/eruda.min.js'))
// });
app.use(express.static(path.join(__dirname, '../../dev')));
app.use('/',routes);
app.use('/login',login);
app.use('/account',account);
app.use('/group',group);
app.use('/device',device);
app.use('/app',application);
wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    ws.on('message', function incoming(message) {
    });
    console.log('connection ok');
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupInvite()));
    // },10000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().groupJoin()));
    },5000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().getSlaveList()))
    },6000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().bindSlaveResult()))
    },15000);
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupKick()));
    // },20000);
    // ws.send('something');
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupRemove()));
    // },25000);
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().deviceShare()));
    // },30000);
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().deviceUnShare()));
    // },25000);
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupQuit()));
    // },5000);
});
server.on('request', app);
 server.listen(port, function () { console.log('Listening on ' + server.address().port) });
// app.listen(3000);
