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
        });
      }
    };
  })
  .factory('AppService', function ($http) {
    var app0 = {
      name: 'sunny',
      description: 'smart home center',
      organization: 'anicloud'
    };
    return {
      getApps: function () {
        return new RetData(true, '', app0);
      }
    };

  });