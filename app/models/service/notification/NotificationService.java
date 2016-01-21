package models.service.notification;

import models.dto.account.AccountData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.NotificationData;

import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
public interface NotificationService {
    void notifyDeviceChanges(DeviceMasterData deviceData) throws Exception;
    void notifyAccountChanges(AccountData accountData) throws Exception;
    Set<NotificationData> getNotificationsByAccount(Long accountId);
}
