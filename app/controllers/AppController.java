package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.dto.RetData;
import models.dto.app.AppData;
import models.service.app.AppServiceAdapter;
import models.service.notification.NotificationService;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.Result;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/15/15.
 */
@Component
//@Security.Authenticated(AccessAuthenticator.class)
@RequiresAuthentication(clientName = "CasClient")
public class AppController extends JavaController {
    @Resource
    private AppServiceAdapter appServiceAdapter;

    @Resource
    private NotificationService notificationService;

    public Result getAllApps() {
        RetData retData = null;
        try {
            Long accountId = Long.valueOf(request().cookie("accountId").value());
            Set<AppData> appDatas = appServiceAdapter.getAppsByAccount(accountId);
            retData = new RetData(true, "", appDatas);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result bindApp() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.bindApp(appData);
            notificationService.appBindNotice(appData);
            retData = new RetData(true, "", appData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result unbindApp() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.unbindApp(appData);
            notificationService.appUnBindNotice(appData);
            retData = new RetData(true, "", appData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result installApp() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.installApp(appData);
            notificationService.appInstallNotice(appData);
            retData = new RetData(true, "", appData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result uninstallApp() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.uninstallApp(appData);
            notificationService.appUninstallNotice(appData);
            retData = new RetData(true, "", appData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }


}
