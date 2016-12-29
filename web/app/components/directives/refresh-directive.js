/**
 * Created by zhangdongming on 2016/12/29.
 */
angular.module('app.directive.refresh', [])
    .directive('refresh', function ($location, $state, $rootScope) {
        return {
            restrict: 'AEC',
            scope: {
                currentState: '=',
                currentLocation: '='
            },
            template: '<div class="navbar-refresh fa fa-refresh" data-ng-click="refresh()"></div>',
            link: function (scope, element, attr) {
                scope.refresh=function(){
                    window.location.reload();
                }
            }
        }
    });