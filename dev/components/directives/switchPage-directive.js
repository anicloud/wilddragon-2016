/**
 * Created by zhangdongming on 16-7-11.
 */
'use strict';

angular.module('app.directive.switchPage', [])
    .directive('aniSwitchPage', function ($state) {
        return{
            restrict:'AEC',
            scope:{
                switchUrl:'@'
            },
            template:'<div class="navbar-back fa fa-mail-reply" data-ng-click="pageBack()"></div>',
            link:function (scope,element,attr) {
                console.log(scope);
                scope.pageBack=function () {
                    console.log(scope.$parent);
                  scope.$parent.switchState(-1,scope.$parent);
                    
                }
            }
        }
    });