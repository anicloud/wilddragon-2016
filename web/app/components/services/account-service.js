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
        });
      },
      getContacts: function () {
        return $http({
          method: 'GET',
          url: '/account/contacts'
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
      avatarUrl: '/images/10101.jpg',
      groups: [
        {
          groupId: 2000,
          owner: 10101,
          name: 'home',
          type: 'CUSTOM',
          accounts: [10101, 10102]
        },
        {
          groupId: 2001,
          owner: 10102,
          name: 'company',
          type: 'CUSTOM',
          accounts: [10101, 10102]
        }
      ]
    };
    var account1 = {
      accountId: 10102,
      email: 'libiya@anicloud.com',
      phoneNumber: '15901505193',
      name: 'libiya',
      address: '#6 yard, East Ave.',
      company: 'anicloud',
      avatarUrl: '/images/10102.jpg',
      groups: [
        {
          groupId: 2000,
          owner: 10101,
          name: 'home',
          type: 'CUSTOM',
          accounts: [10101, 10102]
        },
        {
          groupId: 2001,
          owner: 10102,
          name: 'company',
          type: 'CUSTOM',
          accounts: [10101, 10102]
        }
      ]
    };
    return {
      getAccount: function () {
        return new RetData(true, '', account0);
      },
      getContacts: function () {
        return new RetData(true, '', [account0, account1]);
      }
    };
  })

;
