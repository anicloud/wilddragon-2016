/**
 * Created by zhangdongming on 16-9-16.
 */
var RetData=require('./routes/ret-data');
var accountData=require('./routes/accountData');
var deviceData=require('./routes/deviceData');
// var groupData=require('./routes/');
var socketData=function(){
    var messages={
        groupInvite:function ()  {
            return{
                type:'ACCOUNT_GROUP_INVITE',
                // description:'邀请您入群',
                data:{
                    fromId:10104,
                    fromName:'ye',
                    groupId:2003,
                    groupName:'新建组',
                    detail:accountData().inviteGroup()
                }
            };
        },
        // groupJoin:function () {
        //     return{
        //         type:'ACCOUNT_GROUP_JOIN',
        //         // description:'新人加入通知',
        //         data:{
        //             fromName:accountData().getJoinAccount().name,
        //             fromId:accountData().getJoinAccount().accountId,
        //             groupId:'2003',
        //             groupName:'新建组',
        //             detail:accountData().getAddedGroup(), //2003
        //         }
        //     };
        // },
        groupJoin:function () {
            return{
                type:'ACCOUNT_GROUP_JOIN',
                // description:'新人加入通知',
                data:{
                    fromName:"libiya",
                    fromId:10102,
                    groupId:'2000',
                    groupName:'家庭',
                    detail:accountData().getJoinAccount(),
                }
            };
        },
        // groupKick:function () {
        //     return{
        //         type:'ACCOUNT_GROUP_KICK',
        //         //description:'踢出群通知',
        //         data:{
        //             fromName:'libiya',
        //             fromId:10102,
        //             groupId:'2001',
        //             groupName:'公司',
        //             detail:accountData().getKickAccount(),
        //         }
        //     };
        // },
        groupKick:function () {
            return{
                type:'ACCOUNT_GROUP_KICK',
                //description:'踢出群通知',
                data:{
                    fromName:'libiya',
                    fromId:10102,
                    groupId:'2001',
                    groupName:'公司',
                    detail:accountData().getKickAccount_else(),
                }
            };
        },
        groupRemove:function () {
            return{
                type:'ACCOUNT_GROUP_REMOVE',
                //description:'群移除'
                data:{
                    fromId:'10101',
                    fromName:'anicloud',
                    groupId:2000,
                    groupName:'家庭'
                }
            };
        },
        groupModify:function () {
            return{
                //description:'更改群信息',
                type:'ACCOUNT_GROUP_MODIFY',
                data:{
                    fromId:'10101',
                    fromName:'anicloud',
                    groupId:2000,
                    groupName:'家庭',
                    detail:accountData().getModifiedGroup()
                }
            };
        },
        deviceShare:function () {
            return{
                type:'DEVICE_SHARE',
                //description:'共享设备'
                data:{
                    fromId:'10104', //device
                    fromName:'ye',
                    deviceId:"100002",
                    deviceName:"卧室控制中心",
                    groupId:2000,
                    groupName:'家庭',
                    detail:deviceData().getDevice(1)
                }
            };
        },
        deviceUnShare:function () {
            return{
                type:'DEVICE_UNSHARE',
                //description:'取消设备共享'
                data:{
                    fromId:'10104', //device
                    fromName:'ye',
                    deviceId:"100002",
                    deviceName:"卧室控制中心",
                    groupId:2000,
                    groupName:'家庭',
                    detail:deviceData().getDevice(1)
                }
            };
        },
        deviceConnect:function () {
            return{
                type:'DEVICE_CONNECT',
                //description:'设备连接'
                data:{
                    fromId:'10104', //device
                    fromName:'ye',
                    deviceId:"100002",
                    deviceName:"卧室控制中心",
                    groupId:2000,
                    groupName:'家庭',
                    detail:deviceData().getDevice(1)
                }
            };
        },
        deviceDisconnect:function () {
            return{
                type:'DEVICE_DISCONNECT',
                description:'设备断开连接',
                data:{
                    fromId:'10104', //device
                    fromName:'ye',
                    deviceId:"100002",
                    deviceName:"卧室控制中心",
                    groupId:2000,
                    groupName:'家庭',
                    detail:deviceData().getDevice(1)
                }
            };
        }
    };
    return {
        groupInvite: function () {
            return new RetData(true, '', messages.groupInvite());
        },
        groupJoin: function () {
            return new RetData(true, '', messages.groupJoin());
        },
        groupKick: function () {
            return new RetData(true, '', messages.groupKick());
        },
        groupRemove: function () {
            return new RetData(true, '', messages.groupRemove());
        },
        groupModify: function () {
            return new RetData(true, '', messages.groupModify());
        },
        deviceShare: function () {
            return new RetData(true, '', messages.deviceShare());
        },
        deviceUnShare: function () {
            return new RetData(true, '', messages.deviceUnShare());
        },
        deviceConnect: function () {
            return new RetData(true, '', messages.deviceConnect());
        },
        deviceDisconnect: function () {
            return new RetData(true, '', messages.deviceDisconnect());
        }
    }
};
module.exports=socketData;