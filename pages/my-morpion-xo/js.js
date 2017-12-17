

/**
* MyMorpionXO
* @constructor
* @return {MyMorpionXO} this
*/
var MyMorpionXO = function MyMorpionXO() {
  this.board          = [];
  this.defaultPlayer  = 'X';
  this.activePlayer   = null;
  this.partState      = false;
  this.players        = {
    'X' : {
      'char'      : 'X',
      'points'    : '0'
    },
    'O' : {
      'char'      : 'O',
      'points'    : '0'
    },
  };
  this.seeds = [
    'PPPNNNNNN',
    'NNNPPPNNN',
    'NNNNNNPPP',
    'PNNPNNPNN',
    'NPNNPNNPN',
    'NNPNNPNNP',
    'PNNNPNNNP',
    'NNPNPNPNN'
  ];
  return this;
}

/**
* Initialize the Morpion game.
* @_initialize
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype._initialize = function() {
  this.activePlayer           = this.defaultPlayer;
  this.players['X'].points    = 0;
  this.players['O'].points    = 0;
  this.partState              = true;
  this._renderBoard();
  this._renderAlert('HIDE');
  var elPlayerScore         = document.querySelector('button[data-player-id="X"] span b');
  elPlayerScore.innerHTML   = 'O';
  elPlayerScore             = document.querySelector('button[data-player-id="O"] span b');
  elPlayerScore.innerHTML   = '0';
  return this;
}

/**
* Render the board in HTML
* @_renderBoard
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype._renderBoard = function() {
  this.board = [];
  var elCaseAll = document.querySelectorAll('.case'); 
  elCaseAll.forEach(function(elCase, index) {
    this.board.push({
      'caseId'      : index,
      'caseValue'   : 'N'
    });
    elCase.dataset.caseId = index;
    elCase.innerHTML = '';
  }.bind(this));
  return this;
}

/**
* Render an alert box message.
* @_renderAlert
* @param {Boolean} state - shown or hidden state
* @param {String} title - The message 
* @param {String} desc - The description
* @param {Boolean} victory - Disable the next round button.
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype._renderAlert = function(state, title, desc, victory = false) {
  var elAlert = document.querySelector('#alertSection');
  if(victory) {
    document.querySelector('#alertAction').style.visibility = 'hidden';
  } else {
    document.querySelector('#alertAction').style.visibility = 'visible';
  }
  if(state == 'SHOW') {
    elAlert.classList.remove('hide');
  }
  if(state == 'HIDE') {
    elAlert.classList.add('hide');
  }
  if(alert && desc) {
    var elAlertTitle        = document.querySelector('.alertTitle');
    var elAertDesc          = document.querySelector('.alertDesc');
    elAlertTitle.innerHTML  = title;
    elAertDesc.innerHTML    = desc;
  }
  return this;
}

/**
* Action binded with alert box message.
* @onClickAlert
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype.onClickAlert = function() {
  var elAlertBtn = document.querySelectorAll('#alertAction');
  elAlertBtn.forEach(function(elBtn) {
    elBtn.addEventListener('click', function(event) {
      switch(event.target.dataset.action) {
        case 'nextRound':
          this._renderAlert('HIDE');
          this._renderBoard();
          this.partState = true;
          break;
        case 'restartPart':
          this._initialize();
          break;
      }
    }.bind(this));
  }.bind(this));
  return this;
}

/**
* Get the current clicked case div and throw a callback
* @onClickAlert
* @callback {Object} Element div.
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype.onClickCase = function(callback) {
  var elCaseALL = document.querySelectorAll('.case');
  elCaseALL.forEach(function(elCase) {
    elCase.addEventListener('click', function(event) {
      callback(event.target);
    });
  });
  return this;
}

/**
* Run the Morpion game.
* @run
* @return {MyMorpionXO} this
*/
MyMorpionXO.prototype.run = function() {
  this._initialize();


  this.onClickCase(function(elCase) {
      if(this._isFreeCase(elCase.dataset.caseId) && this.partState) {
        this._setCaseValue(elCase.dataset.caseId, this.activePlayer, elCase);
        this._isWon(this.seeds, this._getBoardToString(), this.activePlayer, function(result) {
          if(result) {
            this._increasePlayerPoints(this.activePlayer);
            if(this.players[this.activePlayer].points == 3) {
              this._renderAlert('SHOW', this.activePlayer + ' won the part', 'bla bla bla.....', true);
            } else {
              this._renderAlert('SHOW', this.activePlayer + ' won the round', 'bla bla bla.....');
            }
            this.partState = false;
          }
        }.bind(this));
        this.activePlayer       = this.activePlayer=='X' ? 'O' : 'X';
        this._isRoundNull();
      }
     
  }.bind(this));


  this.onClickAlert();
  return this;
}

/**
* Update the value of a case on click.
* @_setCaseValue
* @param {Integer} caseId - The case id 
* @param {Char} playerChar - The player char
* @param {Object} elCase -  The case object element.
* @return {Boolean} True or false on success.
*/
MyMorpionXO.prototype._setCaseValue = function(caseId, playerChar, elCase) {
  var caseIndex = this.board.findIndex(function(aCase) {
    return aCase.caseId == caseId;
  });
  this.board[caseIndex].caseValue   = playerChar;
  elCase.innerHTML                  = this.activePlayer;
}

/**
* Get a String value of the current board state.
* @_getBoardToString
* @return {String} Board value as a String.
*/
MyMorpionXO.prototype._getBoardToString = function() {
  return this.board.map(function(aCase) {
    return aCase.caseValue;
  }).join('');
}

/**
* Check if a case is free or not.
* @_setCaseValue
* @param {Integer} caseId - The case id 
* @return {Boolean} True or false on success.
*/
MyMorpionXO.prototype._isFreeCase = function(caseId) {
  var aCase = this.board.find(function(aCase) {
    return aCase.caseId == caseId && aCase.caseValue == 'N';
  });
  if(!aCase) {
    return false;
  }
  return true;
}

/**
* Check if all case have been played then throw an alert box messagr.
* @_isRoundNull
* @return {Boolean} True or false on success.
*/
MyMorpionXO.prototype._isRoundNull = function() {
  var aResult = this.board.find(function(aCase) {
    return aCase.caseValue == 'N';
  });
  if(aResult) {
    return false;
  }
  if(this.partState) {
    this._renderAlert('SHOW', 'round null', 'bla bla bla.....');
    this.partState = false;
  }
  return true;
}

/**
* Check if a player win the current round.
* @_isWon
* @param {String} seeds - A valid winning seed as a string.
* @param {String} board - The current board state as a string.
* @param {String} activePlayer - The active player.
* @callback {Boolean} callback - True.
* @return {Boolean} True or false on success.
*/
MyMorpionXO.prototype._isWon = function(seeds, board, activePlayer, callback) {
  var output;
  seeds.forEach(function(seed, index) {
    output = 0;
    for(var i = 0; i < seed.length; i += 1) {
      if(seed[i] == 'P' && board[i] == activePlayer) {
        output += 1;
      }
    }
    if(output == 3) {
      callback(true);
    }
  });
  return this;
}

/**
* Increase a x player point by hes ID.
* @_increasePlayerPoints
* @param {String} playerId - The player ID.-
* @return {Integer} The new current point value of the selected player.
*/
MyMorpionXO.prototype._increasePlayerPoints = function(playerId) {
  this.players[playerId].points += 1;
  var elPlayerScore = document.querySelector('button[data-player-id="'+playerId+'"] span b');
  elPlayerScore.innerHTML = this.players[playerId].points;
  return this.players[playerId];
}



