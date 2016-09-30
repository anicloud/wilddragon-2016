package models.service.notification;

import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.account.AccountGroupInviteData;
import models.dto.app.AppData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.NotificationData;

import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
public interface NotificationService {
    void notifyDeviceChanges(DeviceMasterData deviceData) throws Exception;
    void notifyAccountChanges(AccountData accountData) throws Exception;
    Set<NotificationData> getNotificationsByAccount(Long accountId);

    //Account
//    void groupAddNotice(AccountGroupData accountGroupData);
    void groupRemoveNotice(AccountGroupData accountGroupData);
    void groupModifyNotice(AccountGroupData accountGroupData);
    void groupInviteNotice(AccountGroupData accountGroupData, AccountGroupInviteData accountGroupInviteData);
    void groupJoinNotice(AccountGroupData accountGroupData, AccountData accountData);
    void groupQuitNotice(AccountGroupData accountGroupData, AccountData accountData);
    void groupKickNotice(AccountGroupData accountGroupData, AccountData accountData);

    //Device
    void deviceShareNotice(DeviceMasterData deviceMasterData, AccountData accountData, AccountGroupData accountGroupData);
    void deviceUnShareNotice(DeviceMasterData deviceMasterData, AccountData accountData,AccountGroupData accountGroupData);
    void deviceConnectNotice(DeviceMasterData deviceMasterData, AccountData accountData, List<AccountData> accountDatas);
    void deviceDisConnectNotice(DeviceMasterData deviceMasterData, AccountData accountData, List<AccountData> accountDatas);
    void deviceUpdateNotice(DeviceMasterData deviceMasterDataData, AccountData accountData, List<AccountData> accountDatas);
    void deviceBindNotice(DeviceMasterData deviceMasterDataData, AccountData accountData);
    void deviceUnbindNotice(DeviceMasterData deviceMasterDataData, AccountData accountData);

    //App
    void appBindNotice(AppData appData,AccountData accountData);
    void appUnBindNotice(AppData appData,AccountData accountData);
    void appInstallNotice(AppData appData);
    void appUninstallNotice(AppData appData);
    void appStartNotice(AppData appData);
    void appStopNotice(AppData appData);
}
