/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.notification', [])
  .factory('NotificationServiceDist', function (DeviceService,AccountService,$state) {
      var parseMessage=function (message,mainScope) { //packmessage as a obj to add in
          var notificationCol=null;
          switch (message.type){
              case 'ACCOUNT_GROUP_INVITE':
                  (function (message) { //be invieted to Group
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=fromName+" invite you to join the group "+groupName;
                      var choice=["同意","拒绝"],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_JOIN':
                  (function (message) { //be invieted to Group
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=fromName+" has join the group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      if(fromId==mainScope.account.accountId){
                          mainScope.groupMap[groupId]=message.group;
                          mainScope.groups.push(message.group);
                      }else{
                          var account=message.account;
                          mainScope.groupMap[groupId].accounts.push(account); 
                      }
                      mainScope.accountMap[fromId]=queryObjectByPropertyValue(message.group.accounts,'accountId',fromId)[1];
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_KICK':
                  (function (message) { //be invieted to Group
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=fromName+" has been kicked from the group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      var account=message.account;
                      if(fromId==mainScope.account.accountId){
                          delete mainScope.groupMap[groupId];
                          index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                              mainScope.groups.splice(index,1);
                      }else{
                          var index=mainScope.groupMap[groupId].accounts.indexOf(account);
                          mainScope.groupMap[groupId].accounts.splice(index);
                      }
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_REMOVE':
                  (function(message) {
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=fromName+" has removed the group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      delete mainScope.groupMap[groupId];
                      var index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                      mainScope.groups.splice(index,1);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_MODIFY':
                  (function(message) {
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=fromName+" has modify the group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      mainScope.groupMap[groupId]=message.group;
                      var index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                      mainScope.groups[index]=message.group;
                  })(message);
                  break;
              case 'DEVICE_SHARE':
                  (function (message) { //be invieted to Group
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=mainScope.accountMap[message.device.owner].name+" has shared the device "+fromName+"for the Group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      if(!mainScope.deviceMap[fromId]){
                          mainScope.devices.push(message.device);
                      }
                      mainScope.deviceMap[fromId]=message.device;
                  })(message);
                  break;
              case 'DEVICE_UNSHARE':
                  (function (message) { //be invieted to Group
                      var groupId=message.groupId,groupName=message.groupName,fromId=message.fromId,fromName=message.fromName;
                      var body=mainScope.accountMap[mainScope.deviceMap[fromId].owner].name+" has cancel sharing the device "+fromName+"for the Group "+groupName;
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      //looking for whether devices is still be shared
                      var deviceGroup=mainScope.deviceMap[fromId].accountGroups;
                      deviceGroup.splice(deviceGroup.indexOf(fromId),1);
                      var permissionIndex=queryObjectByPropertyValue(mainScope.deviceMap[fromId].permissions,'groupId',groupId)[0];
                      mainScope.deviceMap[fromId].permissions.splice(permissionIndex,1);
                      var sharedFlag=false;
                      mainScope.groups.forEach(function (value,index) {
                          var groupIdCheck=value.groupId;
                          if(deviceGroup.indexOf(groupIdCheck)>-1){
                              sharedFlag=true;
                          }
                      });
                      if(!sharedFlag){
                          delete mainScope.deviceMap[fromId];
                          var index=queryObjectByPropertyValue(mainScope.devices,'deviceId',fromId)[0];
                      }
                      mainScope.devices.splice(index,1);
                  })(message);
                  break;
              case 'DEVICE_CONNECT':
                  (function (message) { //be invieted to Group
                      var fromId=message.fromId,fromName=message.fromName;
                      var body=mainScope.deviceMap[fromId].name+" has connected ";
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      mainScope.deviceMap[fromId].state='ACTIVE';
                  })(message);
                  break;
              case 'DEVICE_DISCONNECT':
                  (function (message) { //be invieted to Group
                      var fromId=message.fromId,fromName=message.fromName;
                      var body=mainScope.deviceMap[fromId].name+" has disconnected ";
                      var choice=[],type=message.type;
                      notificationCol=new NotificationCollection(type,body,choice,fromId,message.description,fromName,groupId,groupName);
                      mainScope.deviceMap[fromId].state='INACTIVE';
                  })(message);
                  break;
          }
          console.log(notificationCol);
          popNotification(notificationCol.description,notificationCol.body);
          mainScope.notifications.push(notificationCol);
          mainScope.$apply(); //^_^
      };
      function popNotification(title,body) { //"/images/notifications.png"
          toastr.options.onclick = function() { $state.go('main.notification');};
          toastr.info(body,title);
      }
    return {
      // getAllNotifications: $http({
      //   method: 'GET',
      //   url: '/notification/all'
      // }),
      // getWebSocket: $http({
      //   method: 'GET',
      //   url: '/notification/websocket'
      // }),
      // connect: $websocket.$new({
      //   url: 'ws://localhost:8000/notification/websocket',
      //   reconnect: true
      // })
        parseMessage:parseMessage
    };
  })
  .factory('NotificationManager', function ($http, $websocket) {
      var notifications = [
          {
              type:"ACCOUNT_GROUP_INVITE",
              groupId: '2000',
              groupName: '家庭',
              owner:'10101',
              fromId: '10101',
              fromName: 'anicloud'
          },
          {
              type:"ACCOUNT_GROUP_JOIN",
              groupId: '2001',
              groupName: '公司',
              owner:'10102',
              fromId: '10102',
              fromName: 'libiya'
          }
      ];
    return {
      getAllNotifications: function () {
        //console.log(NotificationServiceDist.connect());
        return new RetData(true, '', notifications);
      },
        addNotification:function (list,message) {
            list.push(message);
        },
        deleteNotification:function (list,message) {
            var index=Array.prototype.indexOf(list,message);
            list.splice(index,1);
        }
    };
  });
