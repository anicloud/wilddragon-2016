/**
 * Created by huangbin on 1/18/16.
 */
'use strict';

angular.module('app.view.device.bind', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('main.device.bind', {
            abstract: true,
            url: '/bind',
            templateUrl: 'views/device/bind/device-bind.html',
            controller: 'DeviceBindCtrl',
            resolve:{
              wifiList:function () {
                return [
                  {name:"anicloud"},
                  {name:"ani_5G"}
                ]
              }
            }
          })

          .state('main.device.bind.qrcode', {
            url: '/qrcode',
            templateUrl: 'views/device/bind/device-bind-qrcode.html'
          })

          .state('main.device.bind.wifi', {
            url: '/wifi',
            templateUrl: 'views/device/bind/device-bind-wifi.html'
          })

          .state('main.device.bind.confirm', {
            url: '/confirm',
            templateUrl: 'views/device/bind/device-bind-confirm.html'
          })
      ;
    }])

    .controller('DeviceBindCtrl', function ($scope, $state, $timeout, DeviceService,wifiList) {
      $scope.bindMethod = 'qrcode';
      $scope.bindData = {
        deviceId: '',
        // physicalId: 'm0001',
        // physicalAddress: '00-01-6C-06-A6-29'
        physicalId: '',
        physicalAddress: ''
      };
      //test
      $scope.tryfn=function () {
        console.log('interesting');
      };
      // qrcode
      $scope.qrcodeInti=function () {
        $scope.qrcodeStart = false;
        $scope.qrcodeFinished=false;
        $scope.qrcodePass=false;
        $scope.qrcodeFailed=false;
      };
      $scope.qrcodeInti();
      $scope.toggleStart=function () {
        $scope.qrcodeStart=!$scope.qrcodeStart;
      };
      $scope.toggleFinish=function () {
        $scope.qrcodeFinished=!$scope.qrcodeFinished;
      };
      $scope.qrcodeSuccess = function (result) {
        $scope.qrcodeFinished=true;
        try{
          $scope.bindData = JSON.parse(result);
          if(!checkPattern('id',$scope.bindData.physicalId)&&!checkPattern('address',$scope.bindData.physicalAddress)){
            $scope.qrcodePass=true;
            $scope.qrcodeFailed=false;
          }else{
            $scope.qrcodeFailed=true;
            $scope.qrcodePass=false;
          }
        }catch (e){
          $scope.qrcodeFailed=true;
          $scope.qrcodePass=false;
        }
      };
      $scope.currentUrl="qrcode";
      //type message
      $scope.errorMessage=null;
      $scope.changeBindMethod=function (method) {
        $scope.bindMethod=method;
        $scope.qrcodeInti();
        $scope.bindData.physicalId='';
        $scope.bindData.physicalAddress='';
      };
      $scope.errorList={
        id:{
          'required':'序列号不能为空',
          'pattern':'序列号格式不正确',
          'patternReg':/^[a-zA-Z|0-9|_]+$/
        },
        address:{
          'required':'MAC地址不能为空',
          'pattern':'MAC地址格式不正确',
          'patternReg':/^([0-9A-F]{2}-){5}[0-9A-F]{2}$/i
        }
      };
      function checkRequired(name,value) {//name is type of input
        if(value===''){
          $scope.errorMessage=$scope.errorList[name].required;
          return true;
        }
        return false;
      }
      function checkPattern(name,value) {
        var reg=$scope.errorList[name].patternReg;
        if(!reg.exec(value)){
          $scope.errorMessage=$scope.errorList[name].pattern;
          return true
        }
        return false;
      }
      //check for manual
      $scope.checkQrcode = function () {
        //  todo: if the wifi configuration has been done, then we shall go state '^.confirm'
        var id=$scope.bindData.physicalId,address=$scope.bindData.physicalAddress;

        if(!(checkRequired("id",id)||checkPattern('id',id)||checkRequired("address",address)||checkPattern('address',address)))
        {$scope.errorMessage='';
          $scope.switchState(1);
        }
      };
      $scope.switchState=function (dir,scope) { //dir: 1:forward -1:backward  if implementation is not in current scope,type param 2 is necessary
        scope=scope?scope:$scope;
        var stepList=['list','qrcode','wifi','confirm'];
        function aryIndexOf() {
          for(var i=0;i<stepList.length;i++){
            if(scope.currentUrl===stepList[i]){
              return i;
            }
          }
          return -1;
        }
        var nextState=parseInt(aryIndexOf())+parseInt(dir);
        if(stepList[nextState]){
          scope.currentUrl=stepList[nextState];
          if(nextState===0){
            $state.go('main.device.list');
          }else{
            $state.go('^.'+scope.currentUrl);
          }
        }
        else{
          console.log('step is not exist');
        }
      };
      //auto
      $scope.$watch('bindData.physicalAddress',function (newValue,oldValue) {
        if(newValue.indexOf(oldValue)!==0) return;
        if(newValue.length===oldValue.length+1) {//input by typing
          (newValue.length % 3 === 2&&newValue.length<15) ? $scope.bindData.physicalAddress += "-":null;
        }else if(newValue.length>oldValue.length+1){//type by pasting
          var pastingReg=/^[0-9A-F]+$/i;
          if(pastingReg.test(newValue)){//paste without -
            var addReg=/\w{2}/g;
            $scope.bindData.physicalAddress=newValue.replace(addReg,function (str,index) {
              if(index<10) {str+="-";}
              return str;
            })

          }
        }
      });

      // wifi configuration
      $scope.wifiInfo = {
        ssid: 'anicloud-2.4G',
        password: ''
      };
      $scope.wifiStart = false;
      $scope.startWifiConfig = function () {
        $scope.wifiStart = true;
      };
      $scope.stopWifiConfig = function () {
        $scope.wifiStart = false;
      };
      $scope.ignoreWifi = function () {
        $scope.checkWifi();
      };
      $scope.checkWifi = function () {
        //$state.go('^.confirm');
        $scope.switchState(1);
      };
      $scope.wifiList=wifiList;
      $scope.autoWifi=true;
      // submit bind data
      $scope.check = function () {
        console.log($scope.bindData);
        var bindResult = DeviceService.bindDevice($scope.bindData);
        bindResult.then(function (result) {
          console.log("result");
          if (result.success) {
            alert('绑定设备成功');
            $timeout(function () {
              $scope.devices.push(result.data);
              $scope.deviceMap[result.data.deviceId] = result.data;
              //$state.go('main.device.list');
              $scope.switchState(-3);
            }, 0);
          } else {
            alert('绑定设备失败,原因: '+ result.message);
          }
        });
      };
    });