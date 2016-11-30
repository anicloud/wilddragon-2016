/**
 * Created by zhangdongming on 16-9-17.
 */
'use strict';

angular.module('app.service.webSocket', [])
    .factory('WebSocketServiceDist', function ($http, $websocket,DeviceService,AccountService,NotificationServiceDist) {
        return {
            connect:function (mainScope) {
                var messageStream = new WebSocket("ws://localhost:9000/notification/websocket");
                messageStream.onmessage = function(event) {
                    var response=JSON.parse(event.data);
                    if(response.success&&(response!==null)){
                        console.log(response);
                        if(response.data.type.indexOf('DEVICE_SLAVE_BIND')>-1||response.data.type.indexOf('DEVICE_SLAVE_BIND_RESULT')>-1) NotificationServiceDist.slaveManagement(response.data,mainScope);
                            else NotificationServiceDist.parseMessage(response.data,mainScope);
                    }
                    else {
                        console.error('webSocket content error');
                    }
                };
                messageStream.onopen = function(event) {
                    console.log("Web Socket opened!");
                };
                messageStream.onclose = function(event) {
                    console.log("Web Socket closed.");
                };

                // var messageStream=$websocket('ws://192.168.0.102:3000/');
                // console.log('messageSteam',messageStream);
                // messageStream.onMessage(function (wsEvent) {
                //     var response=JSON.parse(wsEvent.data);
                //     if(response.success&&(response!==null))
                //         NotificationServiceDist.parseMessage(response.data,mainScope);
                //     else {
                //         console.error('webSocket content error');
                //     }
                // })
            }
        };
    });