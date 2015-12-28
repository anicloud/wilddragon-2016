/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.main', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        url: '',
        templateUrl: 'views/main/main.html'
      });
  }])

  .controller('Main1Ctrl', function () {

  });
