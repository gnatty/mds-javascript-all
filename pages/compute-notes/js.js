'use strict';

/**
*
* @computeNotes
* @param {Array} arr
* @return double 
*
*/
var computeNotes = function computeNotes(arr) {
  if(!Array.isArray(arr)) {
    return false;
  }
  var output = 0;
  var breakk = false;
  arr.forEach(function(value) {
    if(parseFloat(value))
      output += parseFloat(value);
    else
      breakk = true;
  });
  if(breakk) {
    return false;
  }
  if(arr.length == 1) {
    return output;
  }
  return output / (arr.length);
}

/**
*
* @test
*
*/

var response    = {
  'false'   : 'The value aren\'t valid note.. Please try again !',
  'string'  : 'The average of all note is : ',
}

var elMsg       = document.querySelector('#msg');
var btnAddNote  = document.querySelector('#btnAddNote');
var btnAverage  = document.querySelector('#btnAverage');

btnAddNote.addEventListener('click', function() {
  var elInput = document.createElement('input');
  elInput.type = "text";
  document.querySelector('#noteList').appendChild(elInput);
});

btnAverage.addEventListener('click', function() {
  // ____
  var elNoteList = document.querySelectorAll('input');
  var noteArr = [];
  // ____
  elNoteList.forEach(function(elNote) {
    noteArr.push(elNote.value);
  });
  // ____ 
  var tryResult = computeNotes(noteArr);
  if(tryResult === false) {
    elMsg.innerHTML = response.false;
  } else {
    elMsg.innerHTML = response.string + "" + tryResult;
  }
  // .\ ____
});
