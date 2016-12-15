package models.dto.notification;

import play.libs.Json;

/**
 * Created by huangbin on 12/29/15.
 */
public class  NotificationData {
    public Type type;
    public String message;
    public MsgContentData data;

    public NotificationData(){}

    public NotificationData(Type type, String message, MsgContentData data) {
        this.type = type;
        this.message = message;
        this.data = data;
    }

    public enum Type {
        // device
        DEVICE_ADD,
        DEVICE_REMOVE,
        DEVICE_MODIFY,
        DEVICE_UPDATE,
        // device connect state
        DEVICE_CONNECT,
        DEVICE_DISCONNECT,
        // device bind
        DEVICE_BIND,
        DEVICE_UNBIND,
        // device share
        DEVICE_SHARE,
        DEVICE_UNSHARE,
        //search for slaves
        DEVICE_SEARCHSLAVES,

        // account group
        ACCOUNT_GROUP_ADD,
        ACCOUNT_GROUP_REMOVE,
        ACCOUNT_GROUP_MODIFY,
        ACCOUNT_GROUP_INVITE,
        ACCOUNT_GROUP_DISINVITE,
        ACCOUNT_GROUP_JOIN,
        ACCOUNT_GROUP_REFUSE,
        ACCOUNT_GROUP_QUIT,
        ACCOUNT_GROUP_KICK,

        //app
        APP_BIND,
        APP_UNBIND,
        APP_INSTALL,
        APP_UNINSTALL,
        APP_START,
        APP_STOP;
    }

    @Override
    public String toString() {
        return Json.toJson(this).toString();
    }
}
