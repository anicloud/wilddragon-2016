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
    .controller('NotificationCtrl',function ($scope,NotificationManager,AccountServiceDist,NotificationServiceDist) {
        $scope.showIndex=1;
        $scope.selectSideNavTab('notification');
       // NotificationService.deleteNotification($scope.notifications,index);
       $scope.deleteMessage=function (message) {
           NotificationManager.deleteNotification($scope.notifications,message)
       };
        console.log($scope.notifications);
        $scope.dealMessage=function (message,result) {
            console.log(message);
            message.result=result;
            switch(message.type){
                case 'ACCOUNT_GROUP_INVITE':
                    (function (message) {
                        var data={};
                        data.groupId=message.objId;
                        data.accountId=message.fromId;
                        data.result=result;
                       // data=new RetData(true, "", data);
                        console.log(data);
                        AccountServiceDist.inviteResult(data).then(function (response) {
                            var index=$scope.notifications.indexOf(message);
                            if(response.data!==null&&response.success===true){
                                $scope.notifications.splice(index,1);
                                NotificationServiceDist.popNotification('join the group successfully',null,'success');
                            }else if(!response.success){
                                $scope.notifications.splice(index,1);
                                NotificationServiceDist.popNotification('fail to join the group',response.message,'error');
                            }
                        });
                    })(message);
                    break;
            }
        };
        $scope.deleteMessage=function (message) {
            var index=$scope.notifications.indexOf(message);
            $scope.notifications.splice(index,1);
        }
    });
