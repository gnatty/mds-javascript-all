/**
* BattleShip Game.
* @constructeur
* @param {Array[][]} aMap Array Map.
* @return {Battleship} this
*/
var Battleship = function Battleship(aMap) {
  this._aMap            = aMap;
  this._currentShip     = [];
  this._shipList        = [];
  this._shipBackground  = '#D24D57';
  this._alphabet        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  this._shipTypeList    = [
    [{
      'name': 'Torpilleur',
      'size': '2'
    }],
    [{
      'name': 'Sous-marin',
      'size': '3'
    }],
    [{
      'name': 'Croiseur',
      'size': '4'
    }],
    [{
      'name': 'Porte-avion',
      'size': '5'
    }]
  ];
  return this;
}

/**
* Run the BattleShip Game.
* @run
* @return {Battleship} this
*/
Battleship.prototype.run = function() {
  var oElTitle          = document.createElement('h1');
  oElTitle.innerHTML    = 'Battleship';
  document.querySelector('#app').appendChild(oElTitle);

  this._initializeShip().then(function(resolve) {

    this._renderScoreboard();

    this._renderMap(function(callback) {
      this._onClickCase(function(oElCase) {
        this._actionCase(oElCase);
      }.bind(this));
    }.bind(this));

  }.bind(this), function(reject) {

    // Throw error board Malformed.
    console.log(reject);

  }.bind(this));
  return this;
}

/**
* Update the value on a specific case.
* @_actionCase
* @param {Object} oElCase Current clicked case.
* @return {Battleship} this
*/
Battleship.prototype._actionCase = function(oElCase) {
  var iValue = oElCase.dataset.case;
  switch(iValue) {
    case '-1':
    break;
    case '0': 
      oElCase.innerHTML = 'X';
    break;
    default:
      oElCase.style.background = this._shipBackground;
      this._updateCurrentShip(oElCase);
      console.table(this._currentShip);
    break;
  }
  return this;
}

/**
* Reduce the size of a ship on matching case.
* @_updateCurrentShip
* @param {Object} oElCase Current clicked case.
* @return {Battleship} this
*/
Battleship.prototype._updateCurrentShip = function(oElCase) {
  var ship = this._currentShip.find(function(ship) {
    return ship.key == oElCase.dataset.case;
  });
  if(!ship) {
    return false;
  }
  oElCase.dataset.case     = -1;
  ship.size               -= 1;
  if(ship.size == 0) {
    document.querySelector('li[data-key="' + ship.key + '"]').classList.add('del');
  }
  this._isWon();
  return this;
}

/**
* Check if all ship are destroyed.
* Show an alert with " you won ".
* @_isWon
* @return {Battleship} this
*/
Battleship.prototype._isWon = function() {
  var search = this._currentShip.filter(function(ship) {
    return ship.size > 0;
  });
  if(search.length === 0) {
    window.alert('YOU WON !');
  }
  return this;
}

/**
* Render the socre board interface.
* @_renderScoreboard
* @return {Battleship} this
*/
Battleship.prototype._renderScoreboard = function() {
  var oElScoreboard     = document.createElement('ul');
  var oElSbTitle        = document.createElement('li');
  oElSbTitle.innerHTML  = 'Available Ship';
  oElScoreboard.appendChild(oElSbTitle);
  oElScoreboard.id      = 'scoreboard';
  this._currentShip.forEach(function(ship) {
    var oElShip         = document.createElement('li');
    oElShip.dataset.key = ship.key;
    oElShip.innerHTML   = ship.name;
    oElScoreboard.appendChild(oElShip);
  });
  document.querySelector('#app').appendChild(oElScoreboard);
  return this;
}


/**
* @_getShipType
* @param {Integer} size - size of ship.
* @return {Undefined|Object} - if there is no result / if a result is found.
*/
Battleship.prototype._getShipType = function(size) {
  var findShipSize = function findShipSize(ship) {
    return ship[0].size == size;
  };
  var result = this._shipTypeList.find(findShipSize);
  if(result) {
    return result[0];
  }
  return result;
}

/**
* Initialize the given map on constructor.
* @_initializeShip
* @return {Promise}
*/
Battleship.prototype._initializeShip = function() {
  return new Promise( function(resolve, reject) {
    for(var i = 0; i < this._aMap.length; i += 1) {
      for(var j = 0; j < this._aMap[i].length; j += 1) {
        // Get all ship.
        var caseValue = this._aMap[i][j];
        if(caseValue > 0) {
          if(!this._currentShip[caseValue]) {
            this._currentShip[caseValue] = 1;
          } else {
            this._currentShip[caseValue] += 1;
          }
        }
        // .\Get all ship.
        // Last insertion, check if valid ship.
        if( ((j+1) === this._aMap[i].length) && ((i+1) === this._aMap.length) ) {
          var currentShip = this._currentShip;
          this._currentShip = [];
          currentShip.forEach(function(size, index) {
            var getShipType = this._getShipType(size);
            if(getShipType) {
              this._currentShip.push({
                'key'     : index,
                'size'    : getShipType.size,
                'name'    : getShipType.name
              });
              if(index === (currentShip.length-1)) {
                // OK
                resolve(200);
              }
            } else {
              // Throw error board Malformed.
              reject(404);
            }
          }.bind(this));
        }
        // .\Last insertion, check if valid ship.
      }
    }
  }.bind(this));
}

/**
* Render the map as html table.
* @_renderMap
* @return {Callback}
*/
Battleship.prototype._renderMap = function(callback) {
  var oElMap = document.createElement('table');
  document.querySelector('#app').appendChild(oElMap);
  for(var i = 0; i < this._aMap.length; i += 1) {
    var oElTr = document.createElement('tr');
    // Row number.
    if(i === 0) {
      var oElTrNumber = document.createElement('tr');
      oElMap.appendChild(oElTrNumber);
    }
    for(var j = 0; j < this._aMap[i].length; j += 1) {
      // Rajoute un bateau à la liste.
      if(this._aMap[i][j] > 0) {
        this._shipList.push(this._aMap[i][j]);
      }
      // case letter.
      if(j === 0) {
        var oElLetterCase = document.createElement('td');
        oElLetterCase.innerHTML = this._alphabet[i];
        oElTr.appendChild(oElLetterCase);
      }
      // case number.
      if(i === 0) {
        if(j === 0) {
          oElTrNumber.appendChild(document.createElement('td'));
        }
        var oElNumberCase = document.createElement('td');
        oElNumberCase.innerHTML = j;
        oElTrNumber.appendChild(oElNumberCase);
      }
      // case normale.
      var oElTd             = document.createElement('td');
      oElTd.dataset.case    = this._aMap[i][j];
      oElTd.id              = 'case';
      oElTr.appendChild(oElTd);
    }
    oElMap.appendChild(oElTr);
    if((i+1) === this._aMap.length) {
      callback(true);
    }
  }
}

/**
* Action when when a board case is clicked.
* @_onClickCase
* @return {Callback}
*/
Battleship.prototype._onClickCase = function(callback) {
  var oElCaseAll = document.querySelectorAll('#case');
  oElCaseAll.forEach(function(oElCase) {
    oElCase.addEventListener('click', function(event) {
      callback(event.target);
    });
  });
}
