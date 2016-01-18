/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.device', [
  'ui.router',
  'app.view.device.list',
  'app.view.device.detail',
  'app.view.device.bind'
])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device', {
        abstract: true,
        url: '/device',
        views: {
          'header@main': {
            templateUrl: 'views/device/device-navbar.html',
            controller: 'DeviceCtrl'
          }
        }
      });
  }])

  .controller('DeviceCtrl', function ($rootScope, $scope) {
    $scope.searchbarCollapse = true;
    $scope.search = function () {
      //  todo: search logic
    };
  });
