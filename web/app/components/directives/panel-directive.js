/**
 * Created by huangbin on 1/6/16.
 */
'use strict';

angular.module('app.directive.panel', [])
  .directive('panel', function () {
    return {
      restrict: 'AC',
      scope: {
        panelCollapsed: '=?'
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
        element.on('click', function (e) {
          if((e.target.className!=="panel-header ng-isolate-scope")&&(e.target.className!=="fa fa-angle-down")&&(e.target.className!=="fa fa-angle-up")) return;
          $timeout(function () {
            ctrl.toggle();
          }, 0);
        });
      }
    };
  });


