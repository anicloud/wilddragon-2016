package models.service.antenna;

import com.ani.octopus.antenna.core.dto.message.ObjectMessage;
import com.ani.octopus.antenna.core.dto.message.account.AccountGroupAddMessage;
import com.ani.octopus.antenna.core.dto.message.account.AccountGroupDisinviteMessage;
import com.ani.octopus.antenna.core.dto.message.account.AccountGroupInviteMessage;
import com.ani.octopus.antenna.core.dto.message.account.AccountGroupRemoveMessage;
import com.ani.octopus.antenna.core.dto.message.device.DeviceConnectMessage;
import com.ani.octopus.antenna.core.dto.message.device.DeviceUpdateMessage;
import com.ani.octopus.antenna.infrastructure.service.ObjectMessageListener;
import models.domain.session.SessionManager;
import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.NotificationData;
import models.service.account.AccountServiceAdapter;
import models.service.device.DeviceServiceAdapter;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/28/15.
 */
@Component("objectMessageListener")
public class ObjectMessageHandler implements ObjectMessageListener {
    @Resource
    private SessionManager sessionManager;

    @Resource
    private DeviceServiceAdapter deviceServiceAdapter;

    @Resource
    private AccountServiceAdapter accountServiceAdapter;

    @Override
    public void onNotifyMessage(ObjectMessage message) {
        switch (message.type) {
            case DEVICE_UPDATED:
                onDeviceUpdate((DeviceUpdateMessage) message);
                break;
            case DEVICE_CONNECTED:
                onDeviceConnect((DeviceConnectMessage) message);
                break;
            case DEVICE_DISCONNECTED:
                onDeviceDisconnect((DeviceConnectMessage) message);
                break;
            case DEVICE_BOUND:
                break;
            case DEVICE_UNBOUND:
                break;
            case DEVICE_SHARED:
                break;
            case DEVICE_UNSHARED:
                break;
            case ACCOUNT_GROUP_ADDED:
                onAccountGroupAdd((AccountGroupAddMessage) message);
                break;
            case ACCOUNT_GROUP_REMOVED:
                onAccountGroupRemove((AccountGroupRemoveMessage) message);
                break;
            case ACCOUNT_GROUP_MODIFIED:
                onAccountGroupModify((AccountGroupRemoveMessage) message);
                break;
            case ACCOUNT_GROUP_INVITED:
                onAccountGroupInvite((AccountGroupInviteMessage) message);
                break;
            case ACCOUNT_GROUP_DISINVITED:
                onAccountGroupDisinvite((AccountGroupDisinviteMessage) message);
                break;
            case ACCOUNT_GROUP_JOINED:
                break;
            case ACCOUNT_GROUP_QUIT:
                break;
            default:
        }
    }



    private void onDeviceUpdate(DeviceUpdateMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        if (deviceMasterData != null && deviceMasterData.accountGroups != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.DEVICE_MODIFY,
                    "device modify notification",
                    deviceMasterData);
            for (String accountId : deviceMasterData.accountGroups) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onDeviceConnect(DeviceConnectMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        if (deviceMasterData != null && deviceMasterData.accountGroups != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.DEVICE_CONNECT,
                    "device connect notification",
                    deviceMasterData.deviceId);
            for (String accountId : deviceMasterData.accountGroups) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onDeviceDisconnect(DeviceConnectMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        if (deviceMasterData != null && deviceMasterData.accountGroups != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.DEVICE_DISCONNECT,
                    "device disconnect notification",
                    deviceMasterData.deviceId);
            for (String accountId : deviceMasterData.accountGroups) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onAccountGroupAdd(AccountGroupAddMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        if (accountGroupData != null && accountGroupData.accounts != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.ACCOUNT_GROUP_ADD,
                    "account group add notification",
                    accountGroupData);
            for (AccountData accountData : accountGroupData.accounts) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountData.accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onAccountGroupRemove(AccountGroupRemoveMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        if (accountGroupData != null && accountGroupData.accounts != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.ACCOUNT_GROUP_REMOVE,
                    "account group remove notification",
                    accountGroupData);
            for (AccountData accountData : accountGroupData.accounts) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountData.accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onAccountGroupModify(AccountGroupRemoveMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        if (accountGroupData != null && accountGroupData.accounts != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.ACCOUNT_GROUP_MODIFY,
                    "account group modify notification",
                    accountGroupData);
            for (AccountData accountData : accountGroupData.accounts) {
                Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(accountData.accountId);
                if (accountSessions != null) {
                    for (SessionManager.WebSocketSession accountSession : accountSessions) {
                        accountSession.send(notificationData);
                    }
                }
            }
        }
    }

    private void onAccountGroupInvite(AccountGroupInviteMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        if (accountGroupData != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.ACCOUNT_GROUP_INVITE,
                    "account group invite notification",
                    accountGroupData);
            Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(String.valueOf(message.accountId));
            if (accountSessions != null) {
                for (SessionManager.WebSocketSession accountSession : accountSessions) {
                    accountSession.send(notificationData);
                }
            }
        }
    }

    private void onAccountGroupDisinvite(AccountGroupDisinviteMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        if (accountGroupData != null) {
            NotificationData notificationData = new NotificationData(
                    NotificationData.Type.ACCOUNT_GROUP_DISINVITE,
                    "account group add notification",
                    accountGroupData);
            Set<SessionManager.WebSocketSession> accountSessions = sessionManager.getSessions(String.valueOf(message.accountId));
            if (accountSessions != null) {
                for (SessionManager.WebSocketSession accountSession : accountSessions) {
                    accountSession.send(notificationData);
                }
            }
        }
    }
}
