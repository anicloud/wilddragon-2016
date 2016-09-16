/**
 * Created by zhangdongming on 16-7-13.
 */
'use strict';

angular.module('app.directive.sidebarSlide', ['ngTouch'])
    .directive('aniSidebarSlider',function ($state,$swipe,$timeout,$rootScope) {
        return{
            restrict:'AEC',
            //template:'<div class="navbar-back fa fa-mail-reply" data-ng-click="pageBack()"></div>',
            link:function (scope,element,attrs,ctrl) {
                var oSidebar=$(".sidebar"),oContent=element,endLeft,distance;
                var oMask=$('.sidebar-mask');
                scope.sidebar=oSidebar,scope.mask=oMask;
                var startFinger,startSidebar=parseInt(oSidebar.css('left'));
                $swipe.bind(element,{
                    'start':function (coords) {
                        if(!$rootScope.mobileFlag) return;
                        distance=0,endLeft=0,startFinger=null;
                        startSidebar=parseInt(oSidebar.css('left'));
                        startFinger=coords.x;
                        oSidebar.css({"transitionDuration":"0s"});
                        scope.transitionFlag=false;
                    },
                    'move':function (coords) {
                        if(!$rootScope.mobileFlag) return;
                        if(startFinger>$rootScope.deviceWidth/2&&(startSidebar===-300)){return;}
                        scope.sidebarCollapsed=false;
                        scope.$apply(scope.sidebarCollapsed);
                        distance=coords.x-startFinger;
                        endLeft=coords.x-startFinger+startSidebar;
                        endLeft=(endLeft<-300)?(-300):(endLeft>0?0:endLeft);
                        if(distance===0) return;
                        oSidebar.css({'left':endLeft});
                        oMask.css({'opacity':$rootScope.calcuOpacity(endLeft)});
                    },
                    'end':function (coords) {
                        if(!$rootScope.mobileFlag) return;
                        if(distance===0) return;
                        // console.log(scope.sidebarCollapsed);
                        if(startFinger>$rootScope.deviceWidth/2&&(startSidebar===-300)){return;}
                        if(((distance>100)&&(startSidebar===-300))||((distance>-100)&&(distance<0)&&(startSidebar===0))){
                            oSidebar.css({"left":0});
                            oMask.css({'opacity':$rootScope.calcuOpacity(0)});
                            scope.sidebarCollapsed=false;
                            // console.log("opendir");
                        }
                        else if(((distance<-100)&&(startSidebar===0))||((distance<100)&&(distance>0)&&(startSidebar===-300))){
                            oSidebar.css({"transitionDuration":"0.35s"});
                            oSidebar.css({"left":-300});
                            oMask.css({'opacity':$rootScope.calcuOpacity(-300)});
                            scope.sidebarCollapsed=true;
                        }
                        else if(distance>0){oSidebar.css({"left":0}); oMask.css({'opacity':$rootScope.calcuOpacity(0)});scope.sidebarCollapsed=false;}
                        else if(distance<0){oSidebar.css({"left":-300}); oMask.css({'opacity':$rootScope.calcuOpacity(-300)}); scope.sidebarCollapsed=true;}
                        scope.$apply(scope.sidebarCollapsed);
                        oSidebar.css({"transitionDuration":"0.35s"});
                        oMask.css({"transitionDuration":"0.35s"});
                        scope.transitionFlag=true;
                        //clean history
                    },
                    'cancel':function (coords) {
                        //   console.log('cancel',coords)
                    }
                })
            }
        }
    });

