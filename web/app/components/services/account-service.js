/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.account', [])
    
  .factory('AccountServiceDist', function ($http) {
    var urlIp='';
    return {
      getAccount: function () {  //finish
        return $http({
          method: 'GET',
          url: urlIp+'/account'
        }).then(function (response) {
          return response.data;
        });
      },
      getAccountLike: function (query) { //finish
        return $http({
          method: 'GET',
          url: urlIp+'/account/query/' + query
        }).then(function (response) {
          console.log(response);
          return response.data;
        });
      },
      getContacts: function () {   //finish
        return $http({
          method: 'GET',
          url: urlIp+'/account/contacts'
        }).then(function (response) {
          return response.data;
        });
      },
      getGroups: function () { //finish
        return $http({
          method: 'GET',
          url: urlIp+'/group/all'
        }).then(function (response) {
           return response.data;
        });
      },
      createGroup: function (data) { //finish
        return $http({
          method: 'POST',
          url: urlIp+'/group/create',
          data: data
        }).then(function (response) {
           return response.data;
        });
      },
      deleteGroup: function (data) { //finish
        return $http({
          method: 'POST',
          url: urlIp+'/group/delete',
          data: data
        }).then(function (response) {
           return response.data;
        });
      },
      inviteAccount: function (data) { //finish
        return $http({
          method: 'POST',
          url: urlIp+'/group/invite',
          data: data
        }).then(function (response) {
          console.log(response);
           return response.data;
        });
      },
      inviteResult:function (data) { //accept or refuse invite
        return $http({
          method: 'POST',
          url: urlIp+'/group/invite',
          data: data
        }).then(function (response) {
          console.log(response);
          return response.data;
        });
      },
      // joinGroup: function (data) {  //waiting for websocket
      //   return $http({
      //     method: 'PUT',
      //     url: urlIp+'/group/join',
      //     data: data
      //   }).then(function (response) {
      //      return response.data;
      //   });
      // },
      quitGroup: function (data) {  //finish
        return $http({
          method: 'POST',
          url: urlIp+'/group/quit',
          data: data
        }).then(function (response) {
          console.log(response);
           return response.data;
        });
      },
      kickGroup:function (data) {
        return $http({
          method: 'POST',
          url: urlIp+'/group/kick',
          data: data  //group
        }).then(function (response) {
          console.log(response);
          return response.data;
        });
      }
    };
  })

  .factory('AccountServiceMock', function ($http) {
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
        owner: 10101,
        name: '家庭',
        type: 'CUSTOM',
        accounts: [account1, account3,account2]
      },
      {
        groupId: 2001,
        owner: 10102,
        name: '公司',
        type: 'CUSTOM',
        accounts: [account0, account3]
      }
    ];

    return {
      getAccount: function () {
        return new RetData(true, '', account0);
      },
      getContacts: function () {
        return new RetData(true, '', [account0, account1]);
      },
      getGroups: function () {
        return new RetData(true, '', groups);
      }
    };
  })


    .factory('AccountService', function ($http) {
      var accounts=[
        {
          accountId: 10101,
          email: 'anicloud@anicloud.com',
          phoneNumber: '15210505857',
          name: 'anicloud',
          address: '#6 yard, East Ave.',
          company: 'anicloud',
          avatarUrl: '/images/IMG_5369.JPG'
        },
        {
          accountId: 10102,
          email: 'libiya@anicloud.com',
          phoneNumber: '15901505193',
          name: 'libiya',
          address: '#6 yard, East Ave.',
          company: 'anicloud',
          avatarUrl: '/images/1.png'
        },
        {
          accountId: 10103,
          email: 'yeh@anicloud.com',
          phoneNumber: '15901505193',
          name: 'yeh',
          address: '#6 yard, East Ave.',
          company: 'anicloud',
          avatarUrl: '/images/2.png'
        },
        {
          accountId: 10104,
          email: 'ye@anicloud.com',
          phoneNumber: '15901505193',
          name: 'ye',
          address: '#6 yard, East Ave.',
          company: 'anicloud',
          avatarUrl: '/images/3.jpg'
        }
      ];
      var groups = [
        {
          groupId: 2000,
          owner: 10101,
          name: '家庭',
          type: 'CUSTOM',
          accounts:[accounts[0],accounts[3],accounts[2]]
        },
        {
          groupId: 2001,
          owner: 10102,
          name: '公司',
          type: 'CUSTOM',
          accounts:[accounts[0],accounts[3]]
        }
      ];
      return {
        getAccount: function () {
          return new RetData(true, '',accounts[0]);
        },
        getContacts: function () {
          return new RetData(true, '', accounts);
        },
        getGroups: function () {
          return new RetData(true, '', groups);
        },
        getAccountLike:function () {
          return accounts;
        }
      };
    })
;
