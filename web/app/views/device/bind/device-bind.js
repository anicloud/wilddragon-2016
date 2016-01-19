/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.bind', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('main.device.bind', {
        url: '/bind',
        views: {
          'header@main': {
            templateUrl: 'views/device/bind/device-bind-navbar.html',
            controller: 'DeviceCtrl'
          },
          'body@main': {
            templateUrl: 'views/device/bind/device-bind.html',
            controller: 'DeviceBindCtrl'
          }
        }
      });
  }])

  .controller('DeviceBindCtrl', function ($rootScope, $scope) {
    $scope.qrcodeStart = false;
    $scope.qrcodeSuccess = function (result) {
      alert(result);
      $scope.qrcodeStart = false;
    };
  });
