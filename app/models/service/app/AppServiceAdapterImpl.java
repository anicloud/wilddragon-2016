package models.service.app;

import com.ani.bus.service.commons.dto.aniservice.AniServiceDto;
import com.ani.bus.service.core.interfaces.accountobj.AniSerAccountObjManager;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.enumeration.AniObjectState;
import models.dto.app.AppData;
import models.dto.app.AppDataUtils;
import models.dto.app.AppState;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("appServiceAdapter")
public class AppServiceAdapterImpl implements AppServiceAdapter {
    @Resource
    private AniSerAccountObjManager aniSerAccountObjManager;

    @Resource
    private AntennaTemplate antennaTemplate;

    @Override
    public Set<AppData> getAppsByAccount(Long accountId) {
        List<AniServiceDto> aniServiceDtos = aniSerAccountObjManager.getAniServiceByAccount(accountId);
        Set<AppData> appDatas = new HashSet<>();
        Iterator<AniServiceDto> iterator = aniServiceDtos.iterator();
        while(iterator.hasNext()){
            AppData appData = AppDataUtils.fromAniServiceDto(iterator.next());
            appDatas.add(appData);
        }
        return appDatas;
    }

    @Override
    public Set<AppData> getAppsOnshelf() {
        List<AniServiceDto> appServices = aniSerAccountObjManager.getAniServiceOnshelf();
        Set<AppData> appDatas = new HashSet<>();
        Iterator<AniServiceDto> iterator = appServices.iterator();
        while(iterator.hasNext()){
            AppData appData = new AppData();
            appData.appInfo = AppDataUtils.fromAniServiceInfoDto(iterator.next().aniServiceInfo);
            appDatas.add(appData);
        }
        return appDatas;
    }

    @Override
    public AppData findApp(Long appId, Long accountId) {
        AniServiceDto appService = null;
//        appService = aniSerAccountObjManager.getServiceById(accountId, appId);
        return AppDataUtils.fromAniServiceDto(appService);
    }

    @Override
    public AppData bindApp(AppData appData) {
        AniServiceDto aniServiceDto = aniSerAccountObjManager.bindService(AppDataUtils.toAniServiceDto(appData));
        try {
            ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.bindAccount(new ObjectMainQueryDto(Long.valueOf(appData.id)), Long.valueOf(appData.accountId));
            AppState state = AppState.INACTIVE;
            for (AniObjectState objectState : objectMainInfoDto.hostsState.values()) {
                if (objectState == AniObjectState.ACTIVE) {
                    state = AppState.ACTIVE;
                } else if (objectState == AniObjectState.REMOVED) {
                    state = AppState.REMOVED;
                    break;
                }
            }
        } catch (Exception e) {
            return null;
        }
        return AppDataUtils.fromAniServiceDto(aniServiceDto);
    }

    @Override
    public AppData unbindApp(AppData appData) {
        AniServiceDto aniServiceDto = aniSerAccountObjManager.unbindService(AppDataUtils.toAniServiceDto(appData));
        try {
            ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.releaseFromAccount(new ObjectMainQueryDto(Long.valueOf(appData.id)), Long.valueOf(appData.accountId));
            AppState state = AppState.INACTIVE;
            for (AniObjectState objectState : objectMainInfoDto.hostsState.values()) {
                if (objectState == AniObjectState.ACTIVE) {
                    state = AppState.ACTIVE;
                } else if (objectState == AniObjectState.REMOVED) {
                    state = AppState.REMOVED;
                    break;
                }
            }
        } catch (Exception e) {
            return null;
        }
        return AppDataUtils.fromAniServiceDto(aniServiceDto);
    }

    @Override
    public AppData installApp(AppData appData) {
        AniServiceDto aniServiceDto = AppDataUtils.toAniServiceDto(appData);
//        aniServiceDto = aniSerAccountObjManager.installApp(aniServiceDto);
        return AppDataUtils.fromAniServiceDto(aniServiceDto);
    }

    @Override
    public AppData uninstallApp(AppData appData) {
        AniServiceDto aniServiceDto = AppDataUtils.toAniServiceDto(appData);
//        aniServiceDto = aniSerAccountObjManager.installApp(aniServiceDto);
        return AppDataUtils.fromAniServiceDto(aniServiceDto);
    }

}