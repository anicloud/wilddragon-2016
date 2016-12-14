package models.service.notification;

import com.ani.octopus.commons.object.dto.object.ObjectSlaveInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectSlaveQueryDto;
import models.domain.session.SessionManager;
import models.dto.RetData;
import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.account.AccountGroupInviteData;
import models.dto.app.AppData;
import models.dto.device.DeviceData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.MsgContentData;
import models.dto.notification.NotificationData;
import org.springframework.stereotype.Component;
import play.libs.Json;

import javax.annotation.Resource;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
@Component("notificationService")
public class NotificationServiceImpl implements NotificationService {
    @Resource
    SessionManager sessionManager;

    @Override
    public void notifyDeviceChanges(DeviceMasterData deviceData) throws Exception {
        if (deviceData != null && deviceData.accountGroups != null) {
            for (int i=0; i<deviceData.accountGroups.size(); i++) {
                String accountId = deviceData.accountGroups.get(i);
                Set<SessionManager.WebSocketSession> sessions = sessionManager.getSessions(accountId);
                if (sessions != null) {
                    for (SessionManager.WebSocketSession session : sessions) {
                        session.send(Json.toJson(deviceData));
                    }
                }
            }
        }
    }

    @Override
    public void notifyAccountChanges(AccountData accountData) throws Exception {
        if (accountData != null) {
            Set<SessionManager.WebSocketSession> sessions = sessionManager.getSessions(accountData.accountId);
            if (sessions != null) {
                for (SessionManager.WebSocketSession session : sessions) {
                    session.send(Json.toJson(accountData));
                }
            }
        }
    }

    @Override
    public Set<NotificationData> getNotificationsByAccount(Long accountId) {
        return null;
    }

//    @Override
//    public void groupAddNotice(AccountGroupData accountGroupData) {
//        MsgContentData msgContentData = new MsgContentData();
//        msgContentData.fromId = accountGroupData.owner.accountId;
//        msgContentData.fromName = accountGroupData.owner.name;
//        msgContentData.groupId = accountGroupData.groupId;
//        msgContentData.groupName = accountGroupData.name;
//        msgContentData.detail = accountGroupData;
//        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_ADD,"group add notice", msgContentData);
//        for(AccountData account : accountGroupData.accounts){
//                SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
//        }
//    }

    @Override
    public void groupRemoveNotice(AccountGroupData accountGroupData) {
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountGroupData.owner.accountId;
        msgContentData.fromName = accountGroupData.owner.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountGroupData;
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_REMOVE,"group remove notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
                SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void groupModifyNotice(AccountGroupData accountGroupData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountGroupData.owner.accountId;
        msgContentData.fromName = accountGroupData.owner.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountGroupData;
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_MODIFY,"group modify notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
            if(!account.accountId.equals(accountGroupData.owner.accountId)){
                SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
            }
        }
    }

    public void groupInviteNotice(AccountGroupData accountGroupData, AccountGroupInviteData accountGroupInviteData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountGroupData.owner.accountId;
        msgContentData.fromName = accountGroupData.owner.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountGroupData;
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_INVITE,"group invite notice", msgContentData);
        for(AccountData inviteAccount:accountGroupInviteData.accounts) {
            SessionManager.sessionSend(inviteAccount.accountId, new RetData(true, "", data));
        }
    }

    public void groupJoinNotice(AccountGroupData accountGroupData, AccountData accountData){
        MsgContentData msgContentData = new MsgContentData();
        if(accountGroupData!=null) {
            msgContentData.fromId = accountData.accountId;
            msgContentData.fromName = accountData.name;
            msgContentData.groupId = accountGroupData.groupId;
            msgContentData.groupName = accountGroupData.name;
            msgContentData.detail = accountData;
            NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_JOIN, "group join notice", msgContentData);
            for (AccountData account : accountGroupData.accounts) {
                if (!account.accountId.equals(accountData.accountId)) {
                    SessionManager.sessionSend(account.accountId, new RetData(true, "", data));
                }
            }
            data.data.detail = accountGroupData;
            SessionManager.sessionSend(accountData.accountId, new RetData(true, "", data));
        }else{
            NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_JOIN, "group doesn't exit or has been dismissed.", msgContentData);
            SessionManager.sessionSend(accountData.accountId, new RetData(false, "", data));
        }
    }

    @Override
    public void groupRefuseNotice(AccountGroupData accountGroupData, AccountData accountData) {
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountData;
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_REFUSE,"group refuse notice", msgContentData);
        data.data.detail = accountGroupData;
        SessionManager.sessionSend(accountGroupData.owner.accountId, new RetData(true,"",data));
    }

    public void groupQuitNotice(AccountGroupData accountGroupData, AccountData accountData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountData;
        accountGroupData.accounts.add(accountData);
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_QUIT,"group quit notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void groupKickNotice(AccountGroupData accountGroupData, AccountData accountData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountGroupData.owner.accountId;
        msgContentData.fromName = accountGroupData.owner.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.detail = accountData;
        accountGroupData.accounts.add(accountData);
        NotificationData data = new NotificationData(NotificationData.Type.ACCOUNT_GROUP_KICK,"group kick notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceShareNotice(DeviceMasterData deviceMasterData, AccountData accountData, AccountGroupData accountGroupData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_SHARE,"device share notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceUnShareNotice(DeviceMasterData deviceMasterData, AccountData accountData, AccountGroupData accountGroupData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.groupId = accountGroupData.groupId;
        msgContentData.groupName = accountGroupData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_UNSHARE,"device un_share notice", msgContentData);
        for(AccountData account : accountGroupData.accounts){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceConnectNotice(DeviceMasterData deviceMasterData, AccountData accountData, List<AccountData> accountDatas){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = deviceMasterData.deviceId;
        msgContentData.fromName = deviceMasterData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_CONNECT,"device connect notice", msgContentData);
        for(AccountData account:accountDatas){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceDisConnectNotice(DeviceMasterData deviceMasterData, AccountData accountData, List<AccountData> accountDatas){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = deviceMasterData.deviceId;
        msgContentData.fromName = deviceMasterData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_DISCONNECT,"device disconnect notice", msgContentData);
        for(AccountData account:accountDatas){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceUpdateNotice(DeviceMasterData deviceMasterData, AccountData accountData, List<AccountData> accountDatas){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_UPDATE,"device update notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
        for(AccountData account:accountDatas){
            SessionManager.sessionSend(account.accountId, new RetData(true,"",data));
        }
    }

    public void deviceBindNotice(DeviceMasterData deviceMasterData, AccountData accountData) {
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.deviceId = deviceMasterData.deviceId;
        msgContentData.deviceName = deviceMasterData.name;
        msgContentData.detail = deviceMasterData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_BIND,"device bind notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
    }

    public void deviceUnbindNotice(DeviceMasterData deviceMasterDataData, AccountData accountData) {
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.deviceId = deviceMasterDataData.deviceId;
        msgContentData.deviceName = deviceMasterDataData.name;
        msgContentData.detail = deviceMasterDataData;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_UNBIND,"device un_bind notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
    }

    public void deviceSearchSlavesNotice(DeviceMasterData deviceMasterDataData, AccountData accountData, List<ObjectSlaveInfoDto> slaveList){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = accountData.accountId;
        msgContentData.fromName = accountData.name;
        msgContentData.deviceId = deviceMasterDataData.deviceId;
        msgContentData.deviceName = deviceMasterDataData.name;
        msgContentData.detail = slaveList;
        NotificationData data = new NotificationData(NotificationData.Type.DEVICE_SEARCHSLAVES,"get slaves list notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
    }

    public void appBindNotice(AppData appData , AccountData accountData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_BIND,"app bind notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
    }

    public void appUnBindNotice(AppData appData,AccountData accountData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_UNBIND,"app un_bind notice", msgContentData);
        SessionManager.sessionSend(accountData.accountId, new RetData(true,"",data));
    }

    public void appInstallNotice(AppData appData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_INSTALL,"app install notice", msgContentData);
        SessionManager.sessionSend(appData.accountId, new RetData(true,"",data));
    }

    public void appUninstallNotice(AppData appData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_UNINSTALL,"app un_install notice", msgContentData);
        SessionManager.sessionSend(appData.accountId, new RetData(true,"",data));
    }

    public void appStartNotice(AppData appData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_START,"app start notice", msgContentData);
        SessionManager.sessionSend(appData.accountId, new RetData(true,"",data));
    }
    public void appStopNotice(AppData appData){
        MsgContentData msgContentData = new MsgContentData();
        msgContentData.fromId = appData.id;
        msgContentData.fromName = appData.serviceName;
        msgContentData.detail = appData;
        NotificationData data = new NotificationData(NotificationData.Type.APP_STOP,"app stop notice", msgContentData);
        SessionManager.sessionSend(appData.accountId, new RetData(true,"",data));
    }
}
