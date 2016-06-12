package models.service.device;

import models.dto.account.AccountData;
import models.dto.device.DeviceMasterData;
import models.dto.device.DeviceShareData;
import models.dto.device.PermissionData;
import models.dto.function.FunctionMetaData;

import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public interface DeviceServiceAdapter {
    // find
    DeviceMasterData findDevice(Long deviceId);
    DeviceMasterData findDevice(String physicalId, String physicalAddress);
    List<DeviceMasterData> findDevices(Long accountId);
    List<DeviceMasterData> findDevices(String email);

    // bind
    DeviceMasterData bindDevice(Long deviceId, Long accountId);
    DeviceMasterData bindDevice(String physicalId, String physicalAddress, Long accountId);
    DeviceMasterData unbindDevice(Long deviceId, Long accountId);

    // update
    DeviceMasterData updateDevice(DeviceMasterData device);

    // share
    List<PermissionData> shareDevice(DeviceShareData shareData);
    List<PermissionData> unshareDevice(DeviceShareData shareData);
}
