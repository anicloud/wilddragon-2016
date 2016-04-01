/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.account', [])
  .factory('AccountServiceDist', function ($http) {
    return {
      getAccount: function () {
        return $http({
          method: 'GET',
          url: '/account'
        }).then(function (response) {
          return response.data;
        });
      },
      getAccountLike: function (query) {
        return $http({
          method: 'GET',
          url: '/account/query/' + query
        }).then(function (response) {
          return response.data;
        });
      },
      getContacts: function () {
        return $http({
          method: 'GET',
          url: '/account/contacts'
        }).then(function (response) {
          return response.data;
        });
      },
      getGroups: function () {
        return $http({
          method: 'GET',
          url: '/group/all'
        }).then(function (response) {
          return response.data;
        });
      },
      createGroup: function (data) {
        return $http({
          method: 'POST',
          url: '/group/create',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      deleteGroup: function (data) {
        return $http({
          method: 'POST',
          url: '/group/delete',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      inviteAccount: function (data) {
        return $http({
          method: 'PUT',
          url: '/group/invite',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      joinGroup: function (data) {
        return $http({
          method: 'PUT',
          url: '/group/join',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      quitGroup: function (data) {
        return $http({
          method: 'PUT',
          url: '/group/quit',
          data: data
        }).then(function (response) {
          return response.data;
        });
      }
    };
  })

  .factory('AccountService', function ($rootScope, $http) {
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
      avatarUrl: '/images/IMG_5369.JPG'
    };
    var groups = [
      {
        groupId: 2000,
        owner: 10101,
        name: 'home',
        type: 'CUSTOM',
        accounts: [account0, account1]
      },
      {
        groupId: 2001,
        owner: 10102,
        name: 'company',
        type: 'CUSTOM',
        accounts: [account0, account1]
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

;
