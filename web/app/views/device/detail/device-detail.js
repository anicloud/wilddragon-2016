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
        abstract: true,
        url: '/info',
        templateUrl: 'views/device/detail/info/device-detail-info.html',
        controller: 'DeviceDetailCtrl'
      })

      .state('main.device.detail.info.basic', {
        url: '/basic',
        templateUrl: 'views/device/detail/info/device-detail-info-basic.html',
        controller: 'DeviceDetailInfoBasicCtrl'
      })

      .state('main.device.detail.info.share', {
        url: '/share',
        templateUrl: 'views/device/detail/info/device-detail-info-share.html',
        controller: 'DeviceDetailInfoShareCtrl'
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


    $scope.infoNavTabs = {
      basic: {
        name: '设备详情',
        active: true
      },
      share: {
        name: '共享管理',
        active: false
      }
    };

    $scope.selectInfoNavTab = function (tabName) {
      $scope.infoNavTabs.basic.active = false;
      $scope.infoNavTabs.share.active = false;
      $scope.infoNavTabs[tabName].active = true;
    }

  })

  .controller('DeviceDetailInfoBasicCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.selectInfoNavTab('basic');
  })

  .controller('DeviceDetailInfoShareCtrl', function ($rootScope, $scope, $stateParams) {
    $scope.selectInfoNavTab('share');
    $scope.getDeviceGroups = function (device) {
      var deviceGroups = [];
      var accountGroups = $rootScope.account.groups;
      for (var i = 0; i < device.accountGroups.length; i++) {
        for (var j = 0; j < accountGroups.length; j++) {
          if (accountGroups[j].groupId == device.accountGroups[i]) {
            deviceGroups.push(accountGroups[j]);
            break;
          }
        }
      }
      return deviceGroups;
    };
    $scope.getGroupAccounts = function (group) {
      var accounts = [];
      for (var i = 0; i < group.accounts.length; i++) {
        for (var j = 0; j < $rootScope.contacts.length; j++) {
          if (group.accounts[i] == $rootScope.contacts[j].accountId) {
            accounts.push($rootScope.contacts[j]);
            break;
          }
        }
      }
      return accounts;
    };
    $scope.deviceGroups = $scope.getDeviceGroups($scope.device);
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
