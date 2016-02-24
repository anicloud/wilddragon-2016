/**
 * Created by huangbin on 1/5/16.
 */
'use strict';

angular.module('app.directive.tab', [])
  .directive('tabs', function () {
    return {
      restrict: 'AC',
      scope: {},
      controller: function () {
        this.tabs = [];

        this.selectTab = function (activeTab) {
          angular.forEach(this.tabs, function (tab) {
            if (tab.active) {
              tab.active = false;
            }
          });
          activeTab.active = true;
        };

        this.addTab = function (tab) {
          var self = this;
          this.tabs.push(tab);
          tab.$on('$destroy', function (event) {
            self.removeTab(tab);
          });
        };

        this.removeTab = function (tab) {
          var index = this.tabs.indexOf(tab);
          if (index != -1) {
            this.tabs.splice(index, 1);
          }
        };
      }
    };
  })
  .directive('tab', function ($timeout) {
    return {
      require: '^tabs',
      restrict: 'AC',
      scope: {
        active: '=tabActive'
      },
      link: function (scope, element, attrs, tabsCtrl) {
        element.on('click', function () {
          $timeout(function () {
            tabsCtrl.selectTab(scope);
          }, 0);
        });

        tabsCtrl.addTab(scope);
      }
    };
  });
