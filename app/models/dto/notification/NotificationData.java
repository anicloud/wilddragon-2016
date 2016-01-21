package models.dto.notification;

/**
 * Created by huangbin on 12/29/15.
 */
public class NotificationData {
    public Type type;
    public String message;
    public Object data;

    public NotificationData(Type type, String message, Object data) {
        this.type = type;
        this.message = message;
        this.data = data;
    }

    public enum Type {
        // device
        DEVICE_ADD,
        DEVICE_REMOVE,
        DEVICE_MODIFY,
        // device connect state
        DEVICE_CONNECT,
        DEVICE_DISCONNECT,
        // device bind
        DEVICE_BIND,
        DEVICE_UNBIND,
        // device share
        DEVICE_SHARE,
        DEVICE_UNSHARE,

        // account group
        ACCOUNT_GROUP_ADD,
        ACCOUNT_GROUP_REMOVE,
        ACCOUNT_GROUP_MODIFY,
        ACCOUNT_GROUP_INVITE,
        ACCOUNT_GROUP_DISINVITE,
        ACCOUNT_GROUP_JOIN,
        ACCOUNT_GROUP_QUIT
    }

}
