package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.domain.session.SessionManager;
import models.dto.RetData;
import models.dto.notification.NotificationData;
import models.service.notification.NotificationService;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.*;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
@Component
//@Security.Authenticated(AccessAuthenticator.class)
@RequiresAuthentication(clientName = "CasClient")
public class NotificationController extends JavaController {
    @Resource
    private SessionManager sessionManager;

    @Resource
    private NotificationService notificationService;

    private Long getAccountId() {
        final CommonProfile profile = getUserProfile();
        return Long.parseLong((String) profile.getAttribute("accountId"));
    }

    public WebSocket<JsonNode> getWebSocket() {
        try {
            return sessionManager.getSocket(String.valueOf(getAccountId()));
        } catch (Exception e) {
            return null;
        }
    }

    public Result getAllNotifications() {
        RetData retData = null;
        try {
            Set<NotificationData> data = notificationService.getNotificationsByAccount(getAccountId());
            retData = new RetData(true, "", data);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }
}
