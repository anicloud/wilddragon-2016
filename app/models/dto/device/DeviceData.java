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

    public String avatarUrl;

    public List<String> tags;

    public DeviceState state;

    public DeviceData(String physicalId, String physicalAddress, String name, String description, List<FunctionData> functions, String avatarUrl, List<String> tags, DeviceState state) {
        this.physicalId = physicalId;
        this.physicalAddress = physicalAddress;
        this.name = name;
        this.description = description;
        this.functions = functions;
        this.avatarUrl = avatarUrl;
        this.tags = tags;
        this.state = state;
    }
}
