/**
 * Created by zhangdongming on 16-8-12.
 */
'use strict';
angular.module('app.directive.stateBack', [])
    .directive('stateBack', function ($location, $state, $rootScope) {
        return {
            restrict: 'AEC',
            scope: {
                currentState: '=',
                currentLocation: '='
            },
            template: '<div class="navbar-back fa fa-mail-reply" data-ng-click="pageBack()" ng-show="showFlag"></div>',
            link: function (scope, element, attr) {
                scope.sayStateShowFlag = function (state) {
                    if (state === 'main.group.list'||state ==='main.device.list') {
                        return false;
                    } else {
                        return true;
                    }
                };
                scope.showFlag = scope.sayStateShowFlag($state.current.name);
                // var stateQueue = {
                //     group: ["main.group.list", "main.group.detail", 'main.group.memberInfo'],
                // };
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        scope.showFlag = scope.sayStateShowFlag(toState.name)
                    });
                scope.pageBack = function () {
                    var state = scope.currentState.current.name;
                    var params = scope.currentState.params;
                    var moduleKey = state.split(".")[1];//application,store,group,device etc
                    // var currentQueue=stateQueue[moduleKey];
                    // var currentPosition=currentQueue.indexOf(state); //state number in queue
                    console.log('state', state);
                    console.log('params', params);
                    if (moduleKey === 'group') {
                        if (params) {
                            var content = params.id;
                        }
                        switch (state) {
                            case 'main.group.detail':
                                $state.go('main.group.list');
                                return;
                            case 'main.group.memberInfo':
                                $state.go('main.group.detail', {id: content.split('&')[0]});
                        }
                    }else if(moduleKey === 'device') {
                        if (params) {
                            content = params.id;
                        }
                        if((['main.device.detail.info','main.device.detail.share']).indexOf(state)>-1) {
                            $state.go('main.device.list');
                            return;
                        }else if((/^main\.device\.detail\.info\.\w+$/).exec(state)){
                            return $state.go('main.device.detail.info',{id:content});
                        }else if(state==='main.device.detail.info.slave'){
                              return $state.go('main.device.detail.info',{id:content});
                        }
                    };
                }
            }
        }
    });