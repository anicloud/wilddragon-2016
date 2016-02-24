/**
 * Created by huangbin on 1/28/16.
 */
'use strict';

angular.module('app.view.device.detail.share', [
  'ui.router',
  'ui.bootstrap'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('main.device.detail.share', {
      url: '/share',
      templateUrl: 'views/device/detail/share/device-detail-share.html',
      controller: 'DeviceDetailShareCtrl'
    });
  }])

  .controller('DeviceDetailShareCtrl', function ($rootScope, $scope, $uibModal) {
    $scope.getDeviceGroups = function (device) {
      var deviceGroups = [];
      var accountGroups = $rootScope.account.groups;
      for (var i = 0; i < device.accountGroups.length; i++) {
        for (var j = 0; j < accountGroups.length; j++) {
          if (accountGroups[j].groupId == device.accountGroups[i]) {
            deviceGroups.push(accountGroups[j]);
            break;
          }
        }
      }
      return deviceGroups;
    };
    $scope.getGroupAccounts = function (group) {
      var accounts = [];
      for (var i = 0; i < group.accounts.length; i++) {
        for (var j = 0; j < $rootScope.contacts.length; j++) {
          if (group.accounts[i] == $rootScope.contacts[j].accountId) {
            accounts.push($rootScope.contacts[j]);
            break;
          }
        }
      }
      return accounts;
    };
    $scope.deviceGroups = $scope.getDeviceGroups($scope.device);

    $scope.shareForm = {};
    $scope.openShareModal = function () {
      $scope.shareForm.name = '';
      var shareModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-open.html',
        controller: 'ShareModalCtrl'
      });
      shareModal.result.then(
        function (name) {
          $scope.shareForm.name = name;
          $scope.openMemberModal();
        },
        function () {
          $scope.shareForm.name = '';
        });
    };

    $scope.openMemberModal = function () {
      $scope.shareForm.members = [];
      var shareModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-member.html',
        controller: 'MemberModalCtrl'
      });
      shareModal.result.then(
        function (members) {
          $scope.shareForm.members = members;
          $scope.openPermissionModal();
        },
        function () {

        }
      );
    };

    $scope.openPermissionModal = function () {
      $scope.shareForm.permissions = [];
      var shareModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-permission.html',
        controller: 'PermissionModalCtrl'
      });
      shareModal.result.then(
        function (permissions) {
          $scope.shareForm.permissions = permissions;
          console.log($scope.shareForm);
        },
        function () {
        }
      );
    }
  })

  .controller('ShareModalCtrl', function ($scope, $uibModalInstance) {
    $scope.name = '';
    $scope.ok = function () {
      $uibModalInstance.close($scope.name);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('MemberModalCtrl', function ($scope, $uibModalInstance) {
    $scope.members = [];
    $scope.ok = function () {
      $uibModalInstance.close($scope.members);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('PermissionModalCtrl', function ($scope, $uibModalInstance) {
    $scope.permissions = [];
    $scope.ok = function () {
      $uibModalInstance.close($scope.permissions);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })
;






