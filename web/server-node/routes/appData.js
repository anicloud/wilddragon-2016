/**
 * Created by zhangdongming on 16-9-16.
 */
var RetData=require('./ret-data');
var appData=function(){
    var apps=[
        {
            appInfo:{
                id:"4",
                logoPath:"https://raw.githubusercontent.com/anicloud/anicloud.github.io/master/images/logo/ani_logo.png",
                serviceServerUrl:"http://localhost:8080/sunny"
            },
            serviceName:"anicloud-sunny"
        },
        {
            appInfo:{
                id:"33",
                logoPath:"https://raw.githubusercontent.com/anicloud/anicloud.github.io/master/images/logo/ani_logo.png",
                serviceServerUrl:"http://localhost:8080/sunny"
            },
            serviceName:"sunny-app"
        }
    ];
    return {
        getApps: function () {
            return new RetData(true, '', apps);
        }
    }
};
module.exports=appData;