/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.main', ['ui.router','angular-websocket','ngCookies','pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
      var lang=navigator.language||'zh';
      console.log(lang.indexOf('zh'));
      if(lang.indexOf('tw')>-1){lang='tw'}
      else if(lang.indexOf('zh')>-1){lang='zh'}
      else{lang='en'}
      $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage(lang);
      $translateProvider.useLocalStorage();
    }])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('main', {
            abstract: true,
            url: '',
            templateUrl: 'views/main/main.html',
            resolve: {
              account: function (AccountServiceDist) {
                return AccountServiceDist.getAccount();
              },
              notifications: function (NotificationServiceDist) {
                return NotificationServiceDist.getInvitations();
              },
              contacts: function (AccountServiceMock) {
                return AccountServiceMock.getContacts();
              },
              groups: function (AccountServiceDist) {
                return AccountServiceDist.getGroups();
              },
              devices: function (DeviceService) {
                return DeviceService.getDevices();
              },
              apps:function (AppService) {
                return AppService.getApps();
              }
              // langConfig:function(I18nServiceDist){
              //   return I18nServiceDist.initConfig();
              // }
            },                                                                                   
            controller: function ($rootScope, $scope, $window, $timeout, $state,account,groups,devices,contacts,
                                  AccountServiceDist,WebSocketServiceDist,apps,notifications,NotificationServiceDist) {
              console.log('contancts',contacts);
              (function () { //module about responsive setup
                $scope.transitionFlag=false;
                $rootScope.calcuOpacity=function (left) {
                  return (left+300)/300*0.8;
                };
                $rootScope.deviceWidth=parseInt($('body').css('width'));
                if($rootScope.deviceWidth<768){
                  $rootScope.mobileFlag=true;
                }else {
                  $rootScope.mobileFlag=false;
                };
              })();
              WebSocketServiceDist.connect($scope);
              (function () { //module about model definition
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
                if (apps.success) {
                  console.log('Got apps data:');
                  console.log(apps.data);
                  $scope.apps = apps.data;
                } else {
                  console.error('Error in getting apps');
                }
                // if (notifications.success) {
                //   angular.forEach(notifications.data,function (obj,index) {
                //     obj.body=getMessage(obj).body;
                //     if(getMessage(obj).choice) obj.choice=getMessage(obj).choice;
                //   });
                //   $scope.notifications = notifications.data;
                //   console.log($scope.notifications);
                // } else {
                //   console.error('Error in getting notifications');
                // }
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
                  console.log('Group map: ');
                  console.log($scope.groupMap);
                } else {
                  console.error('Error in getting groups');
                }
                if (devices.success) {
                  console.log('Got devices data');
                  console.log(devices.data);    //only things important
                  $scope.devices = devices.data;
                  $scope.deviceMap = {};
                  angular.forEach($scope.devices, function (device) {
                    device.toBindSlave={
                      list:[],
                      state:null
                    };
                    $scope.deviceMap[device.deviceId] = device;
                  });
                } else {
                  console.error('Error in getting devices');
                }
                $scope.notifications=[];
                if(notifications.success){
                  console.log('Got notifications data');
                  console.log(notifications.data);
                  angular.forEach(notifications.data,function(item){
                    NotificationServiceDist.parseMessage(item,$scope,true);
                  });
                }
              })();
              (function () { //module about sidebar
                $scope.sideNavTabs = {
                  app: {
                    name: 'APPLICATION_TITLE',
                    active: true
                  },
                  device: {
                    name: 'DEVICE_TITLE',
                    active: false
                  },
                  // store: {
                  //   name: '商店',
                  //   active: false
                  // },
                  group: {
                    name: 'GROUP_TITLE',
                    active: false
                  },
                  notification: {
                    name: "NOTIFICATION_TITLE",
                    active: false
                  },
                  settings: {
                    name: "SETTINGS_TITLE",
                    active: false
                  }
                };

                $scope.selectSideNavTab = function (tabName) {
                  $timeout(function() {
                    $scope.sideNavTabs.app.active = false;
                    $scope.sideNavTabs.device.active = false;
                   // $scope.sideNavTabs.store.active = false;
                    $scope.sideNavTabs.group.active = false;
                    $scope.sideNavTabs.settings.active = false;
                    $scope.sideNavTabs.notification.active = false;
                    $scope.sideNavTabs[tabName].active = true;
                  }, 0);
                };
                $rootScope.$on("$stateChangeSuccess",function () {
                  var oneLevelStateList=[
                    'main.application.list',
                    'main.device.list',
                    'main.store',
                    'main.group.list',
                    'main.settings',
                    'main.notification'
                  ];
                  var currentState=$state.current.name;
                  function aryIndexOf() {
                    for(var i=0;i<oneLevelStateList.length;i++){
                      if(currentState===oneLevelStateList[i]){
                        return i;
                      }
                    }
                    return -1;
                  }
                  if($rootScope.mobileFlag&&(aryIndexOf()>-1)){
                    $scope.sidebar.css({"transitionDuration":"0.35s"});
                    $scope.sidebarCollapsed = true;
                    $scope.sidebar.css({"left":-300});
                    $scope.mask.css({'opacity':$rootScope.calcuOpacity(-300)});
                  }
                  // else{
                  //   console.log('need not collapse')
                  // }
                });
                $scope.sidebar=$(".sidebar");
                $scope.sidebarCollapsed = true;
                $scope.toggleSidebar = function () { //open
                  if(!$scope.transitionFlag)
                  {
                    $scope.sidebar.css({"transitionDuration":"0.35s"});
                    $scope.transitionFlag=true;
                  }
                  $scope.sidebarCollapsed = false;
                  $scope.sidebar.css({"left":0});
                  $scope.mask.css({'opacity':$rootScope.calcuOpacity(0)});
                };
                $scope.sidebarCollapse=function () {  //close
                  $scope.sidebar.css({"left":-300});
                  $scope.mask.css({'opacity':$rootScope.calcuOpacity(-300)});
                  $scope.sidebarCollapsed = true;
                }
              })()

              $scope.logout = function () {
                $window.location.href = $window.location.protocol + '//' + $window.location.host + "/logout";
              };
            }
          });
    }]);
