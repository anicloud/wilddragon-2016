package models.service.device;

import com.ani.bus.device.application.service.DeviceBusService;
import com.ani.bus.device.commons.dto.device.DeviceMasterDto;
import com.ani.bus.device.commons.dto.device.FunctionDto;
import com.ani.earth.commons.dto.AccountDto;
import com.ani.earth.commons.dto.AccountGroupDto;
import com.ani.earth.interfaces.AccountServiceFacade;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.dto.object.privilege.ObjectPrivilegeGrantDto;
import com.ani.octopus.commons.object.enumeration.AniObjectState;
import com.ani.octopus.commons.object.enumeration.AniObjectType;
import com.ani.octopus.commons.stub.enumeration.PrivilegeType;
import models.dto.device.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("deviceServiceAdapter")
public class DeviceServiceAdapterImpl implements DeviceServiceAdapter {
    @Resource
    AccountServiceFacade accountServiceFacade;

    @Resource
    private DeviceBusService deviceBusService;

    @Resource
    private AntennaTemplate antennaTemplate;

    @Override
    public DeviceMasterData findDevice(Long deviceId) {
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(deviceId);
        if (deviceMasterDto == null) {
            return null;
        }
        ObjectMainInfoDto objectDto;
        try {
            objectDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(deviceId), true);

        } catch (Exception e) {
            objectDto = null;
        }
        if (objectDto == null) {
            return null;
        }
        // object state
        DeviceState state = DeviceState.INACTIVE;
        for (AniObjectState objectState : objectDto.hostsState.values()) {
            if (objectState == AniObjectState.ACTIVE) {
                state = DeviceState.ACTIVE;
            } else if (objectState == AniObjectState.REMOVED) {
                state = DeviceState.REMOVED;
                break;
            }
        }

        DeviceMasterData deviceMasterData = DeviceDataUtils.fromDeviceMasterDto(deviceMasterDto, state);
        if (deviceMasterData != null) {
            deviceMasterData.permissions = DeviceDataUtils.fromPrivilegeDtos(objectDto.privileges);
        }
        return deviceMasterData;
    }

    @Override
    public DeviceMasterData findDevice(String physicalId, String physicalAddress) {
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(physicalId, physicalAddress);
        if (deviceMasterDto == null) {
            return null;
        }
        ObjectMainInfoDto objectDto;
        try {
            objectDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(deviceMasterDto.deviceId), true);
        } catch (Exception e) {
            objectDto = null;
        }
        if (objectDto == null) {
            return null;
        }
        // object state
        DeviceState state = DeviceState.INACTIVE;
        for (AniObjectState objectState : objectDto.hostsState.values()) {
            if (objectState == AniObjectState.ACTIVE) {
                state = DeviceState.ACTIVE;
            } else if (objectState == AniObjectState.REMOVED) {
                state = DeviceState.REMOVED;
                break;
            }
        }

        DeviceMasterData deviceMasterData = DeviceDataUtils.fromDeviceMasterDto(deviceMasterDto, state);
        if (deviceMasterData != null) {
            deviceMasterData.permissions = DeviceDataUtils.fromPrivilegeDtos(objectDto.privileges);
        }
        return deviceMasterData;
    }

    @Override
    public List<DeviceMasterData> findDevices(Long accountId) {
        List<ObjectMainInfoDto> objectDtos = new ArrayList<>();
        try {
            // get owned devices
            List<ObjectMainInfoDto> objectDtosOwned = antennaTemplate.objectInfoService.getObjectMainByAccountAndType(accountId, AniObjectType.DEVICE_OBJ, true, true);
            if (objectDtosOwned != null) {
                objectDtos.addAll(objectDtosOwned);
            }
            // get shared devices
            Set<AccountGroupDto> groupDtos = accountServiceFacade.getAccountInGroups(accountId);
            if (groupDtos != null && groupDtos.size() > 0) {
                List<Long> groupIds = new ArrayList<>();
                for (AccountGroupDto groupDto : groupDtos) {
                    groupIds.add(groupDto.groupId);
                }
                List<ObjectMainInfoDto> objectDtosShared = antennaTemplate.objectInfoService.getObjectMainByGrantedGroups(groupIds, AniObjectType.DEVICE_OBJ, true, true);
                if (objectDtosShared != null) {
                    objectDtos.addAll(objectDtosShared);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<DeviceMasterData> deviceMasterDatas = new ArrayList<>();
        Map<Long, ObjectMainInfoDto> mainInfoDtoMap = new HashMap<>();
        for (ObjectMainInfoDto objectDto : objectDtos) {
            if (mainInfoDtoMap.containsKey(objectDto.objectId)) continue;
            mainInfoDtoMap.put(objectDto.objectId, objectDto);
            // object state
            DeviceState state = DeviceState.INACTIVE;
            for (AniObjectState objectState : objectDto.hostsState.values()) {
                if (objectState == AniObjectState.ACTIVE) {
                    state = DeviceState.ACTIVE;
                } else if (objectState == AniObjectState.REMOVED) {
                    state = DeviceState.REMOVED;
                    break;
                }
            }
            DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(objectDto.objectId);
            if (deviceMasterDto != null) {
                DeviceMasterData deviceMasterData = DeviceDataUtils.fromDeviceMasterDto(deviceMasterDto, state);
                if (deviceMasterData != null) {
                    deviceMasterData.permissions = DeviceDataUtils.fromPrivilegeDtos(objectDto.privileges);
                    deviceMasterDatas.add(deviceMasterData);
                }
            }
        }
        return deviceMasterDatas;
    }

    @Override
    public List<DeviceMasterData> findDevices(String email) {
        AccountDto accountDto = accountServiceFacade.getByEmail(email);
        if (accountDto == null) {
            return null;
        }
        return findDevices(accountDto.accountId);
    }

    @Override
    public DeviceMasterData bindDevice(Long deviceId, Long accountId) {
        ObjectMainInfoDto objectMainInfoDto = null;
        try {
            objectMainInfoDto = antennaTemplate.objectInfoService.bindAccount(new ObjectMainQueryDto(deviceId), accountId);
        } catch (Exception e) {
            objectMainInfoDto = null;
        }
        if (objectMainInfoDto == null) {
            return null;
        }
        DeviceState state = DeviceState.INACTIVE;
        for (AniObjectState objectState : objectMainInfoDto.hostsState.values()) {
            if (objectState == AniObjectState.ACTIVE) {
                state = DeviceState.ACTIVE;
            } else if (objectState == AniObjectState.REMOVED) {
                state = DeviceState.REMOVED;
                break;
            }
        }
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(deviceId);
        deviceMasterDto.owner = accountId;
        deviceBusService.saveDeviceMaster(deviceMasterDto);
        return DeviceDataUtils.fromDeviceMasterDto(deviceMasterDto, state);
    }

    @Override
    public DeviceMasterData bindDevice(String physicalId, String physicalAddress, Long accountId) {
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(physicalId, physicalAddress);
        if (deviceMasterDto == null) {
            return null;
        }
        return bindDevice(deviceMasterDto.deviceId, accountId);
    }

    @Override
    public DeviceMasterData unbindDevice(Long deviceId, Long accountId) {
        ObjectMainInfoDto objectMainInfoDto = null;
        try {
            ObjectMainQueryDto objectMainQueryDto = new ObjectMainQueryDto(deviceId);
            objectMainInfoDto = antennaTemplate.objectInfoService.releaseFromAccount(objectMainQueryDto, accountId);
        } catch (Exception e) {
            objectMainInfoDto = null;
        }
        if (objectMainInfoDto == null) {
            return null;
        }
        DeviceState state = DeviceState.INACTIVE;
        for (AniObjectState objectState : objectMainInfoDto.hostsState.values()) {
            if (objectState == AniObjectState.ACTIVE) {
                state = DeviceState.ACTIVE;
            } else if (objectState == AniObjectState.REMOVED) {
                state = DeviceState.REMOVED;
                break;
            }
        }
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(deviceId);
        deviceMasterDto.owner = -1L;
        deviceBusService.saveDeviceMaster(deviceMasterDto);
        return DeviceDataUtils.fromDeviceMasterDto(deviceMasterDto, state);
    }

    @Override
    public DeviceMasterData updateDevice(DeviceMasterData device) {
        DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(Long.valueOf(device.deviceId));
        if(device.physicalId != null){
            deviceMasterDto.physicalId = device.physicalId;
        }
        if(device.physicalAddress != null){
            deviceMasterDto.physicalAddress = device.physicalAddress;
        }
        if(device.name != null){
            deviceMasterDto.name = device.name;
        }
        if(device.tags != null){
            deviceMasterDto.tags = device.tags;
        }
        if(device.owner != null){
            deviceMasterDto.owner = Long.valueOf(device.owner);
        }
        if(device.avatarUrl != null){
            deviceMasterDto.avatarUrl = device.avatarUrl;
        }
        if(device.description != null){
            deviceMasterDto.description = device.description;
        }
        if(device.functions != null){
            List<FunctionDto> funcitonList = new ArrayList<>(Collections.EMPTY_LIST);
            for(FunctionData function:device.functions){
                FunctionDto functionDto = new FunctionDto(function.functionId, Long.valueOf(function.groupId));

            }
            deviceMasterDto.functions = funcitonList;
        }
        return DeviceDataUtils.fromDeviceMasterDto(deviceBusService.saveDeviceMaster(deviceMasterDto), device.state);
    }

    @Override
    public List<PermissionData> shareDevice(DeviceShareData shareData) {
        if (shareData == null) {
            return null;
        }
        ObjectMainQueryDto mainQueryDto = new ObjectMainQueryDto(Long.parseLong(shareData.deviceId));
        Set<PrivilegeType> privilegeTypes = new HashSet<>();
        if (shareData.types != null) {
            for (PermissionType permissionType : shareData.types) {
                privilegeTypes.add(DeviceDataUtils.toPrivilegeType(permissionType));
            }
        }
        ObjectPrivilegeGrantDto privilegeGrantDto = new ObjectPrivilegeGrantDto(Long.parseLong(shareData.groupId), privilegeTypes);
        ObjectMainInfoDto mainInfoDto = antennaTemplate.objectInfoService.grantAccountGroupPrivilege(
                mainQueryDto,
                privilegeGrantDto,
                true);
        if (mainInfoDto == null) {
            return null;
        } else {
            DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(Long.valueOf(shareData.deviceId));
            if(deviceMasterDto.accountGroups!=null && !deviceMasterDto.accountGroups.contains(shareData.groupId)){
                deviceMasterDto.accountGroups.add(Long.valueOf(shareData.groupId));
                deviceBusService.saveDeviceMaster(deviceMasterDto);
            }
            return DeviceDataUtils.fromPrivilegeDtos(mainInfoDto.privileges);
        }
    }

    @Override
    public List<PermissionData> unshareDevice(DeviceShareData shareData) {
        if (shareData == null) {
            return null;
        }
        ObjectMainQueryDto mainQueryDto = new ObjectMainQueryDto(Long.parseLong(shareData.deviceId));
        Set<PrivilegeType> privilegeTypes = new HashSet<>();

        ObjectPrivilegeGrantDto privilegeGrantDto = new ObjectPrivilegeGrantDto(Long.parseLong(shareData.groupId), privilegeTypes);
        ObjectMainInfoDto mainInfoDto = antennaTemplate.objectInfoService.grantAccountGroupPrivilege(
                mainQueryDto,
                privilegeGrantDto,
                true);
        if (mainInfoDto == null) {
            return null;
        } else {
            DeviceMasterDto deviceMasterDto = deviceBusService.findDeviceMaster(Long.valueOf(shareData.deviceId));
            if(deviceMasterDto.accountGroups!=null){
                deviceMasterDto.accountGroups.remove(Long.valueOf(shareData.groupId));
                deviceBusService.saveDeviceMaster(deviceMasterDto);
            }
            return DeviceDataUtils.fromPrivilegeDtos(mainInfoDto.privileges);
        }
    }

}
