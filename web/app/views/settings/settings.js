/**
 * Created by libiya on 16/1/18.
 */
'use strict';

angular.module('app.view.settings', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.settings', {
        url: '/settings',
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  }])

  .controller('SettingsCtrl', function ($scope) {
    $scope.selectSideNavTab('settings');
  });