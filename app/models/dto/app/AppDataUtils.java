package models.dto.app;

import com.ani.bus.service.commons.dto.aniservice.AniServiceDto;
import com.ani.bus.service.commons.dto.aniservice.AniServiceEntranceDto;
import com.ani.bus.service.commons.dto.aniservice.AniServiceInfoDto;
import com.ani.bus.service.core.application.dto.AniSerAccountObjDto;
import models.dto.device.DeviceData;
import models.dto.device.DeviceMasterData;

import java.time.Instant;
import java.util.*;

/**
 * Created by acbson on 16/7/27.
 */
public class AppDataUtils {

    //需手动赋值devices
    public static AppData fromAniServiceDto(AniServiceDto aniServiceDto){
        if(aniServiceDto == null){
            return null;
        }
        AppData appData = new AppData();
        appData.id = aniServiceDto.aniServiceId;
        appData.serviceName = aniServiceDto.serviceName;
        appData.accountId = String.valueOf(aniServiceDto.accountId);
        appData.version = aniServiceDto.version;
        appData.registerDate = String.valueOf(aniServiceDto.registerDate.getTime());
        appData.scope = aniServiceDto.scope;
        appData.autoApprove = aniServiceDto.autoApprove;
        appData.archived = String.valueOf(aniServiceDto.archived);
        appData.trusted = String.valueOf(aniServiceDto.trusted);
        appData.accessTokenValidity = String.valueOf(aniServiceDto.accessTokenValidity);
        appData.refreshTokenValidity = String.valueOf(aniServiceDto.refreshTokenValidity);
        appData.authorities = aniServiceDto.authorities;
        appData.authorizedGrantTypes = aniServiceDto.authorizedGrantTypes;
        appData.entranceList = fromAniServiceEntranceDtos(aniServiceDto.entranceList);
        appData.appInfo = fromAniServiceInfoDto(aniServiceDto.aniServiceInfo);
        appData.webServerRedirectUri = aniServiceDto.webServerRedirectUri;
        return appData;
    }

    public static AniServiceDto toAniServiceDto(AppData appData){
        if(appData == null){
            return null;
        }
        AniServiceDto aniServiceDto = new AniServiceDto();
        aniServiceDto.aniServiceId = appData.id;
        aniServiceDto.serviceName = appData.serviceName;
        aniServiceDto.accountId = Long.valueOf(appData.accountId);
        aniServiceDto.version = appData.version;
        aniServiceDto.clientSecret = appData.clientSecret;
        Set<String> resourceIds = new HashSet<>();
        for(DeviceMasterData deviceMasterData:appData.devices){
            resourceIds.add(deviceMasterData.deviceId);
        }
        aniServiceDto.resourceIds = resourceIds;
        aniServiceDto.registerDate = Date.from(Instant.ofEpochMilli(Long.valueOf(appData.registerDate)));
        aniServiceDto.scope = appData.scope;
        aniServiceDto.autoApprove = appData.autoApprove;
        aniServiceDto.archived = Boolean.getBoolean(appData.archived);
        aniServiceDto.trusted = Boolean.getBoolean(appData.trusted);
        aniServiceDto.accessTokenValidity = Integer.valueOf(appData.accessTokenValidity);
        aniServiceDto.refreshTokenValidity = Integer.valueOf(appData.refreshTokenValidity);
        aniServiceDto.authorities = appData.authorities;
        aniServiceDto.authorizedGrantTypes = appData.authorizedGrantTypes;
        aniServiceDto.entranceList =  toAniServiceEntranceDtos(appData.entranceList);
        aniServiceDto.aniServiceInfo = toAniServiceInfoDto(appData.appInfo);
        aniServiceDto.webServerRedirectUri = appData.webServerRedirectUri;
        return aniServiceDto;
    }

    public static AppInfoData fromAniServiceInfoDto(AniServiceInfoDto aniServiceInfoDto){
        if(aniServiceInfoDto == null){
            return null;
        }
        AppInfoData appInfoData = new AppInfoData();
        appInfoData.id = String.valueOf(aniServiceInfoDto.aniServiceInfoId);
        appInfoData.logoPath = aniServiceInfoDto.logoPath;
        appInfoData.languageSet = aniServiceInfoDto.languageSet;
        appInfoData.tagSet = aniServiceInfoDto.tagSet;
        appInfoData.price = String.valueOf(aniServiceInfoDto.price);
        appInfoData.onShelf = String.valueOf(aniServiceInfoDto.onShelf.getTime());
        appInfoData.serviceServerUrl = aniServiceInfoDto.serviceServerUrl;
        appInfoData.description = aniServiceInfoDto.description;
        return appInfoData;
    }

    public static AniServiceInfoDto toAniServiceInfoDto(AppInfoData appInfoData){
        if(appInfoData == null){
            return null;
        }
        AniServiceInfoDto aniServiceInfoDto = new AniServiceInfoDto();
        aniServiceInfoDto.aniServiceInfoId = Long.valueOf(appInfoData.id);
        aniServiceInfoDto.logoPath = appInfoData.logoPath;
        aniServiceInfoDto.languageSet = appInfoData.languageSet;
        aniServiceInfoDto.tagSet = appInfoData.tagSet;
        aniServiceInfoDto.price = Double.valueOf(appInfoData.price);
        aniServiceInfoDto.onShelf = Date.from(Instant.ofEpochMilli(Long.valueOf(appInfoData.onShelf)));
        aniServiceInfoDto.serviceServerUrl = appInfoData.serviceServerUrl;
        aniServiceInfoDto.description = appInfoData.description;
        return aniServiceInfoDto;
    }

    private static List<AppEntranceData> fromAniServiceEntranceDtos(List<AniServiceEntranceDto> aniServiceEntranceDtos){
        if(aniServiceEntranceDtos == null){
            return null;
        }
        List<AppEntranceData> appEntranceDatas = new ArrayList<>(aniServiceEntranceDtos.size());
        Iterator<AniServiceEntranceDto> iterator = aniServiceEntranceDtos.iterator();
        while(iterator.hasNext()){
            AniServiceEntranceDto aniServiceEntranceDto = iterator.next();
            AppEntranceData appEntranceData = new AppEntranceData();
            appEntranceData.id = String.valueOf(aniServiceEntranceDto.entranceId);
            appEntranceData.logoPath = aniServiceEntranceDto.logoPath;
            appEntranceData.tagSet = aniServiceEntranceDto.tagSet;
            appEntranceData.entranceName = aniServiceEntranceDto.entranceName;
            appEntranceData.entranceUrl = aniServiceEntranceDto.entranceUrl;
            appEntranceData.description = aniServiceEntranceDto.description;
            appEntranceDatas.add(appEntranceData);
        }
        return appEntranceDatas;
    }

    private static List<AniServiceEntranceDto> toAniServiceEntranceDtos(List<AppEntranceData> appEntranceDatas){
        if(appEntranceDatas == null){
            return null;
        }
        List<AniServiceEntranceDto> aniServiceEntranceDtos = new ArrayList<>(appEntranceDatas.size());
        Iterator<AppEntranceData> iterator = appEntranceDatas.iterator();
        while(iterator.hasNext()){
            AppEntranceData appEntranceData = iterator.next();
            AniServiceEntranceDto aniServiceEntranceDto = new AniServiceEntranceDto();
            aniServiceEntranceDto.entranceId = Long.valueOf(appEntranceData.id);
            aniServiceEntranceDto.logoPath = appEntranceData.logoPath;
            aniServiceEntranceDto.tagSet = appEntranceData.tagSet;
            aniServiceEntranceDto.entranceName = appEntranceData.entranceName;
            aniServiceEntranceDto.entranceUrl = appEntranceData.entranceUrl;
            aniServiceEntranceDto.description = appEntranceData.description;
            appEntranceDatas.add(appEntranceData);
        }
        return aniServiceEntranceDtos;
    }
}
