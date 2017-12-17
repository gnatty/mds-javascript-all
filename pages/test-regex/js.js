'use strict';

// ======================== FUNCTION FOR FORM HANDLER ========================

/**
* Test a string with a regex pattern.
* @testRegex
* @param {String} pattern
* @param {String} str
* @return {Boolean} True or False on success.
*
*/
var testRegex = function testRegex(pattern, str) {
  var regex = new RegExp(pattern);
  return regex.test(str);
}

/**
* Add a balise span in label balise with a custom message.
* @addErrorMsg
* @param {String} labelFor
* @param {String} msg
* @return {Object} null
*
*/
var addErrorMsg = function addErrorMsg(labelFor, msg) {
  var strLabel = 'label[for="' + labelFor + '"]';
  var elDiv = document.querySelector(strLabel);
  if(!elDiv) {
    return null;
  }
  if(document.querySelector(strLabel + ' span')) {
    var elMsg = document.querySelector(strLabel + ' span');
    elMsg.innerHTML = msg;
  } else {
    var elMsg = document.createElement('span');
    elMsg.id = "spanError"
    elMsg.innerHTML = msg;
    elDiv.appendChild(elMsg);
  }
  return null;
}

/**
* Remove a balise span in label balise.
* @removeErrorMsg
* @param {String} labelFor
* @return {Object} null
*
*/
var removeErrorMsg = function removeErrorMsg(labelFor) {
  var strLabel = 'label[for="' + labelFor + '"]';
  if(document.querySelector(strLabel + ' span')) {
    document.querySelector(strLabel + ' span').remove();
  }
  return null;
}

// ======================== FORM HANDLER ========================

var elFormSubmit = document.querySelector('#submit')
elFormSubmit.addEventListener('click', function(e) {
  e.preventDefault();
  // ____
  var totalError    = 0;
  // ____ input value
  var frmLastName   = document.querySelector('#lastName').value;
  var frmFirstName  = document.querySelector('#firstName').value;
  var frmEmail      = document.querySelector('#email').value;
  var frmPassword   = document.querySelector('#password').value;
  // ____ regex pattern
  var regexPattern = {
    'firstName'     : { 
      'pattern' : /^[a-z-A-Z]{1,}$/g,
      'msg'     : 'msg error 1'
    },
    'lastName'      : {
      'pattern' : /^[a-z-A-Z]{1,}$/g,
      'msg'     : 'msg error 1'
    },
    'email'         : {
      'pattern' : /^[a-zA-Z-0-9]{1,}@[a-zA-Z-0-9]{1,}.[a-zA-Z-0-9]{1,}$/g,
      'msg'     : 'msg error 1'
    },
    'password'      : {
      'pattern' : /^[a-z-A-Z]{1,}$/g,
      'msg'     : 'msg error 1'
    }
  }
  // ____ test value
  if(!testRegex(regexPattern.lastName.pattern, frmLastName)) {
    addErrorMsg('lastName',     regexPattern.lastName.msg);
    ++totalError;
  } else {
    removeErrorMsg('lastName');
  }
  if(!testRegex(regexPattern.firstName.pattern, frmFirstName)) {
    addErrorMsg('firstName',    regexPattern.firstName.msg);
    ++totalError;
  } else {
    removeErrorMsg('firstName');
  }
  if(!testRegex(regexPattern.email.pattern, frmEmail)) {
    addErrorMsg('email',        regexPattern.email.msg);
    ++totalError;
  } else {
    removeErrorMsg('email');
  }
  if(!testRegex(regexPattern.password.pattern, frmPassword)) {
    addErrorMsg('password',     regexPattern.password.msg);
    ++totalError;
  } else {
    removeErrorMsg('password');
  }
  // ____ show message on success
  if(totalError === 0) {
    window.alert("your account has been created successfully you can now log in");
  }
  // .\ ____
})
