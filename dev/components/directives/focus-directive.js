/**
 * Created by huangbin on 1/3/16.
 */
'use strict';

angular.module('app.directive.focus', [])
  .directive('ngFocus', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(attrs.onFocus, function (value) {
          if (value) {
            $timeout(function() {
              element.focus();
            });
          }
        });
      }
    };
  });
