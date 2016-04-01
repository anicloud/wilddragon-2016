/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.detail', [
  'ui.router',
  'ui.bootstrap'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail', {
        abstract: true,
        url: '/{id:[0-9]+}',
        templateUrl: 'views/device/detail/device-detail.html',
        controller: 'DeviceDetailCtrl'
      })

      .state('main.device.detail.info', {
        abstract: true,
        url: '/info',
        templateUrl: 'views/device/detail/info/device-detail-info.html',
        controller: 'DeviceDetailCtrl'
      })

      .state('main.device.detail.info.basic', {
        url: '/basic',
        templateUrl: 'views/device/detail/info/device-detail-info-basic.html',
        controller: 'DeviceDetailInfoBasicCtrl'
      })

      .state('main.device.detail.info.share', {
        url: '/share',
        templateUrl: 'views/device/detail/info/device-detail-info-share.html',
        controller: 'DeviceDetailInfoShareCtrl'
      })

      .state('main.device.detail.slave', {
        url: '/{slaveId:[0-9]+}',
        templateUrl: 'views/device/detail/slave/device-detail-slave.html',
        controller: 'DeviceDetailSlaveCtrl'
      });
  }])

  .controller('DeviceDetailCtrl', function ($scope, $stateParams) {
    $scope.device = null;
    $scope.isOwner = false;
    for (var i = 0; i < $scope.devices.length; i++) {
      if ($scope.devices[i].deviceId == $stateParams.id) {
        $scope.device = $scope.devices[i];
        break;
      }
    }
    if ($scope.device.owner == $scope.account.accountId) {
      $scope.isOwner = true;
    }
    if ($scope.device === null) {
      console.warn('cannot find device with id: ' + $stateParams.id);
    }


    $scope.infoNavTabs = {
      basic: {
        name: '设备信息',
        active: true
      },
      share: {
        name: '共享管理',
        active: false
      }
    };

    $scope.selectInfoNavTab = function (tabName) {
      $scope.infoNavTabs.basic.active = false;
      $scope.infoNavTabs.share.active = false;
      $scope.infoNavTabs[tabName].active = true;
    };

  })

  .controller('DeviceDetailInfoBasicCtrl', function ($scope, $stateParams) {
    $scope.selectInfoNavTab('basic');
  })

  .controller('DeviceDetailInfoShareCtrl', function ($scope, $uibModal, $timeout, DeviceService) {
    $scope.selectInfoNavTab('share');
    $scope.shareList = [];

    $scope.updateShareList = function () {
      $scope.shareList = [];
      angular.forEach($scope.device.permissions, function (permission) {
        var item = {};
        item.group = $scope.groupMap[permission.groupId];
        item.types = permission.types;
        item.owner = $scope.device.owner;
        $scope.shareList.push(item);
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
        templateUrl: 'views/device/detail/info/share-modal.html',
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
        deviceId: $scope.device.deviceId,
        types: share.types,
        groupId: share.group.groupId
      };
      DeviceService.unShareDevice(shareData).then(
        function (result) {
          if (result.success && result.data !== null) {
            console.log('移除共享成功：');
            console.log(result.data);
            $timeout(function () {
              $scope.device.permissions = result.data;
              $scope.updateShareList();
            }, 0);
          } else {
            console.log('移除共享失败：' + result.message);
          }
        }
      );
    };

  })

  .controller('ShareModalCtrl', function ($scope, $timeout, $uibModalInstance, AccountService, DeviceService) {
    $scope.stage = 0;
    $scope.shareData = {
      deviceId: $scope.device.deviceId,
      groupId: '',
      types: []
    };

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
            console.log('共享设备成功：');
            console.log(result.data);
            $timeout(function () {
              $scope.device.permissions = result.data;
              $scope.updateShareList();
            }, 0);
          } else {
            console.log('共享设备失败：' + result.message);
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
    $scope.addGroup = function () {
      console.log($scope.groupData);
      AccountService.createGroup($scope.groupData).then(
        function (result) {
          if (result.success && result.data !== null) {
            console.log('添加分组成功：');
            console.log(result.data);
            $timeout(function () {
              $scope.groups.push(result.data);
              $scope.stage = 0;
            }, 0);
          } else {
            console.log('添加分组失败：' + result.message);
          }
        });
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
    $scope.isGroupsCollapsed = true;
  })

  .controller('DeviceDetailSlaveCtrl', function ($scope, $stateParams) {
    $scope.slave = null;
    if (typeof($stateParams.slaveId) != 'undefined') {
      for (var i = 0; i < $scope.device.slaves.length; i++) {
        var slave = $scope.device.slaves[i];
        if (slave.deviceId == $stateParams.slaveId) {
          $scope.slave = slave;
          break;
        }
      }
      if ($scope.slave === null) {
        console.warn('cannot find slave device with id: ' + $stateParams.slaveId);
      }
    }
  })
;
