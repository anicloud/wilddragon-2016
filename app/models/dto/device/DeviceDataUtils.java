package models.dto.device;


import com.ani.bus.device.commons.dto.device.*;
import com.ani.octopus.commons.object.dto.object.privilege.ObjectMainPrivilegeDto;
import com.ani.octopus.commons.stub.enumeration.PrivilegeType;

import java.util.*;

/**
 * Created by huangbin on 12/17/15.
 */
public class DeviceDataUtils {
    public static List<String> fromAccountGroupDtos(List<Long> accountGroupDtos) {
        List<String> accountGroups = null;
        if (accountGroupDtos != null) {
            accountGroups = new ArrayList<>(accountGroupDtos.size());
            for (Long accountGroup: accountGroupDtos) {
                accountGroups.add(String.valueOf(accountGroup));
            }
        }
        return accountGroups;

    }

    public static FunctionData fromFunctionDto(FunctionDto functionDto) {
        if (functionDto == null) {
            return null;
        }
        return new FunctionData(functionDto.functionId, functionDto.groupId.toString());
    }

    public static List<FunctionData> fromFunctionDtos(List<FunctionDto> functionDtos) {
        if (functionDtos == null) {
            return null;
        }
        List<FunctionData> functionDatas = new ArrayList<>(functionDtos.size());
        for (int i=0; i<functionDtos.size(); i++) {
            functionDatas.add(i, fromFunctionDto(functionDtos.get(i)));
        }
        return functionDatas;
    }

    public static DeviceSlaveData fromDeviceSlaveDto(DeviceSlaveDto slaveDto) {
        if (slaveDto == null) {
            return null;
        }
        return new DeviceSlaveData(
                slaveDto.physicalId,
                slaveDto.physicalAddress,
                slaveDto.name,
                slaveDto.description,
                fromFunctionDtos(slaveDto.functions),
                slaveDto.avatarUrl,
                slaveDto.tags,
                DeviceState.ACTIVE,
                slaveDto.deviceId,
                slaveDto.masterId.toString());
    }

    public static List<DeviceSlaveData> fromDeviceSlaveDtos(List<DeviceSlaveDto> slaveDtos) {
        if (slaveDtos == null) {
            return null;
        }
        List<DeviceSlaveData> slaveDatas = new ArrayList<>(slaveDtos.size());
        for (int i=0; i<slaveDtos.size(); i++) {
            slaveDatas.add(i, fromDeviceSlaveDto(slaveDtos.get(i)));
        }
        return slaveDatas;
    }

    public static DeviceMasterData fromDeviceMasterDto(DeviceMasterDto masterDto, DeviceState state) {
        if (masterDto == null) {
            return null;
        }
        DeviceMasterData masterData = new DeviceMasterData(
                masterDto.physicalId,
                masterDto.physicalAddress,
                masterDto.name,
                masterDto.description,
                fromFunctionDtos(masterDto.functions),
                masterDto.avatarUrl,
                masterDto.tags,
                state,
                String.valueOf(masterDto.deviceId),
                fromDeviceSlaveDtos(masterDto.slaves),
                String.valueOf(masterDto.owner),
                fromAccountGroupDtos(masterDto.accountGroups));
        return masterData;
    }

    public static PermissionType fromPrivilegeType(PrivilegeType privilegeType) {
        if (privilegeType == PrivilegeType.READ) {
            return PermissionType.READABLE;
        } else if (privilegeType == PrivilegeType.WRITE) {
            return PermissionType.WRITABLE;
        } else {
            return PermissionType.EXECUTABLE;
        }
    }

    public static PrivilegeType toPrivilegeType(PermissionType permissionType) {
        if (permissionType == PermissionType.READABLE) {
            return PrivilegeType.READ;
        } else if (permissionType == PermissionType.WRITABLE) {
            return PrivilegeType.WRITE;
        } else {
            return PrivilegeType.EXECUTE;
        }
    }

    public static List<PermissionData> fromPrivilegeDtos(List<ObjectMainPrivilegeDto> privilegeDtos) {
        if (privilegeDtos == null) {
            return null;
        }
        Map<Long, PermissionData> permissionMap = new HashMap<>();
        for (ObjectMainPrivilegeDto privilegeDto : privilegeDtos) {
            PermissionData permissionData = permissionMap.get(privilegeDto.accountGroup.groupId);
            if (permissionData == null) {
                permissionData = new PermissionData();
                permissionData.groupId = privilegeDto.accountGroup.groupId.toString();
                permissionData.types = new HashSet<>();
                permissionMap.put(privilegeDto.accountGroup.groupId, permissionData);
            }
            permissionData.types.add(fromPrivilegeType(privilegeDto.privilegeType));
        }
        List<PermissionData> permissionDatas = new ArrayList<>();
        for (PermissionData permissionData : permissionMap.values()) {
            permissionDatas.add(permissionData);
        }
        return permissionDatas;
    }
}
