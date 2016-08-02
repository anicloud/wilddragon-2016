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
        controller: 'GroupCtrl'
      })

      .state('main.group.list', {
        url: '/list',
        templateUrl: 'views/group/group-list.html'
      })

      .state('main.group.detail', {
        url: '/{id:[0-9]+}',
        templateUrl: 'views/group/group-detail.html',
        controller: 'GroupDetailCtrl'
      });

  }])

  .controller('GroupCtrl', function ($scope, $uibModal, $timeout, contacts, groups, AccountService) {
    $scope.selectSideNavTab('group');

    $scope.groupData = {
      name: '',
      accounts: []
    };

    $scope.addGroup = function () {
      var modal = $uibModal.open({
        animation: false,
        backdrop: false,
        templateUrl: 'views/group/group-modal.html',
        controller: 'GroupModalCtrl',
        scope: $scope
      });
      modal.result.then(
        function (data) {
        });
    };

  })

  .controller('GroupDetailCtrl', function($scope, $timeout, $state, $stateParams, AccountService) {
    $scope.group = $scope.groupMap[$stateParams.id];
    $scope.quitGroup = function (group) {

    };
    $scope.removeGroup = function (group) {
      AccountService.deleteGroup(group).then(function (result) {
        if (result.success && result.data !== null) {
          alert('删除分组成功: ' + result.data.name);
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
          alert('删除分组失败,原因: ' + result.message);
        }
      });
    };
  })

  .controller('GroupModalCtrl', function ($scope, $timeout, $uibModalInstance, AccountService) {
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
      AccountService.createGroup($scope.groupData).then(
        function (result) {
          if (result.success && result.data !== null) {
            alert('添加分组成功：');
            console.log(result.data);
            $timeout(function () {
              $scope.groups.push(result.data);
              $scope.groupMap[result.data.groupId] = result.data;
              angular.forEach(result.data.accounts, function (account) {
                $scope.accountMap[account.accountId] = account;
              });
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
      return AccountService.getAccountLike(query).then(function (result) {
        if (result.success && result.data !== null) {
          return result.data;
        } else {
          return [];
        }
      });
    };
  })
;