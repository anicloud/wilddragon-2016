'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ngWebSocket',
  'ngCookies',
  'pascalprecht.translate',
  'app.directive',
  'app.service',
  'app.view'
])

  .run(function () {
    FastClick.attach(document.body);
  });
