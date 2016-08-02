package models.dto.device;

import java.util.List;

/**
 * Created by huangbin on 12/11/15.
 */
public class DeviceMasterData extends DeviceData {
    public String deviceId;
    public List<DeviceSlaveData> slaves;

    public String owner;
    public List<String> accountGroups;

    public List<PermissionData> permissions;

    public DeviceMasterData(){}

    public DeviceMasterData(String physicalId, String physicalAddress, String name, String description, List<FunctionData> functions, String avatarUrl, List<String> tags, DeviceState state, String deviceId, List<DeviceSlaveData> slaves, String owner, List<String> accountGroups) {
        super(physicalId, physicalAddress, name, description, functions, avatarUrl, tags, state);
        this.deviceId = deviceId;
        this.slaves = slaves;
        this.owner = owner;
        this.accountGroups = accountGroups;
    }
}
