package models.dto.app;

import com.ani.bus.service.core.application.dto.AniSerAccountObjDto;
import models.dto.device.DeviceData;
import models.dto.device.DeviceMasterData;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/15/15.
 */
public class AppData {
    public String id;
    public String accountId;
    public String serviceName;
    public String version;
    public String clientSecret;
    public Set<DeviceMasterData> devices;
    public Set<String> scope;
    public Set<String> authorizedGrantTypes;
    public Collection<String> authorities;
    public String webServerRedirectUri;
    public String accessTokenValidity;
    public String refreshTokenValidity;
    public String autoApprove;
    public String registerDate;
    public String archived;
    public String trusted;
    public List<AppEntranceData> entranceList;
    public AppInfoData appInfo;

    public AppData(){}
}
