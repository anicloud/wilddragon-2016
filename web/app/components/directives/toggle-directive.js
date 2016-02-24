/**
 * Created by huangbin on 1/28/16.
 */
'use strict';

angular.module('app.directive.toggle', [])
  .directive('ngToggle', function($timeout) {
    return {
      restrict: 'AC',
      scope: {
        collapsed: '='
      },
      link: function (scope, element, attrs) {
        element.on('click', function() {
          $timeout(function () {
            scope.collapsed = !scope.collapsed;
          }, 0);
        });
      }
    };
  });
