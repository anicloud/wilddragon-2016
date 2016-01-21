package models.dto;

/**
 * Created by huangbin on 12/14/15.
 */
public class RetDataDto {
    public Boolean success;
    public String message;
    public Object data;

    public RetDataDto(Boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public RetDataDto(Boolean success, String message) {
        this.success = success;
        this.message = message;
        this.data = null;
    }


}
