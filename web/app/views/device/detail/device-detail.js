/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.detail', [
  'ui.router',
  'ui.bootstrap',
  'app.view.device.detail.info',
  'app.view.device.detail.share'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail', {
        abstract: true,
        url: '/{id:[0-9]+}',
        templateUrl: 'views/device/detail/device-detail.html',
        controller: 'DeviceDetailCtrl'
      })

  }])

  .controller('DeviceDetailCtrl', function ($scope, $stateParams,$state) {
    
    console.log("statePara",$stateParams);
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


    $scope.detailNavTabs = {
      info: {
        name: 'DEVICE_DETAIL_INFO',
        active: true
      },
      share: {
        name: 'DEVICE_DETAIL_SHARE_MANAGEMENT',
        active: false
      }
    };

    $scope.selectDetailNavTab = function (tabName) {
      $scope.detailNavTabs.info.active = false;
      $scope.detailNavTabs.share.active = false;
      $scope.detailNavTabs[tabName].active = true;
    };

  })
;
