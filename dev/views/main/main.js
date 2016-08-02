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
          notifications: function (NotificationService) {
            return NotificationService.getAllNotifications();
          },
          contacts: function (AccountService) {
            return AccountService.getContacts();
          },
          groups: function (AccountService) {
            return AccountService.getGroups();
          },
          devices: function (DeviceService) {
            return DeviceService.getDevices();
          }
        },
        controller: function ($rootScope, $scope, $window, $timeout, $state, account, contacts, groups, devices) {
          if (account.success) {
            console.log('Got account data:');
            console.log(account.data);
            $scope.account = account.data;
          } else {
            console.error('Error in getting account');
          }
          if (contacts.success) {
            console.log('Got contacts data:');
            console.log(contacts.data);
            $scope.contacts = contacts.data;
          } else {
            console.error('Error in getting contacts');
          }
          if (groups.success) {
            console.log('Got groups data:');
            console.log(groups.data);
            $scope.groups = groups.data;
            $scope.groupMap = {};
            $scope.accountMap = {};
            angular.forEach($scope.groups, function (group) {
              $scope.groupMap[group.groupId] = group;
              $scope.accountMap[group.owner.accountId] = group.owner;
              angular.forEach(group.accounts, function (account) {
                $scope.accountMap[account.accountId] = account;
              });
            });
            console.log('Account map: ');
            console.log($scope.accountMap);
          } else {
            console.error('Error in getting groups');
          }
          if (devices.success) {
            console.log('Got devices data');
            console.log(devices.data);
            $scope.devices = devices.data;
            $scope.deviceMap = {};
            angular.forEach($scope.devices, function (device) {
              $scope.deviceMap[device.deviceId] = device;
            });
          } else {
            console.error('Error in getting devices');
          }

          $scope.sideNavTabs = {
            app: {
              name: '应用',
              active: true
            },
            device: {
              name: '设备',
              active: false
            },
            store: {
              name: '商店',
              active: false
            },
            group: {
              name: '分组',
              active: false
            },
            notify: {
              name: '通知',
              active: false
            },
            settings: {
              name: '设置',
              active: false
            }
          };

          $scope.selectSideNavTab = function (tabName) {
            $timeout(function() {
              $scope.sideNavTabs.app.active = false;
              $scope.sideNavTabs.device.active = false;
              $scope.sideNavTabs.store.active = false;
              $scope.sideNavTabs.group.active = false;
              $scope.sideNavTabs.notify.active = false;
              $scope.sideNavTabs.settings.active = false;
              $scope.sideNavTabs[tabName].active = true;
              $scope.sidebarCollapsed = true;
            }, 0);
          };

          $scope.sidebarCollapsed = true;
          $scope.toggleSidebar = function () {
            $scope.sidebarCollapsed = !$scope.sidebarCollapsed;
          };

          $scope.logout = function () {
            $window.location.href = $window.location.protocol + '//' + $window.location.host + "/logout";
          };
        }
      });
  }]);
