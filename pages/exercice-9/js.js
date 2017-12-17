'use strict';

/*
*
* @checkPalindrome
* @param {String}
* @return {Boolean} True or False
*
*/
var checkPalindrome = function checkPalindrome(str) {
  if(typeof str != "string") {
    return false;
  }
  return str.split('').reverse().join('') == str;
}

/**
*
* @test
*
*/
var elInput   = document.querySelector('#str');
var elMsg     = document.querySelector('#msg');
var response  = {
  'empty'   : 'Write something and check if it\'s a Palindrome or not !',
  'true'    : 'True. It\'s a ... Palindrome !',
  'false'   : 'False. It\'s not a ... Palindrome !'
}

if(elInput.value == "") {
  elMsg.innerHTML = response.empty;
}

elInput.addEventListener('input', function(event) {
  var str = event.target.value;
  if(str == "") {
    elMsg.innerHTML = response.empty;
  } else if(checkPalindrome(str)) {
    elMsg.innerHTML = response.true;
  } else {
    elMsg.innerHTML = response.false;
  }
});

