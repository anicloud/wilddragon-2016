package models.service.notification;

import models.domain.session.SessionManager;
import models.dto.account.AccountData;
import models.dto.device.DeviceMasterData;
import models.dto.notification.NotificationData;
import org.springframework.stereotype.Component;
import play.libs.Json;

import javax.annotation.Resource;
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
}
