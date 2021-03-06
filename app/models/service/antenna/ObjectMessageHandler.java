package models.service.antenna;

import com.ani.earth.commons.message.group.*;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.antenna.infrastructure.service.ObjectMessageListener;
import com.ani.octopus.commons.message.object.ObjectMessage;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.message.app.*;
import com.ani.octopus.commons.object.message.device.*;
import models.domain.session.SessionManager;
import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.app.AppData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.NotificationData;
import models.service.account.AccountServiceAdapter;
import models.service.app.AppServiceAdapter;
import models.service.device.DeviceServiceAdapter;
import models.service.notification.NotificationService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

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

    @Resource
    private AppServiceAdapter appServiceAdapter;

    @Resource
    private NotificationService notificationService;

    @Resource
    private AntennaTemplate antennaTemplate;

    @Override
    public void onNotifyMessage(ObjectMessage message) {
        try {
            switch (message.type) {
                case DEVICE_UPDATED:
                    onDeviceUpdate((DeviceUpdateMessage) message);
                    break;
                case DEVICE_CONNECTED:
                    onDeviceConnect((DeviceConnectMessage) message);
                    break;
                case DEVICE_DISCONNECTED:
                    onDeviceDisconnect((DeviceDisconnectMessage) message);
                    break;
                case DEVICE_BOUND:
                    onDeviceBind((DeviceBindMessage) message);
                    break;
                case DEVICE_UNBOUND:
                    onDeviceUnBind((DeviceUnbindMessage) message);
                    break;
                case DEVICE_SHARED:
                    onDeviceShare((DeviceShareMessage) message);
                    break;
                case DEVICE_UNSHARED:
                    onDeviceUnshare((DeviceUnshareMessage) message);
                    break;
                case DEVICE_SEARCHSLAVES:
                    onDeviceSearchSlaves((DeviceSearchSlavesMessage) message);
//                case ACCOUNT_GROUP_ADDED:
//                    onAccountGroupAdd((AccountGroupAddMessage) message);
//                    break;
                case ACCOUNT_GROUP_REMOVED:
                    onAccountGroupRemove((AccountGroupRemoveMessage) message);
                    break;
                case ACCOUNT_GROUP_MODIFIED:
                    onAccountGroupModify((AccountGroupModifyMessage) message);
                    break;
                case ACCOUNT_GROUP_INVITED:
                    onAccountGroupInvite((AccountGroupInviteMessage) message);
                    break;
                case ACCOUNT_GROUP_DISINVITED:
                    break;
                case ACCOUNT_GROUP_JOINED:
                    onAccountGroupJoin((AccountGroupJoinMessage) message);
                    break;
                case ACCOUNT_GROUP_QUIT:
                    onAccountGroupQuit((AccountGroupQuitMessage) message);
                    break;
                case ACCOUNT_GROUP_KICK:
                    onAccountGroupKick((AccountGroupKickMessage) message);
                    break;
                case APP_BIND:
                    onAppBind((AppBindMessage) message);
                    break;
                case APP_UNBIND:
                    onAppUnbind((AppUnbindMessage) message);
                    break;
                case APP_INSTALL:
                    onAppInstall((AppInstallMessage) message);
                    break;
                case APP_UNINSTALL:
                    onAppUninstall((AppUninstallMessage) message);
                    break;
                case APP_START:
                    onAppStart((AppStartMessage) message);
                    break;
                case APP_STOP:
                    onAppStop((AppStopMessage) message);
                    break;
                default:
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private void onDeviceUpdate(DeviceUpdateMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        if (deviceMasterData != null) {
            if (!(accountData.accountId==null)) {
                List<AccountData> accounts = new ArrayList<>(Collections.EMPTY_LIST);
                Set<String> accountIds = new HashSet<>();
                for (String groupId : deviceMasterData.accountGroups) {
                    AccountGroupData groupData = accountServiceAdapter.findGroup(Long.valueOf(groupId));
                    for (AccountData account : groupData.accounts) {
                        if (!accountIds.contains(account.accountId)) {
                            accountIds.add(account.accountId);
                            accounts.add(account);
                        }
                    }
                }
                notificationService.deviceUpdateNotice(deviceMasterData, accountData, accounts);
            }
        }
    }

    private void onDeviceConnect(DeviceConnectMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        if (deviceMasterData != null) {
            List<AccountData> accounts = new ArrayList<>(Collections.EMPTY_LIST);
            Set<String> accountIds = new HashSet<>();
            for(String groupId:deviceMasterData.accountGroups){
                AccountGroupData groupData = accountServiceAdapter.findGroup(Long.valueOf(groupId));
                for(AccountData account:groupData.accounts){
                    if(!accountIds.contains(account.accountId)){
                        accountIds.add(account.accountId);
                        accounts.add(account);
                    }
                }
            }
            notificationService.deviceConnectNotice(deviceMasterData, accountData, accounts);
        }
    }

    private void onDeviceDisconnect(DeviceDisconnectMessage message) {
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        if (deviceMasterData != null && deviceMasterData.accountGroups != null) {
            List<AccountData> accounts = new ArrayList<>(Collections.EMPTY_LIST);
            Set<String> accountIds = new HashSet<>();
            for(String groupId:deviceMasterData.accountGroups){
                AccountGroupData groupData = accountServiceAdapter.findGroup(Long.valueOf(groupId));
                for(AccountData account:groupData.accounts){
                    if(!accountIds.contains(account.accountId)){
                        accountIds.add(account.accountId);
                        accounts.add(account);
                    }
                }
            }
            notificationService.deviceDisConnectNotice(deviceMasterData, accountData, accounts);
        }
    }

    private void onDeviceBind(DeviceBindMessage message){
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.deviceBindNotice(deviceMasterData, accountData);
    }

    private void onDeviceUnBind(DeviceUnbindMessage message){
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.deviceBindNotice(deviceMasterData, accountData);
    }

    private void onDeviceShare(DeviceShareMessage message){
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        AccountGroupData groupData = accountServiceAdapter.findGroup(message.groupId);
        notificationService.deviceShareNotice(deviceMasterData, accountData, groupData);
    }

    private void onDeviceUnshare(DeviceUnshareMessage message){
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        AccountGroupData groupData = accountServiceAdapter.findGroup(message.groupId);
        notificationService.deviceUnShareNotice(deviceMasterData, accountData, groupData);
    }

    private void onDeviceSearchSlaves(DeviceSearchSlavesMessage message){
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(message.deviceId);
        ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(Long.parseLong(deviceMasterData.deviceId)), false);
        AccountData accountData = accountServiceAdapter.findAccountById(objectMainInfoDto.owner.accountId);
        notificationService.deviceSearchSlavesNotice(deviceMasterData,accountData,message.slavesList);
    }

//    private void onAccountGroupAdd(AccountGroupAddMessage message) {
//        notificationService.groupAddNotice(accountServiceAdapter.findGroup(message.groupId));
//    }

    private void onAccountGroupRemove(AccountGroupRemoveMessage message) {
        notificationService.groupRemoveNotice(accountServiceAdapter.findGroup(message.groupId));
    }

    private void onAccountGroupModify(AccountGroupModifyMessage message) {
        notificationService.groupModifyNotice(accountServiceAdapter.findGroup(message.groupId));
    }

    private void onAccountGroupInvite(AccountGroupInviteMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
//        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.groupInviteNotice(accountGroupData,null);
    }

    private void onAccountGroupJoin(AccountGroupJoinMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.groupJoinNotice(accountGroupData, accountData);
    }

    private void onAccountGroupQuit(AccountGroupQuitMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.groupQuitNotice(accountGroupData, accountData);
    }

    private void onAccountGroupKick(AccountGroupKickMessage message) {
        AccountGroupData accountGroupData = accountServiceAdapter.findGroup(message.groupId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.groupKickNotice(accountGroupData, accountData);
    }

    private void onAppBind(AppBindMessage message){
        AppData  appData= appServiceAdapter.findApp(message.appId, message.accountId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.appBindNotice(appData,accountData);
    }

    private void onAppUnbind(AppUnbindMessage message){
        AppData  appData= appServiceAdapter.findApp(message.appId, message.accountId);
        AccountData accountData = accountServiceAdapter.findAccountById(message.accountId);
        notificationService.appUnBindNotice(appData,accountData);
    }

    private void onAppInstall(AppInstallMessage message){
        notificationService.appInstallNotice(appServiceAdapter.findApp(message.appId, message.accountId));
    }

    private void onAppUninstall(AppUninstallMessage message){
        notificationService.appUninstallNotice(appServiceAdapter.findApp(message.appId, message.accountId));
    }

    private void onAppStart(AppStartMessage message){
        notificationService.appStartNotice(appServiceAdapter.findApp(message.appId, message.accountId));
    }

    private void onAppStop(AppStopMessage message){
        notificationService.appStopNotice(appServiceAdapter.findApp(message.appId, message.accountId));
    }
}
