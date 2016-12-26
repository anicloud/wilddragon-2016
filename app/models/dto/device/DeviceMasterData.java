package models.dto.device;

import java.util.List;

/**
 * Created by huangbin on 12/11/15.
 */
public class DeviceMasterData extends DeviceData {
    public String deviceId;
    public List<DeviceSlaveData> slaves;

    public List<String> accountGroups;

    public List<PermissionData> permissions;

    public DeviceMasterData(){}

    public DeviceMasterData(Integer physicalId, Long physicalAddress, String name, String description, List<FunctionData> functions, String avatarUrl, List<Integer> tags, DeviceState state, String deviceId, List<DeviceSlaveData> slaves) {
        super(physicalId, physicalAddress, name, description, functions, avatarUrl, tags, state);
        this.deviceId = deviceId;
        this.slaves = slaves;
        this.accountGroups = accountGroups;
    }
}
