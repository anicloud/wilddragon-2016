/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.device', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device', {
        url: '/device',
        templateUrl: 'views/device/device.html',
        controller: 'DeviceCtrl'
      });
  }])

  .controller('DeviceCtrl', function ($rootScope, $scope) {
  });
