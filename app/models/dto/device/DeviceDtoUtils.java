package models.dto.device;


import com.ani.bus.device.commons.dto.device.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by huangbin on 12/17/15.
 */
public class DeviceDtoUtils {
    public static FunctionData fromFunctionDto(FunctionDto functionDto) {
        if (functionDto == null) {
            return null;
        }
        return new FunctionData(functionDto.functionId, String.valueOf(functionDto.groupId));
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
                String.valueOf(slaveDto.masterId));
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
        List<String> accountGroups = null;
        if (masterDto.accountGroups != null) {
            accountGroups = new ArrayList<>(masterDto.accountGroups.size());
            for (Long groupId : masterDto.accountGroups) {
                accountGroups.add(String.valueOf(groupId));
            }
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
                accountGroups);
        return masterData;
    }
}
