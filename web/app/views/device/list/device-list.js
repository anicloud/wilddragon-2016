/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.list', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('main.device.list', {
        abstract: true,
        url: '/list',
        templateUrl: 'views/device/list/device-list.html',
        controller: 'DeviceListCtrl'
      })

      .state('main.device.list.my', {
        url: '/my',
        templateUrl: 'views/device/list/device-list-my.html',
        controller: 'DeviceListMyCtrl'
      })

      .state('main.device.list.shared', {
        url: '/shared',
        templateUrl: 'views/device/list/device-list-shared.html',
        controller: 'DeviceListSharedCtrl'
      });
  }])

  .controller('DeviceListCtrl', function ($rootScope, $scope, $state) {
    $scope.listNavTabs = {
      my: {
        name: '我的设备',
        href: '#/device/list/my',
        active: true
      },
      shared: {
        name: '共享的设备',
        href: '#/device/list/shared',
        active: false
      }
    };

    $scope.myDevices = [];
    $scope.sharedDevices = [];
    for (var i = 0; i < $rootScope.devices.length; i++) {
      if ($rootScope.devices[i].owner == $rootScope.account.accountId) {
        $scope.myDevices.push($rootScope.devices[i]);
      } else {
        $scope.sharedDevices.push($rootScope.devices[i]);
      }
    }
  })

  .controller('DeviceListMyCtrl', function ($rootScope, $scope) {
    $scope.listNavTabs.my.active = true;
    $scope.listNavTabs.shared.active = false;
  })

  .controller('DeviceListSharedCtrl', function ($rootScope, $scope) {
    $scope.listNavTabs.my.active = false;
    $scope.listNavTabs.shared.active = true;
  });

