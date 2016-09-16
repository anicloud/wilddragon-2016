/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.notification', [])
  .factory('NotificationServiceDist', function ($http, $websocket,DeviceService,AccountService) {
      window.Notification.requestPermission();
    return {
      getAllNotifications: $http({
        method: 'GET',
        url: '/notification/all'
      }),
      getWebSocket: $http({
        method: 'GET',
        url: '/notification/websocket'
      }),
      // connect: $websocket.$new({
      //   url: 'ws://localhost:8000/notification/websocket',
      //   reconnect: true
      // })
      connect:function (msgFn) {
        var messageStream=$websocket('ws://localhost:9000/notification/websocket');
          messageStream.msgFn=msgFn;
        messageStream.onMessage(function (wsEvent) {
           var message=JSON.parse(wsEvent.data);
            message.data.type=message.type;
            this.msgFn(message.data);
        })
      },
        popNotification:function (title,body) {
            var notification=new Notification(title,{
                body:body,
                icon:"/images/notifications.png"
            });
            notification.onshow=function (event) {
                var _this=this;
                window.setTimeout(function () {
                    _this.close();
                },2000)
            }
        }
    };
  })
  .factory('NotificationService', function ($http, $websocket) {
      var notifications = [
          {
              type:"ACCOUNT_GROUP_INVITE",
              groupId: '2000',
              groupName: '家庭',
              owner:'10101',
              fromId: '10101',
              fromName: 'anicloud'
          },
          {
              type:"ACCOUNT_GROUP_JOIN",
              groupId: '2001',
              groupName: '公司',
              owner:'10102',
              fromId: '10102',
              fromName: 'libiya'
          }
      ];
    var notification0 = {

    };
    return {
      getAllNotifications: function () {
        //console.log(NotificationServiceDist.connect());
        return new RetData(true, '', notifications);
      },
        addNotifications:function (list,message) {
            list.push(message);
        },
        deleteNotification:function (list,message) {
            var index=Array.prototype.indexOf(list,message);
            list.splice(index,1);
        }
    };
  });
