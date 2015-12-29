'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ngWebSocket',
  'app.service',
  'app.main',
  'app.home',
  'app.contact',
  'app.device',
  'app.application',
  'app.store'
])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    // Defaults to dashboard
    $urlRouterProvider.otherwise('/home');

  }]);
