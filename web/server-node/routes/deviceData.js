 /**
 * Created by zhangdongming on 16-9-6.
 */
var RetData=require('./ret-data');
 var queryObjectByPropertyValue=require('./queryObjectByPropertyValue');
var deviceData=function() {
    var device0 = {
        avatarUrl: '/images/Washing_machine.svg',
        physicalId: 's011110',
        physicalAddress: '00-01-6C-06-A6-29',
        name: '家庭控制中心',
        description: 'home controller center',
        functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 2},
            {functionId: 1, groupId: 0},
            {functionId: 2, groupId: 0}
        ],
        owner: 10101,
        accountGroups: [2000],//, 2001
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
            // {
            //     groupId: 2001,
            //     types: ['READABLE', 'WRITABLE']
            // }
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
        owner: 10104,
        accountGroups: [2000],
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
            },
            // {
            //     groupId: 2001,
            //     types: ['READABLE', 'EXECUTABLE']
            // },
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
            }
        ]
    };
    var device4 = {
        avatarUrl: '/images/microwave.svg',
        physicalId: 'm1006',
        physicalAddress: '00-01-6C-06-C8-D6',
        name: 'testdevice6',
        description: 'for test 6',
        functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
        ],
        owner: 10101,
        accountGroups: [],
        state: 'ACTIVE',
        deviceId: '562020284355710454',
        slaves: [],
        permissions: []
    };
    var device5 = {
        avatarUrl: '/images/Fan.svg',
        physicalId: 'm1001',
        physicalAddress: '00-01-6C-06-C8-D1',
        name: 'testdevice1',
        description: 'for test 1',
        functions: [
            {functionId: 1, groupId: 1},
            {functionId: 2, groupId: 1}
        ],
        owner: "",
        accountGroups: [],
        state: 'ACTIVE',
        deviceId: '283902080612699564',
        slaves: [],
        permissions: []
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
    var devices=[device0, device1, device2, device3,device4];
    return {
        getDevices: function () {
            return new RetData(true, '', [device0,device2]);
        },
        getSlaveFunctions: function (masterId, slaveId) {
            return new RetData(true, '', [funcMeta0, funcMeta1]);
        },
        getMasterFunctions: function (masterId) {
            return new RetData(true, '', [funcMeta0, funcMeta1]);
        },
        modifyDevice:function(data){
            var deviceObj=queryObjectByPropertyValue(devices,'deviceId',data.deviceId);
            console.log(deviceObj);
            devices[deviceObj[0]]=data;
            return new RetData(true,'',data);
        },
        getDevice:function(deviceNum){
            return devices[deviceNum];
        },
        bindDevice:function (deviceInfo) {
            var deviceObj=queryObjectByPropertyValue(devices,'physicalAddress',deviceInfo.physicalAddress);
            if(deviceObj){
                deviceObj[1].owner=10101;
                return new RetData(true,"",deviceObj[1]);
            }
            else{
                return new RetData(false,'the device you want to bind is not connected to server',null);
            }
        },
        unbindDevice:function(deviceInfo){
            return new RetData(true,'',deviceInfo);
        },
        shareDevice:function(){
            return new RetData(true,'',[
                {
                    groupId: 2000,
                    types: ['READABLE', 'EXECUTABLE']
                },
                {
                    groupId: 2001,
                    types: ['READABLE', 'EXECUTABLE']
                }
            ])
        },
        getSlaveList:function(masterId){
            console.log('2222',masterId);
            if(masterId==100001){
                return new RetData(true,'',{slaveId:1001});
            }else 
                return new RetData(false,'','');
        },
        sendSlaveList:function (masterId) {
            console.log('11111',masterId);
            if(masterId==100001){
                return new RetData(true,'','');
            }else
                return new RetData(false,'','');
        }
    };
};
module.exports=deviceData;