package models.service.device;

import com.ani.octopus.antenna.core.dto.stub.StubInvocationDto;
import com.ani.octopus.commons.object.dto.object.ObjectSlaveQueryDto;
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
    DeviceMasterData findDevice(Integer physicalId, Long physicalAddress);
    List<DeviceMasterData> findDevices(Long accountId);
    List<DeviceMasterData> findDevices(String email);

    // bind
    DeviceMasterData bindDevice(Long deviceId, Long accountId);
    DeviceMasterData bindDevice(Integer physicalId, Long physicalAddress, Long accountId);
    DeviceMasterData unbindDevice(Long deviceId, Long accountId);

    // update
    DeviceMasterData updateDevice(DeviceMasterData device);

    // share
    List<PermissionData> shareDevice(DeviceShareData shareData);
    List<PermissionData> unshareDevice(DeviceShareData shareData);

    //search for slave
    List<Integer> searchForSlavesList(Long deviceId);
    boolean addNewSlaves(Long deviceId, List<Integer> slaveIdList);
}
