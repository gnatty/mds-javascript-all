/**
* Create an HTML object type of SVG.
* On click of path color the path to RED
* On mouse over color the path to BLUE
* On mouse out set the color to default.
* On mouse over show the current div name.
* @renderWorldMap
* @param {String} mapPath - SVG document path.
*/
var renderWorldMap = function renderWorldMap(mapPath) {
  // ____
  var addTooltip = function addTooltip(msg) {
    if(document.querySelector('#tooltip')) {
      document.querySelector('#tooltip').innerHTML = msg;
      return true;
    }
    var elDiv = document.createElement('div');
    elDiv.id = 'tooltip';
    elDiv.innerHTML = msg;
    document.querySelector('body').appendChild(elDiv);
    return true;
  }
  // ____
  var removeTooltip = function removeTooltip() {
    if(document.querySelector('#tooltip')) {
      document.querySelector('#tooltip').remove();
    }
    return true;
  }
  var elObject          = document.createElement('object');
  elObject.id           = 'worldMap';
  elObject.data         = mapPath;
  elObject.type         = 'image/svg+xml';
  elObject.domain = "";
  document.querySelector('body').appendChild(elObject);
  //
  elObject.addEventListener('load', function(e) {
    var pathList = elObject.getSVGDocument().querySelectorAll('path');
    pathList.forEach(function(elPath) {
      // 
      elPath.addEventListener('click', function(e) {
        e.target.style.fill = "red";
      });
      //
      elPath.addEventListener('mouseover', function(e) {
        e.target.style.fill = "blue";
        addTooltip(e.target.id);
      });
      //
      elPath.addEventListener('mouseout', function(e) {
        e.target.style.fill = "black";
        removeTooltip();
      });
    });
  })
  // .\____
}

/**
*
* @test
*
*/
var mapPath = "world-map.svg";
renderWorldMap(mapPath);