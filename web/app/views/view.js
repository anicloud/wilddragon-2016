/**
 * Created by huangbin on 1/5/16.
 */
'use strict';

angular.module('app.view', [
  'app.view.main',
  'app.view.home',
  'app.view.device',
  'app.view.application',
  'app.view.contact',
  'app.view.store',
  'app.view.account'
])

  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    // Defaults to dashboard
    $urlRouterProvider.otherwise('/home');

  }]);