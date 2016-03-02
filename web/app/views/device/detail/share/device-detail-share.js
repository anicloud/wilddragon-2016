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
    $scope.detailNavTabs.share.active = true;
    $scope.detailNavTabs.info.active = false;

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

    $scope.shareForm = {
      name: '',
      members: [],
      permissions: []
    };
    $scope.openShareModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-name.html',
        controller: 'ShareModalCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.name = result.data;
            $scope.openMemberModal();
          }
        },
        function () {
          $scope.shareForm.name = '';
        });
    };

    $scope.openMemberModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-member.html',
        controller: 'MemberModalCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.members = result.data;
            $scope.openPermissionModal();
          } else {
            $scope.openShareModal();
            $scope.shareForm.members = [];
          }
        },
        function () {
          $scope.shareForm.members = [];
        }
      );
    };

    $scope.openPermissionModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/device/detail/share/share-modal-permission.html',
        controller: 'PermissionModalCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.permissions = result.data;
          } else {
            $scope.openMemberModal();
            $scope.shareForm.permissions = [];
          }
        },
        function () {
          $scope.shareForm.permissions = [];
        }
      );
    }
  })

  .controller('ShareModalCtrl', function ($scope, $uibModalInstance) {
    $scope.name = '';
    var result = { success: true, data: undefined};
    $scope.forward = function () {
      result.data = $scope.name;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('MemberModalCtrl', function ($scope, $uibModalInstance) {
    $scope.members = [];
    var result = { success: true, data: undefined};
    $scope.backward = function() {
      result.success = false;
      $uibModalInstance.close(result);
    };
    $scope.forward = function () {
      result.data = $scope.members;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('PermissionModalCtrl', function ($scope, $uibModalInstance) {
    $scope.permissions = [];
    var result = { success: true, data: undefined};
    $scope.backward = function () {
      result.success = false;
      $uibModalInstance.close(result);
    };
    $scope.forward = function () {
      result.data = $scope.permissions;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })
;






