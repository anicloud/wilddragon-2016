/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.main', ['ui.router','angular-websocket'])

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
              // notifications: function (NotificationService) {
              //   return NotificationService.getAllNotifications();
              // },
              contacts: function (AccountServiceMock) {
                return AccountServiceMock.getContacts();
              },
              groups: function (AccountServiceDist) {
                return AccountServiceDist.getGroups();
              },
              devices: function (DeviceService) {
                return DeviceService.getDevices();
              },
              apps:function (AppServiceDist) {
                return AppServiceDist.getApps();
              }
            },                                                                                   
            controller: function ($rootScope, $scope, $window, $timeout, $state,account,groups,devices,contacts,
                                  AccountServiceDist,WebSocketServiceDist,apps) {
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
                $scope.notifications=[];
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
                    $scope.deviceMap[device.deviceId] = device;
                  });
                } else {
                  console.error('Error in getting devices');
                }
              })();
              // (function () {  //module about websocket
              //   var addAccountIntoGroup=function(groupId,accountId,message){
              //     var account=queryObjectByPropertyValue($scope.contacts,'accountId',accountId)[1]||message.group;
              //     var group=queryObjectByPropertyValue($scope.groups,'groupId',groupId)[1];
              //     if(queryObjectByPropertyValue(group.accounts,'accountId',accountId)){
              //       console.log("account exist in this group");
              //       return;
              //     }
              //     group.accounts.push(account);
              //     console.log("join success");
              //   };
              //   var deleteAccountFromGroup=function (groupId,accountId) {
              //     var account=queryObjectByPropertyValue($scope.contacts,'accountId',accountId)[0];
              //     var group=queryObjectByPropertyValue($scope.groups,'groupId',groupId)[1];
              //     if(!queryObjectByPropertyValue(group.accounts,'accountId',accountId)){
              //       console.log("You can not remove a account not in group");
              //       return;
              //     }
              //     var index=queryObjectByPropertyValue(group.accounts,'accountId',accountId)[0];
              //     group.accounts.splice(index,1);
              //   };
              //   var addGroup=function (newGroup) {
              //     var groupId=queryObjectByPropertyValue($scope.groups,'groupId',newGroup.groupId)
              //     if(!groupId){
              //       //$scope.applyGroupAccounts(newGroup);
              //       $scope.groups.push(newGroup);
              //     }
              //   };
              //   var deleteGroup=function (groupId) {
              //     var groupObj=queryObjectByPropertyValue($scope.groups,'groupId',groupId);
              //     if(!groupObj){console.log("the group is not exist")}
              //     else{
              //       var group=group[1],index=group[0];
              //       $scope.groups.splice(index,1);
              //     }
              //   };
              //   var deleteDevice=function (deviceId) { //as long as run this fun,means device are cannot be seen in the device list
              //     var deviceObj=queryObjectByPropertyValue($scope.groups,'deviceId',deviceId);
              //     if(!deviceObj){console.log("the device is not exist")}
              //     else{
              //       var device=device[1],index=device[0];
              //       $scope.devices.splice(index,1);
              //     }
              //   };
              //   var dealMessage=function (message) { //change data based on type
              //     var type=message.type;
              //     console.log("type",type);
              //     switch (type){
              //       case 'ACCOUNT_GROUP_INVITE':
              //         (function (message) { //be invieted to Group  //done
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
              //           console.log(fromName+" invite you to join the group "+groupName); //dialog
              //         })(message);
              //         break;
              //       case 'ACCOUNT_GROUP_JOIN':
              //         (function (message) { //done
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
              //           //addAccountIntoGroup(groupId,fromId,message);
              //           if(account.accountId===fromId){
              //             addGroup(groupId);
              //           }else {
              //             var oriGroup=queryObjectByPropertyValue($scope.groups,"groupId",groupId)[1];
              //             var newGroup=message.newGroup;
              //             angular.forEach(newGroup,function (value,name,object) {
              //               oriGroup[name]=newGroup[name];
              //             });
              //           }
              //         })(message);
              //         break;
              //       case 'ACCOUNT_GROUP_KICK':  //todo
              //         (function (message) {
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
              //           console.log(fromName+'has been kicked from the group '+groupName);
              //           //now the function is just delete from groups
              //           if(account.accountId===fromId){
              //             deleteGroup(groupId);
              //           }else {
              //             deleteAccountFromGroup(groupId,fromId);
              //           }
              //         })(message);
              //         break;
              //       case 'ACCOUNT_GROUP_REMOVE':
              //         (function (message) {
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
              //           console.log(fromId+' has delete the group '+groupName);
              //           deleteGroup(groupId);
              //         })(message);
              //         break;
              //       case 'ACCOUNT_GROUP_MODIFY':
              //         (function (message) {
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
              //           console.log("The group "+groupName+" has been Modified");
              //           var oriGroup=queryObjectByPropertyValue($rootScope.groups,"groupId",groupId)[1];
              //           var newGroup=message.newGroup;
              //           angular.forEach(newGroup,function (value,name) {
              //             oriGroup[name]=newGroup[name];
              //           });
              //         })(message);
              //         break;
              //       case 'DEVICE_SHARE':   //done
              //         (function (message) {
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName,
              //               deviceId=message.deviceId,deviceName=message.deviceName;
              //           var deviceObj=queryObjectByPropertyValue($scope.devices,"deviceId",deviceId);
              //           if(deviceObj) {
              //             var oriDevice=deviceObj[1],newDevice=message.device;
              //             angular.forEach(newDevice,function (value,name) {
              //               oriDevice[name]=newDevice[name];
              //             });
              //           }else{
              //             $scope.devices.push(message.device);
              //           }
              //         })(message);
              //         break;
              //       case 'DEVICE_UNSHARE':   //done
              //         (function (message) {
              //           var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName,
              //               deviceId=message.deviceId,deviceName=message.deviceName;
              //           //delete the group from the device permissions list
              //           var device=queryObjectByPropertyValue($scope.devices,"deviceId",deviceId)[1];
              //           var permissionIndex=queryObjectByPropertyValue(device.permissions,"groupId",groupId)[0];
              //           device.permissions.splice(permissionIndex,1);
              //           //check whether use has the permission of the device from other group
              //           var existFlag=false;
              //               angular.forEach($scope.devices,function (value) {
              //               if(queryObjectByPropertyValue(value.permissions,'groupId',groupId)){existFlag=true};
              //               })
              //           if(!existFlag) deleteDevice(deviceId);
              //         })(message);
              //         break;
              //       case 'DEVICE_CONNECT':
              //         (function (message) {
              //           var deviceId=message.fromId,deviceName=message.fromName;
              //           console.log("Device "+deviceName+" has been connected");
              //           queryObjectByPropertyValue($scope.devices,"deviceId",deviceId)[1].state="ACTIVE";
              //         })(message);
              //         break;
              //       case 'DEVICE_DISCONNECT':
              //         (function (message) {
              //           var deviceId=message.fromId,deviceName=message.fromName;
              //           console.log("Device "+deviceName+" has been disconnected");
              //           queryObjectByPropertyValue($scope.devices,"deviceId",deviceId)[1].state="INACTIVE";
              //         })(message);
              //         break;
              //       default:
              //         (function () {
              //           console.log('message type is wrong222222');
              //         })();
              //     }
              //     message.body=getMessage(message).body;
              //     if(message.choice) message.body=message.choice;
              //     NotificationServiceDist.popNotification(message.type,message.body);
              //     NotificationService.addNotifications($scope.notifications,message)
              //   };
              //   NotificationServiceDist.connect(dealMessage);
              // })();

              (function () { //module about sidebar
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
                  notification: {
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
                    $scope.sideNavTabs.settings.active = false;
                    $scope.sideNavTabs.notification.active = false;
                    $scope.sideNavTabs[tabName].active = true;
                    // if($rootScope.mobileFlag){
                    //   $scope.sidebar.css({"transitionDuration":"0.35s"});
                    //   $scope.sidebar.css({"left":-300});
                    //   $scope.sidebarCollapsed = true;
                    // }
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
