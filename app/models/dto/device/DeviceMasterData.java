package models.dto.device;

import java.util.List;

/**
 * Created by huangbin on 12/11/15.
 */
public class DeviceMasterData extends DeviceData {
    public Long deviceId;
    public List<DeviceSlaveData> slaves;

    public Long owner;
    public List<Long> accountGroups;

    public DeviceMasterData(String physicalId, String physicalAddress, String name, String description, List<FunctionData> functions, DeviceState state, Long deviceId, List<DeviceSlaveData> slaves, Long owner, List<Long> accountGroups) {
        super(physicalId, physicalAddress, name, description, functions, state);
        this.deviceId = deviceId;
        this.slaves = slaves;
        this.owner = owner;
        this.accountGroups = accountGroups;
    }
}
