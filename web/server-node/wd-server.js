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
    , port = 3000;
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

var socketData=require('./socketData');
// var websocket=require('./websocket');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dev')));
app.use('/',routes);
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
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().groupInvite()));
    },10000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().groupJoin()));
    },15000);
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupKick()));
    // },20000);
    ws.send('something');
    // setTimeout(function () {
    //     ws.send(JSON.stringify(socketData().groupRemove()));
    // },25000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().deviceShare()));
    },20000);
    setTimeout(function () {
        ws.send(JSON.stringify(socketData().deviceUnShare()));
    },25000);
});
server.on('request', app);
 server.listen(port, function () { console.log('Listening on ' + server.address().port) });
// app.listen(3000);