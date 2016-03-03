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
        templateUrl: 'views/device/bind/device-bind-qrcode.html',
        controller: 'DeviceBindCtrl'
      })

      .state('main.device.bind.wifi', {
        url: '/wifi',
        templateUrl: 'views/device/bind/device-bind-wifi.html',
        controller: 'DeviceBindCtrl'
      })

      .state('main.device.bind.confirm', {
        url: '/confirm',
        templateUrl: 'views/device/bind/device-bind-confirm.html',
        controller: 'DeviceBindCtrl'
      })
    ;
  }])

  .controller('DeviceBindCtrl', function ($rootScope, $scope, $state) {
    $scope.bindMethod = 'qrcode';
    $scope.bindInfo = {
      physicalId: '',
      mac: ''
    };
    $scope.qrcodeStart = false;
    $scope.qrcodeSuccess = function (result) {
      alert(result);
      $scope.qrcodeStart = false;
      $scope.bindInfo.mac = result;
      $scope.submitBindInfo();
    };

    $scope.submitBindInfo = function () {
      console.log($scope.bindInfo);
      $state.go('^.wifi');
      //  todo: if the wifi configuration has been done, then we shall go '.'
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

    // bind confirm
    $scope.confirmBind = function () {

    };
  });
