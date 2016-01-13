/**
 * Created by huangbin on 1/1/16.
 */
'use strict';

angular.module('app.directive.screenMatch', [])
  .directive('ngScreen', function ($window) {
    return {
      restrict: 'A',
      scope: {
        onScreenXs: '&',
        onScreenSm: '&',
        onScreenMd: '&',
        onScreenLg: '&'
      },
      link: function (scope, element, attrs) {
        var clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 768) {
          scope.onScreenXs();
        } else if (clientWidth <= 992) {
          scope.onScreenSm();
        } else if (clientWidth <= 1200) {
          scope.onScreenMd();
        } else {
          scope.onScreenLg();
        }

        console.log('screen size ', clientWidth);
        $window.onresize = function (event) {
          var clientWidth = document.documentElement.clientWidth;

          console.log('screen size ', clientWidth);
          if (clientWidth <= 768) {
            scope.onScreenXs();
          } else if (clientWidth <= 992) {
            scope.onScreenSm();
          } else if (clientWidth <= 1200) {
            scope.onScreenMd();
          } else {
            scope.onScreenLg();
          }
        };
      }
    };
  });
