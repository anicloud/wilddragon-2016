/**
 * Created by huangbin on 1/6/16.
 */
'use strict';

angular.module('app.directive.panel', [])
  .directive('panel', function () {
    return {
      restrict: 'AC',
      scope: {
        panelCollapsed: '='
      },
      controller: function ($scope) {
        $scope.panelCollapsed = true;

        this.body = null;

        this.addBody = function (body) {
          this.body = body;
        };

        this.toggle = function () {
          $scope.panelCollapsed = !$scope.panelCollapsed;
        };
      }
    };
  })

  .directive('panelToggle', function ($timeout) {
    return {
      require: '^panel',
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
  });


