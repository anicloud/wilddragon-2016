package models.service.device;

import com.ani.bus.device.commons.dto.device.DeviceMasterDto;
import com.ani.bus.device.core.service.device.DeviceService;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.enumeration.AniObjectState;
import models.dto.device.DeviceDtoUtils;
import models.dto.device.DeviceMasterData;
import models.dto.device.DeviceShareData;
import models.dto.device.DeviceState;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("deviceServiceAdapter")
public class DeviceServiceAdapterImpl implements DeviceServiceAdapter {
    @Resource
    private DeviceService deviceService;

    @Resource
    private AntennaTemplate antennaTemplate;

    @Override
    public DeviceMasterData getDeviceByDeviceId(Long deviceId) {
        ObjectMainInfoDto objectDto = antennaTemplate.objectInfoService.getObjectMain(
                new ObjectMainQueryDto(deviceId));
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

        DeviceMasterDto deviceMasterDto = deviceService.findDeviceMaster(deviceId);
        return DeviceDtoUtils.fromDeviceMasterDto(deviceMasterDto, state);
    }

    @Override
    public DeviceMasterData getDeviceByPhyIdAndPhyAddress(String physicalId, String physicalAddress) {
        return null;
    }

    @Override
    public Set<DeviceMasterData> getDevicesByAccount(Long accountId) {
        Set<DeviceMasterData> deviceDatas = new HashSet<>();
        List<ObjectMainInfoDto> objectDtos = antennaTemplate.objectInfoService.getObjectMainByAccount(accountId, false);
        for (ObjectMainInfoDto objectDto : objectDtos) {
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
            DeviceMasterDto deviceDto = deviceService.findDeviceMaster(objectDto.objectId);
            if (deviceDto != null) {
                DeviceMasterData deviceData = DeviceDtoUtils.fromDeviceMasterDto(deviceDto, state);
                if (deviceData != null) {
                    deviceDatas.add(deviceData);
                }
            }
        }
        return deviceDatas;
    }

    @Override
    public DeviceMasterData bindDevice(Long deviceId, Long accountId) {
        return null;
    }

    @Override
    public DeviceMasterData unbindDevice(Long deviceId, Long accountId) {
        return null;
    }

    @Override
    public DeviceMasterData updateDevice(DeviceMasterData device) {
        return null;
    }

    @Override
    public DeviceMasterData shareDevice(DeviceShareData shareData) {
        return null;
    }

    @Override
    public DeviceMasterData unshareDevice(DeviceShareData shareData) {
        return null;
    }
}
