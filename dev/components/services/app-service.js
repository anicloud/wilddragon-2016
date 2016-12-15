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
      logoPath: '/images/ani_sunny_logo.png',
      serviceServerUrl: 'http://sandbox.bj.anicel.cn:8000/sunny/home#/app/dashboard'
    };
    return {
      getApps: function () {
        return new RetData(true, '', [app0]);
      }
    };

  });