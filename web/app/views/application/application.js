/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.application', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.application', {
        url: '/application',
        views: {
          'header@main': {
            templateUrl: 'views/application/application-navbar.html',
            controller: 'ApplicationCtrl'
          }
        }
      });
  }])

  .controller('ApplicationCtrl', function ($scope) {
    $scope.selectSideNavTab('app');
  });