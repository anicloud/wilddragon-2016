package models.dto.device;

import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/18/15.
 */
public class DeviceSlaveData extends DeviceData {
    public Integer deviceId;
    public Long masterId;

    public DeviceSlaveData(String physicalId, String physicalAddress, String name, String description, List<FunctionData> functions, DeviceState state, Integer deviceId, Long masterId) {
        super(physicalId, physicalAddress, name, description, functions, state);
        this.deviceId = deviceId;
        this.masterId = masterId;
    }
}
