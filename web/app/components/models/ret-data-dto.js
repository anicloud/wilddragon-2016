/**
 * Created by huangbin on 12/29/15.
 */
'use strict';

var RetDataDto = function (success, message, data) {
  var self = this;
  this.success = success;
  this.message = message;
  this.data = data;
};