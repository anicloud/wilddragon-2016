/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.list', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('main.device.list', {
        url: '/list',
        templateUrl: 'views/device/list/device-list.html',
        controller: 'DeviceListCtrl'
      })
  }])

  .controller('DeviceListCtrl', function ($scope, $state) {

  })
;

