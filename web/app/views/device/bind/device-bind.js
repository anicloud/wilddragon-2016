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
        controller: 'DeviceBindCtrl'
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

  .controller('DeviceBindCtrl', function ($scope, $state, $timeout, DeviceService) {
    $scope.bindMethod = 'qrcode';
    $scope.bindData = {
      deviceId: '',
      physicalId: 'm0001',
      physicalAddress: '00-01-6C-06-A6-29'
    };

    // qrcode
    $scope.qrcodeStart = false;
    $scope.qrcodeSuccess = function (result) {
      alert(result);
      $scope.qrcodeStart = false;
      $scope.bindData = JSON.parse(result);
    };
    $scope.checkQrcode = function () {
      $state.go('^.wifi');
      //  todo: if the wifi configuration has been done, then we shall go state '^.confirm'
    };

    // wifi configuration
    $scope.wifiInfo = {
      ssid: '',
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
      $state.go('^.confirm');
    };

    // submit bind data
    $scope.checkBind = function () {
      console.log($scope.bindData);
      var bindResult = DeviceService.bindDevice($scope.bindData);
      bindResult.then(function (result) {
        console.log(result);
        if (result.success) {
          alert("bind ok");
          $timeout(function () {
            $scope.devices.push(result.data);
          }, 0);
        } else {
          alert("bind failed: "+ result.message);
        }
      });
    };
  });
