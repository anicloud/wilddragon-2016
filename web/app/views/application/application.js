/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.application', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.application', {
        url: '/application',
        templateUrl: 'views/application/application.html',
        controller: 'ApplicationCtrl',
        resolve: {
          apps: function (AppService) {
            return AppService.getApps();
          }
        }
      });
  }])

  .controller('ApplicationCtrl', function ($scope, apps) {
    $scope.selectSideNavTab('app');
    if (apps.success) {
      console.log('Got apps data');
      console.log(apps.data);
      $scope.apps = apps.data;
    } else {
      console.error('Error in getting apps');
    }
  });