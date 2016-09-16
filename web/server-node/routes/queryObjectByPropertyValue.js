/**
 * Created by zhangdongming on 16-9-15.
 */
var queryObjectByPropertyValue=function (body,property,value) {
    function propertyInArray (body,property,value) { //body can be group device account,etc
        for(var i=0;i<body.length;i++){
            if(body[i][property]==value){
                return [i,body[i]];
            }
        }
        return null;
    };
    function propertyInObject (body,property,value) {
        for(var key in body){
            if(key[property]==value){
                return [key,body[key]];
            }
        }
        return null;
    }
    if(Object.prototype.toString.call(body).indexOf('Array')>-1){
        return propertyInArray(body,property,value);
    }else if(Object.prototype.toString.call(body).indexOf('Object')>-1){
        return propertyInObject(body,property,value);
    }
};
module.exports=queryObjectByPropertyValue;