package models.dto.device;

import com.ani.octopus.commons.object.dto.object.ObjectSlaveQueryDto;

import java.util.List;

/**
 * Created by hey on 16-11-14.
 */
public class DeviceAddSlavesData {
    public String deviceId;
    public List<ObjectSlaveQueryDto> slaves;
}
