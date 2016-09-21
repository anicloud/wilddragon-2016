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
                fromId:10102,
                fromName:'anicloud',
                groupId:2003,
                groupName:'新建组',
                description:'邀请您入群'
            };
        },
        groupJoin:function () {
            return{
                type:'ACCOUNT_GROUP_JOIN',
                fromName:accountData().getJoinAccount().name,
                fromId:accountData().getJoinAccount().accountId,
                groupId:'2003',
                groupName:'新建组',
                group:accountData().getAddedGroup(),
                account:accountData().getJoinAccount(),
                description:'新人加入通知'
            };
        },
        groupKick:function () {
            return{
                type:'ACCOUNT_GROUP_KICK',
                fromName:accountData().getKickAccount().name,
                fromId:accountData().getKickAccount().accountId,
                groupId:'2001',
                groupName:'公司',
                account:accountData().getKickAccount(),
                description:'踢出群通知'
            };
        },
        groupRemove:function () {
            return{
                type:'ACCOUNT_GROUP_REMOVE',
                fromId:'10101',
                fromName:'anicloud',
                groupId:2000,
                groupName:'家庭',
                description:'群移除'
            };
        },
        groupModify:function () {
            return{
                type:'ACCOUNT_GROUP_MODIFY',
                fromId:accountData().getJoinAccount().accountId,
                fromName:accountData().getJoinAccount().name,
                groupId:2000,
                groupName:'家庭',
                group:accountData().getModifiedGroup(),
                description:'更改群信息'
            };
        },
        deviceShare:function () {
            return{
                type:'DEVICE_SHARE',
                fromId:'100002', //device
                fromName:'卧室控制中心',
                groupId:2000,
                groupName:'家庭',
                device:deviceData().getDevice(1),
                description:'共享设备'
            };
        },
        deviceUnShare:function () {
            return{
                type:'DEVICE_UNSHARE',
                fromId:'100002',
                fromName:'卧室控制中心',
                groupId:2000,
                groupName:'家庭',
                description:'取消设备共享'
            };
        },
        deviceConnect:function () {
            return{
                type:'DEVICE_CONNECT',
                fromId:'2001',
                fromName:'zhangdongming',
                groupId:1000,
                groupName:'群组1',
                description:'入群申请'
            };
        },
        deviceDisconnect:function () {
            return{
                type:'DEVICE_DISCONNECT',
                fromId:'2001',
                fromName:'zhangdongming',
                groupId:1000,
                groupName:'群组1',
                description:'入群申请'
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