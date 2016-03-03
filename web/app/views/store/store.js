/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.store', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.store', {
        url: '/store',
        templateUrl: 'views/store/store.html',
        controller: 'StoreCtrl'
      });
  }])

  .controller('StoreCtrl', function ($scope) {
    $scope.selectSideNavTab('store');
  });
