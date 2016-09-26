/**
 * Created by zhangdongming on 16-9-6.
 */
var RetData=require('./ret-data');
var accountData=function(){
    var account0 = {
        accountId: 10101,
        email: 'anicloud@anicloud.com',
        phoneNumber: '15210505857',
        name: 'anicloud',
        address: '#6 yard, East Ave.',
        company: 'anicloud',
        avatarUrl: '/images/IMG_5369.JPG'
    };
    var account1 = {
        accountId: 10102,
        email: 'libiya@anicloud.com',
        phoneNumber: '15901505193',
        name: 'libiya',
        address: '#6 yard, East Ave.',
        company: 'anicloud',
        avatarUrl: '/images/1.png'
    };
    var account2 = {
        accountId: 10103,
        email: 'yeh@anicloud.com',
        phoneNumber: '15901505193',
        name: 'yeh',
        address: '#6 yard, East Ave.',
        company: 'anicloud',
        avatarUrl: '/images/2.png'
    };
    var account3 = {
        accountId: 10104,
        email: 'ye@anicloud.com',
        phoneNumber: '15901505193',
        name: 'ye',
        address: '#6 yard, East Ave.',
        company: 'anicloud',
        avatarUrl: '/images/3.jpg'
    };
    var groups = [
        {
            groupId: 2000,
            owner: account0,
            name: '家庭',
            type: 'CUSTOM',
            accounts: [account0,account1,account2]
        },
        {
            groupId: 2001,
            owner: account1,
            name: '公司',
            type: 'CUSTOM',
            accounts: [account0,account1,account3]
        }
    ];
    var accounts=[account0,account1,account2,account3];
    var addedGroup={
        groupId: 2003,
        owner: account3,
        name: '新建组',
        type: 'CUSTOM',
        accounts: [account0, account3]
    };
    var ModifiedGroup={
        groupId: 2000,
        owner: account0,
        name: '家庭改',
        type: 'CUSTOM',
        accounts: [account0,account1,account2]
    };
    var currentIdMax=2001;
    function addGroup(addedGroup,newData,currentIdMax) {
        var group=addedGroup;
        group.groupId=++currentIdMax;
        group.accounts=newData.accounts;
        group.name=newData.name;
        groups.push(group);
        return group;
    }
    return {
        getAccount: function () {
            return new RetData(true, '', account0);
        },
        getContacts: function () {
            return new RetData(true, '', [account1,account2]);
        },
        getGroups: function () {
            return new RetData(true, '', groups);
        },
        queryContacts:function (queryString) {
            var returnArray=[];
            accounts.forEach(function (account) {
                if((account.name.indexOf(queryString)>-1)||(account.email.indexOf(queryString)>-1))
                    returnArray.push(account);
            });
            return new RetData(true, '', returnArray);
        },
        createGroup:function (newData) {
            return new RetData(true,'',addGroup(addedGroup,newData,currentIdMax));
        },
        deleteGroup:function (id) {
            for(let i=0;i<groups.length;i++){
                var group=groups[i];
                if(group.groupId===id){
                    return new RetData(true,'',group);
                }
            }
            return new RetData(true,'',null);
        },
        inviteGroup:function () {
            return new RetData(true,'',addedGroup);
        },
        inviteResult:function (group) {
            return new RetData(true,'',group);
        },
        quitGroup:function (group) {
            return new RetData(true,'',group);
        },
        kickGroup:function () {
            return new RetData(true,'','');
        },
        getJoinAccount:function () {
            return accounts[3];
        },
        getKickAccount:function () {
            return account0;
        },
        getKickAccount_else:function () {
            return account3;
        },
        getAddedGroup:function () {
            return addedGroup;
        },
        getModifiedGroup:function () {
            return ModifiedGroup;
        }
    };
};
module.exports=accountData;