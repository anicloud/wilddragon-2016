/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.application', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.application', {
        url: '/application',
        templateUrl: 'views/application/application.html'
      });
  }])

  .controller('ApplicationCtrl', function () {

  });