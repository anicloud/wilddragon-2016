/**
 * Created by huangbin on 1/5/16.
 */
'use strict';

angular.module('app.directive.navs', [])
  .directive('navs', function () {
    return {
      restrict: 'AC',
      scope: {},
      controller: function () {
        this.navs = [];

        this.selectNav = function (activeNav) {
          angular.forEach(this.navs, function (nav) {
            if (nav.active) {
              nav.active = false;
            }
          });
          activeNav.active = true;
        };

        this.addNav = function (nav) {
          var self = this;
          this.navs.push(nav);
          nav.$on('$destroy', function (event) {
            self.removeNav(nav);
          });
        };

        this.removeNav = function (nav) {
          var index = this.navs.indexOf(nav);
          if (index != -1) {
            this.navs.splice(index, 1);
          }
        };
      }
    };
  })
  .directive('nav', function ($timeout) {
    return {
      require: '^navs',
      restrict: 'AC',
      scope: {},
      link: function (scope, element, attrs, navsCtrl) {
        scope.active = element.hasClass('active');

        scope.$watch('active', function (value) {
          if (value) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });

        element.on('click', function () {
          $timeout(function () {
            navsCtrl.selectNav(scope);
          }, 0);
        });

        navsCtrl.addNav(scope);
      }
    };
  });
