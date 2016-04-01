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
        url: '/device',
        controller: 'DeviceCtrl',
        template: '<ui-view/>'
      });
  }])

  .controller('DeviceCtrl', function ($rootScope, $scope) {
    $scope.selectSideNavTab('device');
    $scope.searchbarCollapse = true;
    $scope.search = function () {
      //  todo: search logic
    };
  });
