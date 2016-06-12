package models.dto;

/**
 * Created by huangbin on 12/14/15.
 */
public class RetData {
    public Boolean success;
    public String message;
    public Object data;

    public RetData(Boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public RetData(Boolean success, String message) {
        this.success = success;
        this.message = message;
        this.data = null;
    }


}
