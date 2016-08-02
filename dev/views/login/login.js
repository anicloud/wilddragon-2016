/**
 * Created by huangbin on 6/12/16.
 */
'use strict';

$(document).ready(function () {
  $('#username').focus(function () {
    $(this).parent().parent().addClass('focus');
  });
  $('#username').blur(function () {
    $(this).parent().parent().removeClass('focus');
  });

  $('#email').focus(function () {
    $(this).parent().parent().addClass('focus');
  });
  $('#email').blur(function () {
    $(this).parent().parent().removeClass('focus');
  });

  $('#password').focus(function () {
    $(this).parent().parent().addClass('focus');
  });
  $('#password').blur(function () {
    $(this).parent().parent().removeClass('focus');
  });

  $('#username').focus();

  $('#submitBtn').bind('click', doRegister);

  function doRegister() {
    $('#registerForm').submit(function () {
      
    });
  }

  $(document).keyup(function(event) {
    if (event.keyCode == 13) {
      $('#submitBtn').trigger('click');
    }
  })
  
});