/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

angular.module('app.service.device', [])
  .factory('DeviceServiceDist', function ($http) {
    return {
      getDevices: function () {
        console.log('Getting devices');
        return $http({
          method: 'GET',
          url: 'devices/all'
        });
      }
    };
  })
  .factory('DeviceService', function ($http) {
    var device0 = {
      physicalId: 's011110',
      physicalAddress: '00-01-6C-06-A6-29',
      name: 'home-center',
      description: 'home controller center',
      functions: [
        {functionId: 1, groupId: 1},
        {functionId: 2, groupId: 2}
      ],
      owner: 10101,
      accountGroups: [2000, 2001],
      state: 'ACTIVE',
      deviceId: 100001,
      slaves: [
        {
          physicalId: 'a00001',
          physicalAddress: '',
          name: 'kitchen light',
          description: 'A light in kitchen',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 1,
          masterId: 100001
        },
        {
          physicalId: 'a00002',
          physicalAddress: '',
          name: 'bedroom light',
          description: 'A light in bedroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'INACTIVE',
          deviceId: 2,
          masterId: 100001
        }
      ]
    };
    var device1 = {
      physicalId: 's011110',
      physicalAddress: 'CC-01-6C-06-b6-29',
      name: 'home-center2',
      description: 'home controller center',
      functions: [
        {functionId: 1, groupId: 1},
        {functionId: 2, groupId: 2}
      ],
      owner: 10101,
      accountGroups: [2000, 2001],
      state: 'ACTIVE',
      deviceId: 100002,
      slaves: [
        {
          physicalId: 'a00001',
          physicalAddress: '',
          name: 'kitchen light',
          description: 'A light in kitchen',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 1,
          masterId: 100002
        },
        {
          physicalId: 'a00002',
          physicalAddress: '',
          name: 'bedroom light',
          description: 'A light in bedroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'INACTIVE',
          deviceId: 2,
          masterId: 100002
        }
      ]
    };
    var device2 = {
      physicalId: 's011111',
      physicalAddress: 'A6-29-00-01-6C-06',
      name: 'company-center',
      description: 'company controller center',
      functions: [
        {functionId: 1, groupId: 1},
        {functionId: 2, groupId: 1}
      ],
      owner: 10102,
      accountGroups: [2000],
      state: 'ACTIVE',
      deviceId: 100003,
      slaves: [
        {
          physicalId: 'b00001',
          physicalAddress: '',
          name: 'meeting room light',
          description: 'A light in meeting room',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 1,
          masterId: 100003
        },
        {
          physicalId: 'b00002',
          physicalAddress: '',
          name: 'restroom coffee boiler',
          description: 'A coffee boiler in restroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 2,
          masterId: 100003
        }
      ]
    };
    var device3 = {
      physicalId: 's011111',
      physicalAddress: 'A6-29-00-01-6C-06',
      name: 'company-center',
      description: 'company controller center',
      functions: [
        {functionId: 1, groupId: 1},
        {functionId: 2, groupId: 1}
      ],
      owner: 10102,
      accountGroups: [2000],
      state: 'ACTIVE',
      deviceId: 100004,
      slaves: [
        {
          physicalId: 'b00001',
          physicalAddress: '',
          name: 'meeting room light',
          description: 'A light in meeting room',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 1,
          masterId: 100004
        },
        {
          physicalId: 'b00002',
          physicalAddress: '',
          name: 'restroom coffee boiler',
          description: 'A coffee boiler in restroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 2,
          masterId: 100004
        }
      ]
    };
    return {
      getDevices: function () {
        return new RetData(true, '', [device0, device1, device2, device3]);
      }
    };
  });


