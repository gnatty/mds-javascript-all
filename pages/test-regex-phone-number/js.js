'use strict';

/*
* Check if the given string is a valid phone number formats
* @checkPhoneNumber
* @param {String} str - A phone number 
* @return {Boolean} True or False
*
*/
var checkPhoneNumber = function checkPhoneNumber(str) {
  if(typeof str != "string") {
    return false;
  }
  var pattern = /^0[671]\d{8}$/g;
  var regex = new RegExp(pattern);
  return regex.test(str);
}

/**
*
* @test
*
*/
var elInput   = document.querySelector('#str');
var elMsg     = document.querySelector('#msg');
var response  = {
  'empty'   : 'Write something and check if it\'s a valid phone number or not !',
  'true'    : 'True. It\'s a ... valid phone number !',
  'false'   : 'False. It\'s not a ... valid phone number !'
}

if(elInput.value == "") {
  elMsg.innerHTML = response.empty;
}

elInput.addEventListener('input', function(event) {
  var str = event.target.value;
  if(str == "") {
    elMsg.innerHTML = response.empty;
  } else if(checkPhoneNumber(str)) {
    elMsg.innerHTML = response.true;
  } else {
    elMsg.innerHTML = response.false;
  }
});
