"use strict";

angular.module("app.directive.ngTouch", [])
    .directive("ngTouchstart", function () {
        return {
            controller: ["$scope", "$element","$rootScope", function ($scope, $element,$rootScope) {
                $rootScope.eSideBar=$(".sidebar");//jQuery DOM of sidebar
                var height=$(".sidebar").css("height");
                //$(".content-wrapper").css({"height":height-54});
                //$(".content-wrapper").css({"height":height-54});
                $rootScope.eContent=$(".content-wrapper");//jQuery DOM of content
                $element.bind("touchstart", onTouchStart);


                function onTouchStart(event) {
                    //event.preventDefault();
                    var method = $element.attr("ng-touchstart");

                    $scope.$startEvent = event;
                    $scope.ele=$element[0];
                    $scope.$apply(method);
                }

            }]
        }
    })
    .directive("ngTouchmove", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {
                $scope.ele=$element[0];
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    event.preventDefault();
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }
                function onTouchMove(event) {
                    var method = $element.attr("ng-touchmove");
                    $scope.$moveEvent = event;
                    $scope.$apply(method);
                }
                function onTouchEnd(event) {
                    event.preventDefault();
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                }

            }]
        }
    })
    .directive("ngTouchend", function () {
        return {
            controller: ["$scope", "$element", function ($scope,$element) {
                $scope.ele=$element[0];
                $element.bind("touchend", onTouchEnd);
                function onTouchEnd(event) {
                    //event.preventDefault();
                    var method = $element.attr("ng-touchend");
                    $scope.$endEvent = event;
                    $scope.$apply(method);
                }

            }]
        }
    });