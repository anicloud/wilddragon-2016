package models.service.app;

import models.dto.app.AppData;

import java.util.Set;

/**
 * Created by huangbin on 12/15/15.
 */
public interface AppServiceAdapter {
    Set<AppData> getAppsByAccount(Long accountId);
    AppData installApp(AppData appData);
    AppData uninstallApp(AppData appData);
}
