/**
 * Created by huangbin on 4/9/16.
 */
'use strict';

angular.module('app.view.device.detail.info', [
  'ui.router',
  'ui.bootstrap'
])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.device.detail.info', {
        url: '/info',
        templateUrl: 'views/device/detail/info/device-detail-info.html',
        controller: 'DeviceDetailInfoCtrl',
        resolve: {
          // functions: function ($stateParams, DeviceService) {
          //   return DeviceService.getMasterFunctions($stateParams.id);
          // }
           functions: function ($stateParams, DeviceServiceMock) {
             return DeviceServiceMock.getMasterFunctions($stateParams.id);
           }
        }
      })
      .state('main.device.detail.info.slave', {
        url: '/{slaveId:[0-9]+}',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-slave.html',
            controller: 'DeviceDetailInfoSlaveCtrl',
            resolve: {
              functions: function ($stateParams, DeviceServiceMock) {
                return DeviceServiceMock.getSlaveFunctions($stateParams.id, $stateParams.slaveId)
              }
            }
          }
        }
      })
      .state('main.device.detail.info.name', {
        url: '/name',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-name.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.description', {
        url: '/description',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-description.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.state', {
        url: '/state',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-state.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.gid', {
        url: '/gid',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-gid.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.sid', {
        url: '/sid',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-sid.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.mac', {
        url: '/mac',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-mac.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
      .state('main.device.detail.info.function', {
        url: '/function/{fid:[0-9]+}',
        views: {
          '@main.device.detail': {
            templateUrl: 'views/device/detail/info/settings/device-detail-info-function.html',
            controller: 'DeviceDetailInfoSettingsCtrl'
          }
        }
      })
    ;
  }])

  .controller('DeviceDetailInfoCtrl', function ($scope, $timeout, $state, DeviceService, functions) {
    $scope.selectDetailNavTab('info');
    $scope.masterFunctionMetas = [];
    if (functions.success) {
      console.log('Got functions data:');
      console.log(functions.data);
      $scope.masterFunctionMetas = functions.data;
    } else {
      console.error('Error in getting functions');
    }

    $scope.unbind = function(device) {
      var data = {
        deviceId: device.deviceId
      };
      DeviceService.unbindDevice(data).then(function (result) {
        console.log(result);
        if (result.success) {
          alert("解除设备绑定成功");
          $timeout(function () {
            for (var i=0; i<$scope.devices.length; i++) {
              if ($scope.devices[i].deviceId == result.data.deviceId) {
                $scope.devices.splice(i, 1);
                break;
              }
            }
            delete $scope.deviceMap[result.data.deviceId];
            $state.go('main.device.list');
          }, 0);
        } else {
          alert("解除设备绑定失败,原因: " + result.message);
        }
      });
    }
  })

  .controller('DeviceDetailInfoSlaveCtrl', function ($scope, $stateParams, functions) {
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
    $scope.slaveFunctionMetas = [];
    if (functions.success) {
      console.log('Got functions data:');
      console.log(functions.data);
      $scope.slaveFunctionMetas = functions.data;
    } else {
      console.error('Error in getting functions');
    }
  })
  .controller('DeviceDetailInfoSettingsCtrl', function ($scope, $state,DeviceService) {
    $scope.name = $scope.device.name;
    $scope.description = $scope.device.description;
    $scope.gid = $scope.device.deviceId;
    $scope.sid = $scope.device.physicalId;
    $scope.mac = $scope.device.physicalAddress;
    $scope.state = $scope.deviceStateFilter($scope.device.state);
    $scope.modifyDevice=function (key,value){
      var device=$scope.deviceMap[$scope.gid];
      device[key]=value;
      DeviceService.modifyDevice(device).then(function (res){
        console.log(res.data);
        if(res.success){
          $scope[key]=value;
          $scope.deviceMap[$scope.gid][key] =value;
          var modiDevice=queryObjectByPropertyValue($scope.devices,'deviceId',$scope.gid)[1];
          modiDevice[key]=value;
          return alert('更改成功');
        }else{
          return alert('更改失败');
        }
      });
    };
    $scope.cancel = function () {
      $state.go('^');
    }
  })
;

