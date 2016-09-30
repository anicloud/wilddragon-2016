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
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.fromId,fromName=message.data.fromName;
                      var body=fromName+" invite you to join the group "+groupName;
                      var choice=["同意","拒绝"],type=message.type;
                      var description="邀请入群通知";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_JOIN':
                  (function (message) { //be invieted to Group
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=fromName+" has join the group "+groupName;
                      var choice=[],type=message.type;
                      var description="新人入群通知";
                      if(fromId==mainScope.account.accountId){
                          mainScope.groupMap[groupId]=message.data.detail;
                          mainScope.groups.push(message.data.detail);
                      }else{
                          var account=message.data.detail;
                          mainScope.groupMap[groupId].push(account);
                          mainScope.accountMap[fromId]=account;
                      }
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_KICK':
                  (function (message) { //be invieted to Group
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var getId=message.data.detail.accountId,getName=message.data.detail.name;
                      var body=getName+" has been kicked from the group "+groupName+" by "+fromName;
                      var choice=[],type=message.type;
                      var description="移除群成员";
                      if(getId==mainScope.account.accountId){
                          body="you has been kicked from the group "+groupName+" by "+fromName;
                          delete mainScope.groupMap[groupId];
                          index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                              mainScope.groups.splice(index,1);
                      }else{
                          console.log('getId',getId);
                          var account=queryObjectByPropertyValue(mainScope.groupMap[groupId].accounts,'accountId',getId)[1];
                          console.log('account',account);
                          var index=mainScope.groupMap[groupId].accounts.indexOf(account);
                          console.log(index,mainScope.groupMap[groupId].accounts)
                          mainScope.groupMap[groupId].accounts.splice(index,1);
                      }
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_QUIT':
                  (function (message) { //be invieted to Group
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var getId=message.data.detail.accountId,getName=message.data.detail.name;
                      var body=getName+" has quit the group "+groupName;
                      var choice=[],type=message.type;
                      var description="移除群成员";
                      if(getId==mainScope.account.accountId){
                          body="you has quit the group "+groupName+" successfully ";
                          delete mainScope.groupMap[groupId];
                          index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                          mainScope.groups.splice(index,1);
                      }else{
                          console.log('getId',getId);
                          var account=queryObjectByPropertyValue(mainScope.groupMap[groupId].accounts,'accountId',getId)[1];
                          console.log('account',account);
                          var index=mainScope.groupMap[groupId].accounts.indexOf(account);
                          console.log(index,mainScope.groupMap[groupId].accounts);
                          mainScope.groupMap[groupId].accounts.splice(index,1);
                      }
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_REMOVE':
                  (function(message) {
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=fromName+" has removed the group "+groupName;
                      var choice=[],type=message.type;
                      var description="群移除通知";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                      delete mainScope.groupMap[groupId];
                      var index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                      mainScope.groups.splice(index,1);
                  })(message);
                  break;
              case 'ACCOUNT_GROUP_MODIFY':
                  (function(message) {
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=fromName+" has modify the group "+groupName;
                      var choice=[],type=message.type;
                      var description="群信息修改";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                      mainScope.groupMap[groupId]=message.data.detail;
                      var index=queryObjectByPropertyValue(mainScope.groups,'groupId',groupId)[0];
                      mainScope.groups[index]=message.data.detail;
                  })(message);
                  break;
              case 'DEVICE_SHARE':
                  (function (message) { //be invieted to Group
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=mainScope.accountMap[message.data.detail.owner].name+" has shared the device "+message.data.deviceName+" to the Group "+groupName;
                      var choice=[],type=message.type;
                      var description='设备共享通知';
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                      if(!mainScope.deviceMap[message.data.detail.deviceId]){
                          mainScope.devices.push(message.data.detail);
                      }
                      mainScope.deviceMap[fromId]=message.data.detail;
                  })(message);
                  break;
              case 'DEVICE_UNSHARE':
                  (function (message) { //be invieted to Group
                      var groupId=message.data.groupId,groupName=message.data.groupName,fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=mainScope.accountMap[mainScope.deviceMap[fromId].owner].name+" has canceled sharing the device "+message.data.deviceName+" to the Group "+groupName;
                      var choice=[],type=message.type;
                      var description="设备取消共享通知";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
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
                      if(!sharedFlag&&fromId!==mainScope.account.accountId){
                          delete mainScope.deviceMap[message.data.detail.deviceId];
                          var index=queryObjectByPropertyValue(mainScope.devices,'deviceId',message.data.detail.deviceId)[0];
                          mainScope.devices.splice(index,1);
                      }
                  })(message);
                  break;
              case 'DEVICE_CONNECT':
                  (function (message) { //be invieted to Group
                      var fromId=message.data.fromId,fromName=message.data.fromName;
                      var body=mainScope.deviceMap[fromId].name+" has connected ";
                      var choice=[],type=message.type;
                      var description="设备连接通知";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
                      mainScope.deviceMap[fromId].state='ACTIVE';
                  })(message);
                  break;
              case 'DEVICE_DISCONNECT':
                  (function (message) { //be invieted to Group
                      var fromId=message.fromId,fromName=message.fromName;
                      var body=mainScope.deviceMap[fromId].name+" has disconnected ";
                      var choice=[],type=message.type;
                      var description="设备离线通知";
                      notificationCol=new NotificationCollection(type,body,choice,fromId,description,fromName,groupId,groupName);
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
