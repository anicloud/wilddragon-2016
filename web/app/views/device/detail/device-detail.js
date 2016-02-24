/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.detail', [
  'ui.router',
  'app.view.device.detail.share'
])
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
        templateUrl: 'views/device/detail/info/device-detail-info.html',
        controller: 'DeviceDetailInfoCtrl'
      })

      .state('main.device.detail.slave', {
        url: '/:slaveId',
        templateUrl: 'views/device/detail/info/device-detail-slave.html',
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
    $scope.mainTabs = {
      info: {
        active: true
      },
      share: {
        active: false
      }
    };
  })

  .controller('DeviceDetailInfoCtrl', function ($rootScope, $scope) {
    $scope.detais = {
      info: {
        name: ['名称', '状态', '描述', 'ID', '出厂序列号', 'MAC地址']
      },
      function: {
        name: []
      },
      slave: {
        name: []
      }
    }
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
  });
