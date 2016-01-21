package models.service.device;

import models.dto.account.AccountData;
import models.dto.device.DeviceMasterData;
import models.dto.device.DeviceShareData;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public interface DeviceServiceAdapter {
    // get
    DeviceMasterData getDeviceByDeviceId(Long deviceId);
    DeviceMasterData getDeviceByPhyIdAndPhyAddress(String physicalId, String physicalAddress);
    Set<DeviceMasterData> getDevicesByAccount(Long accountId);

    // bind
    DeviceMasterData bindDevice(Long deviceId, Long accountId);
    DeviceMasterData unbindDevice(Long deviceId, Long accountId);

    // update
    DeviceMasterData updateDevice(DeviceMasterData device);

    // share
    DeviceMasterData shareDevice(DeviceShareData shareData);
    DeviceMasterData unshareDevice(DeviceShareData shareData);
}
