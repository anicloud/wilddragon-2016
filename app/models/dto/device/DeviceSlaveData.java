package models.dto.device;

import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/18/15.
 */
public class DeviceSlaveData extends DeviceData {
    public Integer deviceId;
    public String masterId;

    public DeviceSlaveData(Integer physicalId, Long physicalAddress, String name, String description, List<FunctionData> functions, String avatarUrl, List<Integer> tags, DeviceState state, Integer deviceId, String masterId) {
        super(physicalId, physicalAddress, name, description, functions, avatarUrl, tags, state);
        this.deviceId = deviceId;
        this.masterId = masterId;
    }
}
