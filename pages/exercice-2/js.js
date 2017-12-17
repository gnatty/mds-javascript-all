/*
* A DrawBar
* @constructor
* @param {Integer} dSum - The total number of DrawBar.
* @param {Integer} dNbr - The current state in % of DrawBar. 
* @return {DrawBar} this
*/
var DrawBar = function DrawBar(dSum, dNbr) {
  this.oLoadingBar;
  this.oLoadingBarCursor;
  this.dSum           = dSum;
  this.dNbr           = dNbr;
  this.oBarSettings   = {
    'background' : '#f5f2f0',
    'foreground' : '#F43C3C',
    'height'     : '46px'
  };
  return this;
}

/**
* Run the DrawBar.
* @run
* @return {DrawBar} this
*/
DrawBar.prototype.run = function() {
  this._render();
  this._setCursor(this.dSum, this.dNbr);
  return this;
}

/**
* Initialize the DrawBar.
* @_initialize
* @return {DrawBar} this
*/
DrawBar.prototype._initialize = function() {
  this.oLoadingBar                          = document.createElement('div');
  this.oLoadingBar.id                       = 'loadingBar';
  this.oLoadingBar.style.width              = '100%';
  this.oLoadingBar.style.height             = this.oBarSettings.height;
  this.oLoadingBar.style.background         = this.oBarSettings.background;

  this.oLoadingBarCursor                    = document.createElement('div');
  this.oLoadingBarCursor.id                 = 'cursor';
  this.oLoadingBarCursor.style.width        = '0%';
  this.oLoadingBarCursor.style.height       = this.oBarSettings.height;
  this.oLoadingBarCursor.style.background   = this.oBarSettings.foreground;
  return this;
}

/**
* Render the DrawBar.
* @_render
* @return {DrawBar} this
*/
DrawBar.prototype._render = function() {
  this._initialize();
  var oElApp = document.querySelector('#app');
  this.oLoadingBar.appendChild(this.oLoadingBarCursor);
  oElApp.appendChild(this.oLoadingBar);
  return this;
}

/**
* Set the state of the cursor.
* @_setCursor
* @param {Integer} dSum - The total number of DrawBar.
* @param {Integer} dNbr - The current state in % of DrawBar. 
* @return {DrawBar} this
*/
DrawBar.prototype._setCursor = function(dSum, dNbr) {
  var dCursor = parseFloat(dNbr / dSum * 100).toFixed(0);
  this.oLoadingBarCursor.style.width = dCursor + '%';
  return this;
}

/**
*
* @test
*
*/
