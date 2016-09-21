/**
 * Created by zhangdongming on 16-9-16.
 */
// var websocketInit=function () {
//     var WebSocketServer = require('ws').Server;
//     var socketData=require('./socketData');
//     var wss = new WebSocketServer({port: 3000});
//     wss.on('connection', function (ws) {
//         ws.on('message', function(message) {
//             console.log('received: %s', message);
//             ws.send('server hello');
//         });
//         console.log('connection ok');
//         setTimeout(function () {
//             ws.send(JSON.stringify(socketData().groupInvite()));
//         },10000);
//     });
// };
var websocketInit=function (app) {
    var server = require('http').createServer()
        , url = require('url')
        , WebSocketServer = require('ws').Server
        , wss = new WebSocketServer({ server: server })
        // , express = require('express')
        // , app = express()
        ,port = 3000;

    // app.use(function (req, res) {
    //     res.send({ msg: "hello" });
    // });
    wss.on('connection', function connection(ws) {
        var location = url.parse(ws.upgradeReq.url, true);
        // you might use location.query.access_token to authenticate or share sessions
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
        ws.on('message', function incoming(message) {
        });
        console.log('connection ok');
        // setTimeout(function () {
        //      ws.send(JSON.stringify(socketData().groupInvite()));
        //  },10000);
        ws.send('something');
    });
    server.on('request', app);
    server.listen(port, function () { console.log('Listening on ' + server.address().port) });
};

module.exports=websocketInit;
