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

  .controller('DeviceListCtrl', function ($rootScope, $scope) {
  });

