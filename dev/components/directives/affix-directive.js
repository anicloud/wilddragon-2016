/**
 * Created by huangbin on 12/30/15.
 */
'use strict';

angular.module('app.directive.affix', [])
  .directive('ngAffix', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).affix({
          offset: {
            top: attrs.offsetTop || 10
          }
        });
      }
    };
  });
