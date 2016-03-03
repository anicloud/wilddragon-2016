/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.main', ['ui.router'])

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
        controller: function ($rootScope, $scope, $state, account, contacts, devices, apps) {
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

          $scope.sideNavTabs = {
            app: {
              name: '应用',
              href: '#/application',
              active: true
            },
            device: {
              name: '设备',
              href: '#/device/list/my',
              active: false
            },
            store: {
              name: '商店',
              href: '#/store',
              active: false
            },
            notify: {
              name: '通知',
              href: '',
              active: false
            }
          };

          $scope.selectSideNavTab = function (tabName) {
            $scope.sideNavTabs.app.active = false;
            $scope.sideNavTabs.device.active = false;
            $scope.sideNavTabs.store.active = false;
            $scope.sideNavTabs.notify.active = false;
            $scope.sideNavTabs[tabName].active = true;
          };

          $scope.sidebarCollapse = true;
          $scope.toggleSidebar = function () {
            $scope.sidebarCollapse = !$scope.sidebarCollapse;
          };

        }
      });
  }]);
