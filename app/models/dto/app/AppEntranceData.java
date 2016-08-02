package models.dto.app;

import java.util.Set;

/**
 * Created by acbson on 16/7/27.
 */
public class AppEntranceData {
    public String id;
    public String entranceName;
    public String entranceUrl;
    public String logoPath;
    public Set<String> tagSet;
    public String description;

    public AppEntranceData(){}
}
