package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.domain.security.AccessAuthenticator;
import models.domain.session.SessionManager;
import models.dto.RetDataDto;
import models.dto.notification.NotificationData;
import models.service.notification.NotificationService;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.*;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
@Component
@Security.Authenticated(AccessAuthenticator.class)
public class NotificationController extends Controller {
    @Resource
    private SessionManager sessionManager;

    @Resource
    private NotificationService notificationService;

    public WebSocket<JsonNode> getWebSocket() {
        Http.Cookie cookie = Http.Context.current().request().cookie("accountId");
        try {
            Long id = Long.valueOf(cookie.value());
            return sessionManager.getSocket(id);
        } catch (Exception e) {
            return null;
        }
    }

    public Result getAllNotifications() {
        Http.Cookie cookie = Http.Context.current().request().cookie("accountId");
        RetDataDto retDataDto = null;
        try {
            Long id = Long.valueOf(cookie.value());
            Set<NotificationData> data = notificationService.getNotificationsByAccount(id);
            retDataDto = new RetDataDto(true, "", data);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }
}
