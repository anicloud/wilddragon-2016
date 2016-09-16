/**
 * Created by zhangdongming on 16-9-6.
 */
var RetData = function (success, message, data) {
    var self = this;
    this.success = success;
    this.message = message;
    this.data = data;
};
module.exports=RetData;