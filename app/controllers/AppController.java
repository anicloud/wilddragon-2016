package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.domain.security.AccessAuthenticator;
import models.dto.RetDataDto;
import models.dto.app.AppData;
import models.service.app.AppServiceAdapter;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

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

    public Result getAllApps() {
        RetDataDto retDataDto = null;
        try {
            Long accountId = Long.valueOf(request().cookie("accountId").value());
            Set<AppData> appDatas = appServiceAdapter.getAppsByAccount(accountId);
            retDataDto = new RetDataDto(true, "", appDatas);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result installApp() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.installApp(appData);
            retDataDto = new RetDataDto(true, "", appData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result uninstallApp() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AppData appData = objectMapper.treeToValue(request().body().asJson(), AppData.class);
            appData = appServiceAdapter.uninstallApp(appData);
            retDataDto = new RetDataDto(true, "", appData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }


}
