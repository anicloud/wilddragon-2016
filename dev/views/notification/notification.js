/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.notification', ['ui.router'])

    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('main.notification', {
                url: '/notification',
                templateUrl: 'views/notification/notification.html',
                controller: 'NotificationCtrl'
            });
    }])

    .controller('NotificationCtrl',function ($scope,NotificationService,AccountServiceDist) {
        $scope.showIndex=1;
        $scope.selectSideNavTab('notification');
       // NotificationService.deleteNotification($scope.notifications,index);
       $scope.deleteMessage=function (message) {
           NotificationService.deleteNotification($scope.notifications,message)
       };
        console.log($scope.notifications);
        $scope.acceptMessage=function (message) {
            console.log(message);
            switch(message.type){
                case 'inviteAccount':
                    (function (message) {
                        var data={};
                        data.groupId=message.groupId;
                        data.accountId=$scope.account.accountId;
                        data.result=true;
                        var jsonData=angular.toJson(data);
                        AccountServiceDist.joinGroup(jsonData);
                    })(message);
                    break;
            }
        };
        $scope.refuseMessage=function (message) {
            console.log(message);
            switch(message.type){
                case 'inviteAccount':
                    (function (message) {
                        var data={};
                        data.groupId=message.groupId;
                        data.accountId=$scope.account.accountId;
                        data.result=false;
                        var jsonData=angular.toJson(data);
                        AccountServiceDist.joinGroup(jsonData);
                    })(message);
                    break;
            }
        }
    });
