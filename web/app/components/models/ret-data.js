/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

var RetData = function (success, message, data) {
  var self = this;
  this.success = success;
  this.message = message;
  this.data = data;
};
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
//remove exsitMember of Data
//@import Array=>existData      Array/Object=>DataCollection
var dataFilter=function (exsitArray,Data) {
  var filterArray=[];
  var exsitFlag=false;
  for(var i=0;i<Data.length;i++){
    var cur=Data[i].accountId;
    for(var j=0;j<exsitArray.length;j++){
      if(cur===exsitArray[j]) {exsitFlag=true; break;}
    }
    if(!exsitFlag){
      filterArray.push(Data[i]);
    }
  }
  console.log(filterArray);
  return filterArray;
  
};

