/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.notification', [])
  .factory('NotificationServiceDist', function ($http, $websocket) {
    return {
      getAllNotifications: $http({
        method: 'GET',
        url: '/notification/all'
      }),
      getWebSocket: $http({
        method: 'GET',
        url: '/notification/websocket'
      }),
      connect: $websocket.$new({
        url: 'ws://localhost:8000/notification/websocket',
        reconnect: true
      })
    };
  })
  .factory('NotificationService', function ($http, $websocket) {
    var notification0 = {

    };
    return {
      getAllNotifications: function () {
        return new RetData(true, '', notification0);
      }
    };
  });
