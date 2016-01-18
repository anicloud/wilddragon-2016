/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.detail', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail', {
        abstract: true,
        url: '/detail/:id',
        views: {
          'body@main': {
            templateUrl: 'views/device/detail/device-detail.html',
            controller: 'DeviceDetailCtrl'
          }
        }
      })

      .state('main.device.detail.info', {
        url: '/info',
        templateUrl: 'views/device/detail/device-detail-info.html',
        controller: 'DeviceDetailInfoCtrl'
      })

      .state('main.device.detail.share', {
        url: '/share',
        templateUrl: 'views/device/detail/device-detail-share.html',
        controller: 'DeviceDetailShareCtrl'
      })

      .state('main.device.detail.slave', {
        url: '/slave/:slaveId',
        templateUrl: 'views/device/detail/device-detail-slave.html',
        controller: 'DeviceDetailSlaveCtrl'
      });
  }])

  .controller('DeviceDetailCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.device = null;
    for (var i = 0; i < $rootScope.devices.length; i++) {
      if ($rootScope.devices[i].deviceId == $stateParams.id) {
        $scope.device = $rootScope.devices[i];
        break;
      }
    }
    if ($scope.device === null) {
      console.warn(typeof $stateParams.id);
      console.warn('cannot find device with id: ' + $stateParams.id);
    }
  })

  .controller('DeviceDetailInfoCtrl', function ($rootScope, $scope) {

  })

  .controller('DeviceDetailSlaveCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.slave = null;
    for (var i = 0; i < $scope.device.slaves.length; i++) {
      var slave = $scope.device.slaves[i];
      if (slave.deviceId == $stateParams.slaveId) {
        $scope.slave = slave;
        break;
      }
    }
    if ($scope.slave === null) {
      console.warn('cannot find slave device with id: ' + $stateParams.slaveId);
    }
  })

  .controller('DeviceDetailShareCtrl', function ($rootScope, $scope) {

  });
