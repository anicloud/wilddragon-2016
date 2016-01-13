/**
 * Created by huangbin on 1/6/16.
 */
'use strict';

angular.module('app.directive.expander', [])
  .directive('expander', function () {
    return {
      restrict: 'AC',
      scope: {},
      controller: function () {
        this.body = null;

        this.addBody = function (body) {
          this.body = body;
        };

        this.toggle = function () {
          this.body.collapse = !this.body.collapse;
        };
      }
    };
  })

  .directive('expanderHeader', function ($timeout) {
    return {
      require: '^expander',
      restrict: 'AC',
      scope: {},
      link: function (scope, element, attrs, ctrl) {
        element.on('click', function () {
          $timeout(function () {
            ctrl.toggle();
          }, 0);
        });
      }
    };
  })

  .directive('expanderBody', function () {
    return {
      require: '^expander',
      restrict: 'AC',
      scope: {},
      link: function (scope, element, attrs, ctrl) {
        scope.collapse = element.hasClass('collapse');

        scope.$watch('collapse', function (value) {
          if (scope.collapse) {
            element.addClass('collapse');
          } else {
            element.removeClass('collapse');
          }
        });

        ctrl.addBody(scope);
      }
    };
  });

