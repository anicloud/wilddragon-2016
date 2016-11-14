/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.notification', [])
    .factory('NotificationServiceDist', function (DeviceService, AccountService, $state,$http,$translate) {
        var parseMessage = function (message, mainScope,initFlag) { //packmessage as a obj to add in
            var notificationCol = null;
            switch (message.type) {
                case 'ACCOUNT_GROUP_INVITE':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var body = fromName + " invite you to join the group " + groupName;
                        var choice = ["OK", "NO"], type = message.type;
                        var description = "MESSAGE_TITLE_ACCOUNT_GROUP_INVITE";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_REFUSE':
                    (function (message) { //refuse to join the group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var body = fromName + " refused to join the group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_TITLE_ACCOUNT_GROUP_REFUSE";
                        console.log(groupId, mainScope.groupMap, mainScope.groups, message.data.detail);
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_JOIN':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var body=null;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_TITLE_ACCOUNT_GROUP_JOIN";
                        console.log(groupId, mainScope.groupMap, mainScope.groups, message.data.detail);
                        if (fromId == mainScope.account.accountId) {
                            mainScope.groupMap[groupId] = message.data.detail;
                            mainScope.groups.push(message.data.detail);
                        } else {
                            var account = message.data.detail;
                            mainScope.groupMap[groupId].accounts.push(account);
                            mainScope.accountMap[fromId] = account;
                        }
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_KICK':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var getId = message.data.detail.accountId, fromName = message.data.detail.name; //it should be getName ,do it for i18n
                        var body = fromName + " has been kicked from the group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_ACCOUNT_GROUP_KICK";
                        if (getId == mainScope.account.accountId) {
                            // body = "you has been kicked from the group " + groupName + " by " + fromName;
                            delete mainScope.groupMap[groupId];
                            index = queryObjectByPropertyValue(mainScope.groups, 'groupId', groupId)[0];
                            mainScope.groups.splice(index, 1);
                        } else {
                            console.log('getId', getId);
                            var account = queryObjectByPropertyValue(mainScope.groupMap[groupId].accounts, 'accountId', getId)[1];
                            console.log('account', account);
                            var index = mainScope.groupMap[groupId].accounts.indexOf(account);
                            console.log(index, mainScope.groupMap[groupId].accounts)
                            mainScope.groupMap[groupId].accounts.splice(index, 1);
                        }
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_QUIT':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var getId = message.data.detail.accountId, fromName = message.data.detail.name;
                        var body = fromName + " has quit the group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_ACCOUNT_GROUP_QUIT";
                        if (getId == mainScope.account.accountId) {
                            body = "you has quit the group " + groupName + " successfully ";
                            delete mainScope.groupMap[groupId];
                            index = queryObjectByPropertyValue(mainScope.groups, 'groupId', groupId)[0];
                            mainScope.groups.splice(index, 1);
                        } else {
                            console.log('getId', getId);
                            var account = queryObjectByPropertyValue(mainScope.groupMap[groupId].accounts, 'accountId', getId)[1];
                            console.log('account', account);
                            var index = mainScope.groupMap[groupId].accounts.indexOf(account);
                            console.log(index, mainScope.groupMap[groupId].accounts);
                            mainScope.groupMap[groupId].accounts.splice(index, 1);
                        }
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_REMOVE':
                    (function (message) {
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var body = fromName + " has removed the group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_ACCOUNT_GROUP_REMOVE";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                        delete mainScope.groupMap[groupId];
                        var index = queryObjectByPropertyValue(mainScope.groups, 'groupId', groupId)[0];
                        mainScope.groups.splice(index, 1);
                    })(message);
                    break;
                case 'ACCOUNT_GROUP_MODIFY':
                    (function (message) {
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = message.data.fromName;
                        var body = fromName + " has modify the group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_ACCOUNT_GROUP_MODIFY";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                        mainScope.groupMap[groupId] = message.data.detail;
                        var index = queryObjectByPropertyValue(mainScope.groups, 'groupId', groupId)[0];
                        mainScope.groups[index] = message.data.detail;
                    })(message);
                    break;
                case 'DEVICE_SHARE':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = mainScope.accountMap[message.data.detail.owner].name;
                        //ok for i18n
                        var deviceName=message.data.deviceName;
                        var body = fromName + " has shared the device " + message.data.deviceName + " to the Group " + groupName;
                        var choice = [], type = message.type;
                        var description = 'MESSAGE_DEVICE_SHARE';
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName,deviceName);
                        if (!mainScope.deviceMap[message.data.detail.deviceId]) {
                            mainScope.devices.push(message.data.detail);
                        }
                        mainScope.deviceMap[fromId] = message.data.detail;
                    })(message);
                    break;
                case 'DEVICE_UNSHARE':
                    (function (message) { //be invieted to Group
                        var groupId = message.data.groupId, groupName = message.data.groupName, fromId = message.data.fromId, fromName = mainScope.accountMap[mainScope.deviceMap[fromId].owner].name;
                        var deviceName=message.data.deviceName;
                        var body = fromName + " has canceled sharing the device " + deviceName + " to the Group " + groupName;
                        var choice = [], type = message.type;
                        var description = "MESSAGE_DEVICE_UNSHARE";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName,deviceName);
                        //looking for whether devices is still be shared
                        var deviceGroup = mainScope.deviceMap[fromId].accountGroups;
                        deviceGroup.splice(deviceGroup.indexOf(fromId), 1);
                        var permissionIndex = queryObjectByPropertyValue(mainScope.deviceMap[fromId].permissions, 'groupId', groupId)[0];
                        mainScope.deviceMap[fromId].permissions.splice(permissionIndex, 1);
                        var sharedFlag = false;
                        mainScope.groups.forEach(function (value, index) {
                            var groupIdCheck = value.groupId;
                            if (deviceGroup.indexOf(groupIdCheck) > -1) {
                                sharedFlag = true;
                            }
                        });
                        if (!sharedFlag && fromId !== mainScope.account.accountId) {
                            delete mainScope.deviceMap[message.data.detail.deviceId];
                            var index = queryObjectByPropertyValue(mainScope.devices, 'deviceId', message.data.detail.deviceId)[0];
                            mainScope.devices.splice(index, 1);
                        }
                    })(message);
                    break;
                case 'DEVICE_CONNECT':
                    (function (message) { //be invieted to Group
                        var fromId = message.data.fromId, fromName = mainScope.deviceMap[fromId].name;
                        var body = fromName + " was connected ";
                        var choice = [], type = message.type;
                        var description = "MESSAGE_TITLE_DEVICE_CONNECT";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                        mainScope.deviceMap[fromId].state = 'ACTIVE';
                    })(message);
                    break;
                case 'DEVICE_DISCONNECT':
                    (function (message) { //be invieted to Group
                        var fromId = message.fromId, fromName = mainScope.deviceMap[fromId].name;
                        var body = fromName + " was disconnected ";
                        var choice = [], type = message.type;
                        var description = "MESSAGE_TITLE_DEVICE_DISCONNECT";
                        notificationCol = new NotificationCollection(type, body, choice, fromId, description, fromName, groupId, groupName);
                        mainScope.deviceMap[fromId].state = 'INACTIVE';
                    })(message);
                    break;
            }
            console.log(notificationCol);
            $translate("MESSAGE_"+notificationCol.type,notificationCol).then(function (body) {
                notificationCol.body=body;
            },function (err) {
                console.log("body err",err);
            }).then(function () {
                $translate(notificationCol.description).then(function (description) {
                    notificationCol.description=description;
                    console.log("body",notificationCol);
                    popNotification(notificationCol.description, notificationCol.body);
                    mainScope.notifications.push(notificationCol);
                },function (err) {
                    console.log("not err",err);
                });
            });
        };

        function popNotification(title, body) { //"/images/notifications.png"
            toastr.options.onclick = function () {
                $state.go('main.notification');
            };
            toastr.info(body, title);
        }
        var slaveManagement=function (message,mainScope) {
            switch (message.type){
                case 'DEVICE_SLAVE_BIND':
                    !function (message) {
                        var data=message.data;
                        var toBindDevice=mainScope.deviceMap[message.data.deviceId].toBindSlave;
                        console.log("toBindDevice",toBindDevice);
                       // toBindDevice.list=data.detail;
                       // angular.copy(data.detail,toBindDevice.list);
                            data.detail.forEach(function (item,index) {
                                toBindDevice.list[index]=item;
                            });
                        toBindDevice.state='bindSelecting';
                        if($('#salveBindPanel').length>0) angular.element("#salveBindPanel").scope().$apply();
                    }(message);
                    break;
                case 'DEVICE_SLAVE_BIND_RESULT':
                    !function (message) {
                        var data=message.data;
                        var device=mainScope.deviceMap[message.data.deviceId];
                        // toBindDevice.list=data.detail;
                        // angular.copy(data.detail,toBindDevice.list);
                        data.detail.forEach(function (item,index) {
                            device.slaves.push(item);
                        });
                        device.toBindSlave.state='bindEnd';
                        if($('#salveBindPanel').length>0) angular.element("#salveBindPanel").scope().$apply();
                    }(message);
                    break;
                case 'DEVICE_SLAVE_UNBIND':
                    !function (message) {
                        console.log();
                        console.log();
                    }(message);
                    break;
            }
        };
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
            getInvitations: function () {
                return $http({
                    method:'GET',
                    url:'group/invitation'
                }).then(function(response){
                    return response.data;
                })
            },
            parseMessage: parseMessage,
            slaveManagement:slaveManagement
        };
    })
    .factory('NotificationManager', function ($http, $websocket) {
        var notifications = [
            {
                type: "ACCOUNT_GROUP_INVITE",
                groupId: '2000',
                groupName: '家庭',
                owner: '10101',
                fromId: '10101',
                fromName: 'anicloud'
            },
            {
                type: "ACCOUNT_GROUP_JOIN",
                groupId: '2001',
                groupName: '公司',
                owner: '10102',
                fromId: '10102',
                fromName: 'libiya'
            }
        ];
        return {
            getAllNotifications: function () {
                //console.log(NotificationServiceDist.connect());
                return new RetData(true, '', notifications);
            },
            addNotification: function (list, message) {
                list.push(message);
            },
            deleteNotification: function (list, message) {
                var index = Array.prototype.indexOf(list, message);
                list.splice(index, 1);
            }
        };
    });
