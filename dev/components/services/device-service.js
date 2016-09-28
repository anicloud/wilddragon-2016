/**
 * Created by huangbin on 12/29/15.
 */
'use strict';
angular.module('app.service.device', [])
  .factory('DeviceService', function ($http) {
    return {
      getDevices: function () {
        console.log('Getting devices');
        return $http({
          method: 'GET',
          url: 'device/all'
        }).then(function (response) {
          return response.data;
        });
      },
      bindDevice: function (data) {
        console.log('Binding device: ', data);
        return $http({
          method: 'POST',
          url: 'device/bind',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      unbindDevice: function (data) {
        console.log('Unbinding device: ', data);
        return $http({
          method: 'POST',
          url: 'device/unbind',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      shareDevice: function (data) {
        console.log('Sharing device: ', data);
        return $http({
          method: 'POST',
          url: 'device/share',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      unShareDevice: function (data) {
        console.log('unsharing device: ', data);
        return $http({
          method: 'POST',
          url: 'device/unshare',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      modifyDevice:function (data) {
        console.log('modify device: ', data);
        return $http({
          method: 'POST',
          url: 'device/modify',
          data: data
        }).then(function (response) {
          return response.data;
        });
      },
      getSlaveFunctions: function (masterId, slaveId) {
        console.log('getting slave functions: ', masterId, slaveId);
        return $http({
          method: 'GET',
          url: 'device/function/' + masterId + '/' + slaveId
        }).then(function (response) {
          return response.data;
        });
      },
      getMasterFunctions: function (masterId) {
        console.log('getting master functions: ', masterId);
        return $http({
          method: 'GET',
          url: 'device/function/' + masterId
        }).then(function (response) {
          return response.data;
        });
      }
    };
  })
  .factory('DeviceServiceMock', function ($http) {
    var device0 = {
      avatarUrl: '/images/Washing_machine.svg',
      physicalId: 's011110',
      physicalAddress: '00-01-6C-06-A6-29',
      name: '家庭控制中心',
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
          name: '空气净化器',
          description: '',
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
          name: '客厅空调',
          description: '',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'INACTIVE',
          deviceId: 2,
          masterId: 100001
        }
      ],
      permissions: [
        {
          groupId: 2000,
          types: ['READABLE', 'EXECUTABLE']
        },
        {
          groupId: 2001,
          types: ['READABLE', 'WRITABLE']
        }
      ]
    };
    var device1 = {
      avatarUrl: '/images/microwave.svg',
      physicalId: 's011110',
      physicalAddress: 'CC-01-6C-06-b6-29',
      name: '卧室控制中心',
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
          name: '卧室主灯',
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
          name: '卧室空调',
          description: 'A light in bedroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'INACTIVE',
          deviceId: 2,
          masterId: 100002
        }
      ],
      permissions: [
        {
          groupId: 2000,
          types: ['READABLE', 'EXECUTABLE']
        }
      ]
    };
    var device2 = {
      avatarUrl: '/images/Fan.svg',
      physicalId: 's011111',
      physicalAddress: 'A6-29-00-01-6C-06',
      name: '公司控制中心',
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
          name: '会议室台灯',
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
          name: '休息室咖啡机',
          description: 'A coffee boiler in restroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 2,
          masterId: 100003
        }
      ],
      permissions: [
        {
          groupId: 2000,
          types: ['READABLE', 'EXECUTABLE']
        },
        {
          groupId: 2001,
          types: ['READABLE', 'WRITABLE']
        }
      ]
    };
    var device3 = {
      avatarUrl: '/images/refrigerator.svg',
      physicalId: 's011111',
      physicalAddress: 'A6-29-00-01-6C-06',
      name: '公司控制中心',
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
          name: '会议室台灯',
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
          name: '休息室咖啡机',
          description: 'A coffee boiler in restroom',
          functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
          ],
          state: 'ACTIVE',
          deviceId: 2,
          masterId: 100004
        }
      ],
      permissions: [
        {
          groupId: 2000,
          types: ['READABLE', 'EXECUTABLE']
        },
        {
          groupId: 2001,
          types: ['READABLE', 'WRITABLE']
        }
      ]
    };
    var funcMeta0 = {
      functionId: 1,
      name: 'powerOn',
      group: {
        name: 'Power',
        groupId: '1'
      },
      input: [],
      output: [],
      privilegeType: 'EXECUTABLE',
      connType: 'SYNC'
    };
    var funcMeta1 = {
      functionId: 2,
      name: 'powerOff',
      group: {
        name: 'Power',
        groupId: '1'
      },
      input: [],
      output: [],
      privilegeType: 'EXECUTABLE',
      connType: 'SYNC'
    };
    return {
      getDevices: function () {
        return new RetData(true, '', [device0, device1, device2, device3]);
      },
      getSlaveFunctions: function (masterId, slaveId) {
        return new RetData(true, '', [funcMeta0, funcMeta1]);
      },
      getMasterFunctions: function (masterId) {
        return new RetData(true, '', [funcMeta0, funcMeta1]);
      }
    };
  });


