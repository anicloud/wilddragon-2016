package models.dto.device;

import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
public class DeviceShareData {
    public String deviceId;
    public String groupId;
    public Set<PermissionType> types;
}
