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
           functions: function ($stateParams, DeviceService) {
             return DeviceService.getMasterFunctions($stateParams.id);
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
              functions: function ($stateParams, DeviceService) {
                return DeviceService.getSlaveFunctions($stateParams.id, $stateParams.slaveId)
              }
            }
          }
        }
      })
        .state('main.device.detail.info.slaveManagement',{
          url:'/slaveManagement',
          views: {
            '@main.device.detail': {
              templateUrl: "views/device/detail/info/device-detail-slaveManagement.html",
              controller: 'DeviceDetailInfoSlaveManagementCtrl'
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

  .controller('DeviceDetailInfoCtrl', function ($scope, $timeout, $state, DeviceService, functions,$uibModal,NotificationServiceDist) {
    $scope.selectDetailNavTab('info');
    $scope.masterFunctionMetas = [];
    if (functions.success) {
      console.log('Got functions data:');
      console.log(functions.data);
      $scope.masterFunctionMetas = functions.data;
    } else {
      console.error('Error in getting functions');
    }
    $scope.unbind=function(device){
      $scope.deviceInfo=device;
      var modal = $uibModal.open({
        animation: false,
        backdrop: false,
        size: "sm",
        templateUrl: 'views/device/detail/info/device-unbind-modal.html',
        controller: 'DeviceUnbindCtrl',
        scope: $scope
      });
      modal.result.then(function(data){
        if (data !== "confirm") return ;
        $scope.DeviceData = {
          deviceId: device.deviceId,
          permissions:device.permissions
        };
        DeviceService.unbindDevice($scope.DeviceData).then(function (result) {
          console.log(result);
          if (result.success) {
            NotificationServiceDist.popNotification("解除设备绑定成功",null,'success');
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
            NotificationServiceDist.popNotification("解除设备绑定失败",result.message,'error');
          }
        });
      })
    };
    $scope.slaveManage=function(device){
      $scope.deviceInfo=device;
      var modal=$uibModal.open({
        animation: false,
        backdrop: false,
        size: "sm",
        templateUrl: 'views/device/detail/info/device-detail-slaveManagememt-modal.html',
        controller: 'DeviceSlaveManagementModalCtrl',
        scope: $scope
      })
    }
  })
    .controller('DeviceUnbindCtrl',function($scope,$uibModalInstance){
      $scope.confirm = function () {
        $uibModalInstance.close("confirm");
      };
      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
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
  .controller('DeviceDetailInfoSettingsCtrl', function ($scope, $state,DeviceService,NotificationServiceDist) {
    $scope.name = $scope.device.name;
    $scope.description = $scope.device.description;
    $scope.gid = $scope.device.deviceId;
    $scope.sid = $scope.device.physicalId;
    $scope.mac = $scope.device.physicalAddress;
    $scope.ownerId=$scope.device.owner;
    $scope.state = $scope.deviceStateFilter($scope.device.state);
    $scope.modifyDevice=function (key,value){
      var device=angular.copy($scope.deviceMap[$scope.gid]);
      device[key]=value;
      delete device['toBindSlave'];
      DeviceService.modifyDevice(device).then(function (res){
        console.log(res.data);
        if(res.success){
          $scope[key]=value;
          $scope.deviceMap[$scope.gid][key] =value;
          var modiDevice=queryObjectByPropertyValue($scope.devices,'deviceId',$scope.gid)[1];
          modiDevice[key]=value;
          return NotificationServiceDist.popNotification('更改成功',null,'success');
        }else{
          return NotificationServiceDist.popNotification('更改失败',res.message,'error');
        }
      });
    };
    $scope.cancel = function () {
      $state.go('^');
    }
  })
    // .controller("DeviceDetailInfoSlaveManagementCtrl",function ($scope,$stateParams,DeviceService) {
    //   console.log($scope);
    //   $scope.searchingFlag=false;
    //   $scope.getSlaveList=function (masterId) {
    //     DeviceService.getSlaveList(masterId).then(function (res) {
    //       if(res.data.toString()==='true'){
    //         alert('request send successfully,please waiting for searching');
    //         $scope.device.toBindSlave.state='bindListWaiting';
    //         //'null','bindListWaiting','bindSelecting','bindResultWaiting','bindResultWaiting','bindEnd'
    //       }else {
    //         alert('request fail');
    //       }
    //     });
    //   };
    //   $scope.sendBindList=function () {
    //     var list=$scope.device.toBindSlave.list;
    //     var sendList=[];
    //     list.forEach(function (slave) {
    //       if(slave.selected) sendList.push(slave.deviceId);
    //     });
    //     DeviceService.sendBindList({
    //       masterId:$scope.device.deviceId,
    //       bindList:sendList
    //     }).then(function (res) {
    //       if(res.data.toString()==="true"){
    //         alert('request send successfully,please waiting for binding');
    //         $scope.device.toBindSlave.state='bindResultWaiting';
    //       }
    //     })
    //   };
    //   console.log($stateParams);
    // })
    .controller("DeviceSlaveManagementModalCtrl",function ($uibModalInstance,$scope,DeviceService,NotificationServiceDist) {
      console.log($scope);
      $scope.stage = 0;
      var functionMeta=[
        {
          groupId:0,
          functionId:1,
          name:"ZigBee"
        },
        {
          groupId:0,
          functionId:2,
          name:"BlueTooth"
        }
      ];
      $scope.device.toBindSlave={
        list:[],
        state:null
      };
        $scope.slaveBindFunctions=[];
        $scope.selectedFunctionId="";
        $scope.device.functions.forEach(function(item){
          if(item.groupId.toString()==="0"){
            $scope.slaveBindFunctions.push(queryObjectByPropertyValue(functionMeta,'functionId',item.functionId)[1])
          }
        });
      $scope.forward = function (step) {
        $scope.stage += step;
      };
      $scope.backward = function (step) {
        $scope.stage -= step;
      };
      $scope.gotoBindModal=function(functionId){
        if(functionId.toString()==="1"){
          $scope.forward(1);
        }else if(functionId.toString()==="2"){
          $scope.forward(2);
        }else{
          console.log('goto param error')
        }
      };
      $scope.zigbeeBind=function () {
        DeviceService.getSlaveList($scope.device.deviceId).then(function (res) {
          $scope.device.toBindSlave.state='bindListWaiting';
          if(res.success.toString()==='true'){
           // alert('request send successfully,the device will send the notification when bind success');
            $scope.device.toBindSlave.state='bindSelecting';
            $scope.device.toBindSlave.list[0]=res.data.slaveIdList[0];
          }else {
            NotificationServiceDist.popNotification('request fail',null,'error');
          }
        });
      };
      console.log('slaveBindFunctions',$scope.slaveBindFunctions);
      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };
      $scope.getSlaveList=function (masterId) {
        DeviceService.getSlaveList(masterId).then(function (res) {
          if(res.success.toString()==='true'){
            $scope.device.toBindSlave.state='bindSelecting';
            //'null','bindListWaiting','bindSelecting','bindResultWaiting','bindResultWaiting','bindEnd'
            $scope.device.toBindSlave.list[0]=res.data.slaveIdList[0];
          }else {
            NotificationServiceDist.popNotification('request fail',null,'error');
          }
        });
      };
      $scope.zigbeeSendBind=function(){
        DeviceService.sendBindList(
            {deviceId:$scope.device.deviceId,
              slaveIdList:[$scope.device.toBindSlave.list[0]]}).
        then(function(res){
          if(res.success.toString()==='true'){
            $scope.device.toBindSlave.state='bindResultWaiting';
          }else{
            NotificationServiceDist.popNotification('request fail',null,'error');
          }
        })
      };
      $scope.sendBindList=function () {
        var list=$scope.device.toBindSlave.list;
        var sendList=[];
        list.forEach(function (slave) {
          if(slave.selected) sendList.push(slave.deviceId);
        });
        DeviceService.sendBindList({
          masterId:$scope.device.deviceId,
          bindList:sendList
        }).then(function (res) {
          if(res.data.toString()==="true"){
            NotificationServiceDist.popNotification('request send successfully,please waiting for binding',null,'success');
            $scope.device.toBindSlave.state='bindResultWaiting';
          }
        })
      };
    });

