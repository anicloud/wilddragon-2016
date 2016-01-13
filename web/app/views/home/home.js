/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.home', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/home',
        views: {
          'header': {
            templateUrl: 'views/home/home-navbar.html',
            controller: 'HomeCtrl'
          },
          'body': {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  }])

  .controller('HomeCtrl', function () {

  });
