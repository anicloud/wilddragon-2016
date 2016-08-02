'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ngWebSocket',
  'app.directive',
  'app.service',
  'app.view'
])

  .run(function () {
    FastClick.attach(document.body);
  });
