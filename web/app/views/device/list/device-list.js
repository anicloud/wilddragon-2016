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
        views: {
          'body@main': {
            templateUrl: 'views/device/list/device-list.html',
            controller: 'DeviceListCtrl'
          }
        }
      })

      .state('main.device.list.my', {
        url: '/my',
        templateUrl: 'views/device/list/device-list-my.html',
        controller: 'DeviceListCtrl'
      })

      .state('main.device.list.shared', {
        url: '/shared',
        templateUrl: 'views/device/list/device-list-shared.html',
        controller: 'DeviceListCtrl'
      });
  }])

  .controller('DeviceListCtrl', function ($rootScope, $scope, $state) {
    $scope.listTabs = {
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
  });

