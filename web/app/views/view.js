/**
 * Created by huangbin on 1/5/16.
 */
'use strict';

angular.module('app.view', [
  'app.view.main',
  'app.view.account',
  'app.view.application',
  'app.view.device',
  'app.view.store',
  'app.view.settings',
  'app.view.contact',
  'app.view.group'
])

  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    // Defaults to dashboard
    $urlRouterProvider.otherwise('/application');

  }]);