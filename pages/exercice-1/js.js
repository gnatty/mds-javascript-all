/*
* Generate a table with X and Y axis
* Cells are updated in range of 1 or 2 sec.
* For each cell update the color with a random hexa value.
* @GridGenerator
* @param {Number} dXAxis
* @param {Number} dYAxis
*/
function GridGenerator(dXAxis, dYAxis) {
  // _____
  var _getRandomInterval    = function() {
    return Math.round(Math.random() * (2 - 1) + 1) + '000';
  }
  var _getRandomColor       = function() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }
  // .\ _____
  // _____
  var oElTable                          = document.createElement('table');
  document.querySelector('#app').appendChild(oElTable);
  for(var i = 1; i < dXAxis; i += 1) {
    if(document.querySelector('[data-row-id="'+i+'"]') === null) {
      var oElRow                        = document.createElement('tr');
      oElRow.dataset.rowId              = i;
      oElTable.appendChild(oElRow);
    }  else {
      _isRendered                       = true;
    }
    var oElCell;
    for(var j = 1; j < dYAxis; j += 1) {
      if(document.querySelector('[data-cell-id="'+i+ '-' +j+ '"]') === null) {
        oElCell = document.createElement('td');
        oElCell.dataset.cellId          = i + '-' + j;
        oElCell.style.background        = _getRandomColor();
        oElRow.appendChild(oElCell);
      } else {
        oElCell = document.querySelector('[data-cell-id="'+i+ '-' +j+ '"]');
        oElCell.style.background        = _getRandomColor();
      }
    }
  }
  // _____
  setTimeout(function() {
    GridGenerator(dXAxis, dYAxis);
  }, _getRandomInterval());
}