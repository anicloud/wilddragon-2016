/**
 * Created by huangbin on 1/11/16.
 */
'use strict';

angular.module('app.directive.history', [])
  .directive('ngHistoryBack', function ($timeout, $window) {
    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        element.on('click', function () {
          $timeout(function() {
            $window.history.back();
          }, 0);
        });
      }
    };
  });

