package models.dto.app;

import com.ani.bus.service.commons.dto.aniservice.LanguageEnum;

import java.util.Set;

/**
 * Created by acbson on 16/7/27.
 */
public class AppInfoData {
    public String id;
    public String serviceServerUrl;
    public String logoPath;
    public Set<LanguageEnum> languageSet;
    public Set<String> tagSet;
    public String price;
    public String onShelf;
    public String description;

    public AppInfoData(){}
}
