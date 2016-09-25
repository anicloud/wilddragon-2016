/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.group', [
        'ui.router',
        'ui.bootstrap',
        'ngTagsInput'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main.group', {
                abstract: true,
                url: '/group',
                templateUrl: 'views/group/group.html',
                controller: 'GroupCtrl',
            })

            .state('main.group.list', {
                url: '/list',
                templateUrl: 'views/group/group-list.html'
            })

            .state('main.group.detail', {
                url: '/{id:[0-9]+}',
                templateUrl: 'views/group/group-detail.html',
                controller: 'GroupDetailCtrl'
            })
            .state('main.group.memberInfo', {
                url: '/memInfo/{id:[0-9]+&[0-9]+}',
                templateUrl: 'views/group/group-member-info.html',
                controller: 'GroupMemberInfoCtrl'
            });
    }])
    .controller('GroupCtrl', function ($scope, $uibModal, $state, $location, $timeout, contacts) {
        $scope.currentState = $state;
        $scope.currentLocation = $location;
        $scope.selectSideNavTab('group');
        $scope.groupData = {
            name: '',
            accounts: []
        };
        $scope.addGroup = function () {
            var modal = $uibModal.open({
                animation: false,
                backdrop: false,
                templateUrl: 'views/group/group-add-modal.html',
                controller: 'GroupModalCtrl',
                scope: $scope
            });
            modal.result.then(
                function (data) {
                });
        };
    })
    .controller('GroupDetailCtrl', function ($scope, $timeout, $state, $stateParams, $uibModal, AccountServiceDist) {
        $scope.group = $scope.groupMap[$stateParams.id];
        $scope.quitGroup = function (group) {
            var modal = $uibModal.open({
                animation: false,
                backdrop: false,
                size: "sm",
                templateUrl: 'views/group/group-quit-modal.html',
                controller: 'GroupQuitCtrl',
                scope: $scope
            });
            modal.result.then(function (data) {
                if (data !== "confirm") return;
                AccountServiceDist.quitGroup(group).then(function (result) {
                    if (result.success && result.data !== null) {
                        alert('退出分组成功: ' + result.data.name);
                        $timeout(function () {
                            for (var i = 0; i < $scope.groups.length; i++) {
                                if ($scope.groups[i].groupId == result.data.groupId) {
                                    $scope.groups.splice(i, 1);
                                    break;
                                }
                            }
                            delete $scope.groupMap[result.data.groupId];
                            $state.go('main.group.list');
                        }, 0);
                    } else {
                        alert('分组失败,原因: ' + result.message);
                    }
                });
            });
        };
        $scope.removeGroup = function (group) {
            var modal = $uibModal.open({
                animation: false,
                backdrop: false,
                size: "sm",
                templateUrl: 'views/group/group-remove-modal.html',
                controller: 'GroupRemoveCtrl',
                scope: $scope
            });
            modal.result.then(function (data) {
                if (data !== "confirm") return;
                AccountServiceDist.deleteGroup(group).then(function (result) {
                    if (result.success && result.data !== null) {
                        alert('删除分组成功: ' + result.data.name);
                        // $timeout(function () {
                        //     for (var i = 0; i < $scope.groups.length; i++) {
                        //         if ($scope.groups[i].groupId == result.data.groupId) {
                        //             $scope.groups.splice(i, 1);
                        //             break;
                        //         }
                        //     }
                        //     delete $scope.groupMap[result.data.groupId];
                        // }, 0);
                        $state.go('main.group.list');
                    } else {
                        alert('删除分组失败,原因: ' + result.message);
                    }
                });
            });
        };
        $scope.inviteGroup = function (group) {
            var modal = $uibModal.open({
                animation: false,
                backdrop: false,
                size: "sm",
                templateUrl: 'views/group/group-invite-modal.html',
                controller: 'GroupInviteCtrl',
                scope: $scope
            });
            modal.result.then(function (data) {
                if (data !== "confirm") return;
            });

        };
    })
    .controller('GroupModalCtrl', function ($scope, $timeout, $uibModalInstance, AccountService, AccountServiceDist) {
        $scope.stage = 0;
        $scope.groupData = {
            name: '',
            accounts: []
        };
        $scope.forward = function () {
            $scope.stage += 1;
        };
        $scope.backward = function () {
            $scope.stage -= 1;
        };
        $scope.submit = function () {
            console.log($scope.groupData);
            AccountServiceDist.createGroup($scope.groupData).then(
                function (result) {
                    if (result.success) {
                        alert('添加分组成功：');
                        // $timeout(function () {
                        //     $scope.groups.push(result.data);
                        //     $scope.groupMap[result.data.groupId] = result.data;
                        //     angular.forEach(result.data.accounts, function (account) {
                        //         $scope.accountMap[account.accountId] = account;
                        //     });
                        // }, 0);
                        $timeout(function () {
                            var newGroupData=$scope.groupData;
                            console.log('groupData',newGroupData);
                            newGroupData.accounts=[$scope.account];
                            $scope.groups.push(newGroupData);
                            $scope.groupMap[newGroupData.groupId] = newGroupData;
                        }, 0);
                    } else {
                        console.log('添加分组失败：' + result.message);
                    }
                });
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.loadTags = function (query) {
            return AccountServiceDist.getAccountLike(query).then(function (result) {
                if (result.success && result.data !== null) {
                    return result.data;
                } else {
                    return [];
                }
            });
            // console.log(AccountService.getAccountLike(query));
            //  return AccountService.getAccountLike(query);
        };
    })
    .controller('GroupRemoveCtrl', function ($scope, $uibModalInstance, AccountService, AccountServiceDist) {
        $scope.confirm = function () {
            $uibModalInstance.close("confirm");
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        }
    })
    .controller('GroupQuitCtrl', function ($scope, $uibModalInstance, AccountService, AccountServiceDist) {
        $scope.confirm = function () {
            $uibModalInstance.close("confirm");
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        }
    })
    .controller('GroupInviteCtrl', function ($scope, $timeout, $uibModalInstance, AccountService, AccountServiceDist,$stateParams) {
        $scope.group=$scope.$parent.group;
    $scope.submit = function () {
        console.log($scope.groupData);
        AccountServiceDist.inviteAccount({accounts:$scope.groupData.accounts,group:$scope.group}).then(
            function (result) {
                if (result.success && result.data !== null) {
                    alert('邀请发送成功：'+result.data.name);
                } else {
                    console.log('邀请发送失败：' + result.message);
                }
            });
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    $scope.loadTags = function (query) {
        return AccountServiceDist.getAccountLike(query).then(function (result) {
            if (result.success && result.data !== null) {
                var exsitAarray=[];
                $scope.group.accounts.forEach(function (account,index) {
                    exsitAarray.push(account.accountId);
                });
                return dataFilter(exsitAarray,result.data);
            } else {
                return [];
            }
        });
    };
})
    .controller('GroupMemberInfoCtrl', function ($stateParams, $scope,AccountServiceDist,$state) {
        console.log("statePara", $stateParams);//groupId accountId
        var paraAry = $stateParams["id"].split("&");
        var groupId = paraAry[0], accountId = paraAry[1];
        $scope.group = queryObjectByPropertyValue($scope.groups, "groupId", groupId)[1];
        $scope.memberAccount = queryObjectByPropertyValue($scope.group.accounts, "accountId", accountId)[1];
        $scope.kickGroup=function (memberAccount) {
            var data={groupId:$scope.group.groupId,accountId:memberAccount.accountId};
         AccountServiceDist.kickGroup(data).then(function (response) {
             if(response.success===true){
                 alert('移除成员成功：'+$scope.memberAccount.name);
                 var index=$scope.groupMap[groupId].accounts.indexOf($scope.memberAccount);
                 // $scope.groupMap[groupId].accounts.splice(index,1);
                 $state.go('main.group.detail',{id:groupId});
             }else {
                 alert('移除成员失败：'+$scope.memberAccount.name);
             }

         });
        }
    });