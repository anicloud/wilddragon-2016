package models.dto.device;

import java.util.List;

/**
 * Created by huangbin on 12/11/15.
 */
public class DeviceData {

    public String physicalId;
    public String physicalAddress;
    public String name;
    public String description;

    public List<FunctionData> functions;

    public DeviceState state;

    public DeviceData(String physicalId, String physicalAddress, String name, String description, List<FunctionData> functions, DeviceState state) {
        this.physicalId = physicalId;
        this.physicalAddress = physicalAddress;
        this.name = name;
        this.description = description;
        this.functions = functions;
        this.state = state;
    }
}
