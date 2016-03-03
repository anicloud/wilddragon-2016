/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.detail', [
  'ui.router'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail', {
        abstract: true,
        url: '/detail/:id',
        templateUrl: 'views/device/detail/device-detail.html',
        controller: 'DeviceDetailCtrl'
      })

      .state('main.device.detail.info', {
        url: '/info',
        templateUrl: 'views/device/detail/device-detail-info.html',
        controller: 'DeviceDetailCtrl'
      })

      .state('main.device.detail.slave', {
        url: '/:slaveId',
        templateUrl: 'views/device/detail/device-detail-slave.html',
        controller: 'DeviceDetailSlaveCtrl'
      });
  }])

  .controller('DeviceDetailCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.device = null;
    $scope.isOwner = false;
    for (var i = 0; i < $rootScope.devices.length; i++) {
      if ($rootScope.devices[i].deviceId == $stateParams.id) {
        $scope.device = $rootScope.devices[i];
        break;
      }
    }
    if ($scope.device.owner == $rootScope.account.accountId) {
      $scope.isOwner = true;
    }
    if ($scope.device === null) {
      console.warn('cannot find device with id: ' + $stateParams.id);
    }
    $scope.detailNavTabs = {
      info: {
        active: true
      },
      share: {
        active: false
      }
    };

  })

  .controller('DeviceDetailSlaveCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.slave = null;
    if (typeof($stateParams.slaveId) != 'undefined') {
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
    }
  })
;
