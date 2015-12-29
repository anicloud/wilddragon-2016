/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.main', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        url: '',
        templateUrl: 'views/main/main.html',
        resolve: {
          account: function (AccountService) {
            return AccountService.getAccount();
          },
          contacts: function (AccountService) {
            return AccountService.getContacts();
          },
          devices: function (DeviceService) {
            return DeviceService.getDevices();
          },
          apps: function (AppService) {
            return AppService.getApps();
          },
          notifications: function (NotificationService) {
            return NotificationService.getAllNotifications();
          }
        },
        controller: function ($rootScope, account, contacts, devices, apps) {
          if (account.success) {
            console.log("Got account data:");
            console.log(account.data);
            $rootScope.account = account.data;
          } else {
            console.error('Error in getting account');
          }
          if (contacts.success) {
            console.log("Got contacts data:");
            console.log(contacts.data);
            $rootScope.contacts = contacts.data;
          } else {
            console.error('Error in getting account');
          }
          if (devices.success) {
            console.log("Got devices data");
            console.log(devices.data);
            $rootScope.devices = devices.data;
          } else {
            console.error('Error in getting devices');
          }
          if (apps.success) {
            console.log("Got apps data");
            console.log(apps.data);
            $rootScope.apps = apps.data;
          } else {
            console.error('Error in getting apps');
          }
        }
      });
  }]);
