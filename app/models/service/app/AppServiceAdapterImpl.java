package models.service.app;

import models.dto.app.AppData;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("appServiceAdapter")
public class AppServiceAdapterImpl implements AppServiceAdapter {
    @Override
    public Set<AppData> getAppsByAccount(Long accountId) {
        return null;
    }

    @Override
    public AppData installApp(AppData appData) {
        return null;
    }

    @Override
    public AppData uninstallApp(AppData appData) {
        return null;
    }
}
