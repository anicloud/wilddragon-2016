/**
 * Created by huangbin on 4/9/16.
 */
'use strict';

angular.module('app.view.device.detail.share', [
  'ui.router',
  'ui.bootstrap'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail.share', {
        url: '/share',
        templateUrl: 'views/device/detail/share/device-detail-share.html',
        controller: 'DeviceDetailShareCtrl'
      })
  }])

  .controller('DeviceDetailShareCtrl', function ($scope, $uibModal, $timeout, DeviceService) {
    $scope.selectDetailNavTab('share');
    $scope.shareList = [];
    $scope.nextAvaliable=false;
    $scope.updateShareList = function () {
      $scope.shareList = [];
      angular.forEach($scope.device.permissions, function (permission) {
        var item = {};
        if (permission.groupId in $scope.groupMap) {
          item.group = $scope.groupMap[permission.groupId];
          item.types = permission.types;
          item.owner = $scope.accountMap[$scope.device.owner];
          $scope.shareList.push(item);
        }
      });
    };

    $scope.updateShareList();

    $scope.getPermissionTypeName = function (type) {
      if (type === 'READABLE') {
        return '可读';
      } else if (type === 'READABLE') {
        return '可写';
      } else {
        return '可执行';
      }
    };

    $scope.addShare = function () {
      var modal = $uibModal.open({
        animation: false,
        backdrop: false,
        templateUrl: 'views/device/detail/share/share-modal.html',
        controller: 'ShareModalCtrl',
        scope: $scope
      });
      modal.result.then(
        function (result) {

        },
        function () {

        }
      );
    };
    $scope.removeShare = function (share) {
      var shareData = {
        //deviceId: $scope.device.deviceId,
        types: share.types,
        groupId: share.group.groupId
      };
      DeviceService.unShareDevice(shareData).then(
        function (result) {
          if (result.success && result.data !== null) {
            alert('移除共享成功');
            console.log(result.data);
            $timeout(function () {
              $scope.device.permissions = result.data;
              $scope.updateShareList();
            }, 0);
          } else {
            alert('移除共享失败,原因: ' + result.message);
          }
        }
      );
    };

  })

  .controller('ShareModalCtrl', function ($scope, $timeout, $uibModalInstance, AccountServiceDist, DeviceService) {
    $scope.stage = 0;
    $scope.shareData = {
      deviceId: $scope.device.deviceId,
      groupId: '',
      types: []
    };
    $scope.unSharedGroups=[];
        (function (groups,sharedGroups) {
      console.log(groups,sharedGroups);
      angular.forEach(groups,function (group) {
        var existFlag=false;
        for(var i=0;i<sharedGroups.length;i++){
          var sharedGroupId=sharedGroups[i];
          (group.groupId===sharedGroupId)?(existFlag=true):null;
        }
        if(!existFlag) $scope.unSharedGroups.push(group);
      });
    })($scope.groups,$scope.device.accountGroups);
    $scope.permission = {
      readable: true,
      writable: true,
      executable: true
    };
    $scope.forward = function (step) {
      $scope.stage += step;
    };
    $scope.backward = function (step) {
      $scope.stage -= step;
    };
    $scope.submit = function () {
      if ($scope.permission.readable) {
        $scope.shareData.types.push('READABLE');
      }
      if ($scope.permission.writable) {
        $scope.shareData.types.push('WRITABLE');
      }
      if ($scope.permission.executable) {
        $scope.shareData.types.push('EXECUTABLE');
      }
      console.log($scope.shareData);
      DeviceService.shareDevice($scope.shareData).then(
        function (result) {
          if (result.success && result.data !== null) {
            alert('共享设备成功');
            console.log(result.data);
            $timeout(function () {
              $scope.device.permissions = result.data;
              $scope.deviceMap[$scope.shareData.deviceId].accountGroups.push($scope.shareData.groupId);
              $scope.updateShareList();
            }, 0);
          } else {
            alert('共享设备失败,原因: ' + result.message);
          }
        }
      );
      $uibModalInstance.close();
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    $scope.groupData = {
      name: '',
      accounts: []
    };
    $scope.selectGroup=function () {
      $scope.nextAvaliable=true;
    };
    $scope.addGroup = function () {
      console.log($scope.groupData);
      AccountServiceDist.createGroup($scope.groupData).then(
        function (result) {
          if (result.success && result.data !== null) {
            console.log('添加分组成功');
            console.log(result.data);
            $timeout(function () {
              $scope.groups.push(result.data);
              $scope.groupMap[result.data.groupId] = result.data;
              angular.forEach(result.data.accounts, function (account) {
                $scope.accountMap[account.accountId] = account;
              });
              $scope.stage = 0;
            }, 0);
          } else {
            console.log('添加分组失败, 原因' + result.message);
          }
        });
    };
    $scope.loadTags = function (query) {
      return AccountServiceDist.getAccountLike(query).then(function (result) {
        if (result.success && result.data !== null) {
          return result.data;
        } else {
          return [];
        }
      });
    };
    $scope.isGroupsCollapsed = true;
  })
;
