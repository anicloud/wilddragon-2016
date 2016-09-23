/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.app', [])
  .factory('AppServiceDist', function ($http) {
    return {
      getApps: function () {
        return $http({
          method: 'GET',
          url: '/app/all'
        }).then(function (response) {
          return response.data;
        });
      }
    };
  })
  .factory('AppService', function ($http) {
    var app0 = {
      serviceName: 'sunny',
      logoPath: 'https://raw.githubusercontent.com/anicloud/anicloud.github.io/master/images/logo/ani_logo.png',
      serviceServerUrl: 'http://s0.drtt.bj.anicel.cn:8080/sunny'
    };
    return {
      getApps: function () {
        return new RetData(true, '', [app0]);
      }
    };

  });