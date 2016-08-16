console.log('tic tac toe js');

// - functions:
// 1. sendBoard
// 2. initialise
// 3. checkDiagonals
// 4. checkRows
// 5. checkColumns

var gameStateObj = {
  boardArray : [],
  movesRemaining : [],
  boardSize : null,
  playerCharacters : ['X', 'O'],
  playerWins : [],
  numberOfPlayers : 2,
  turn : 0,
  win : 0
};

var playerTracker = {
  playerCharacters : ['X', 'O'],
  playerWins : [],
  numberOfPlayers : 2
}

var boardValueInput = document.getElementById('board-value');
var createBtn = document.getElementById('create-btn');

var tableSpace = document.getElementById('myTable');
var resultSpace = document.getElementById('resultSpace');

var reinitBtn = document.getElementById('reinit-button');

// for(i=0; i<playerWins; i++){
//   var winspace??
// }

reinitBtn.addEventListener('click', function() {

  var boardSize = boardValueInput.value;
  clearBoard(gameStateObj);
  gameStateObj = reinitialise(boardSize, gameStateObj);
  console.log(gameStateObj);
  console.log('in [click] reinitialise');
  gameStateObj = sendBoard(gameStateObj);
  return gameStateObj;

} );
//need stuff for changing color when hovering
tableSpace.addEventListener('click', function(event) {


  var coordinates = event.target.id;
  var coordArray = coordinates.split('');
  var squareID = [coordArray[1], coordArray[3]];

  if(!gameStateObj.win){
    gameStateObj = moveStateUpdate(gameStateObj, squareID);
    clearBoard(gameStateObj);
    gameStateObj = sendBoard(gameStateObj);
    var rowWin = checkRows(gameStateObj);
    var colWin = checkColumns(gameStateObj);
    var diagWin = checkDiagonals(gameStateObj);
    if(rowWin){
      document.getElementById('result-space').innerHTML = rowWin + ' is the WINNER';
      gameStateObj.win = 1;
      var indexOfWinner = gameStateObj.playerCharacters.indexOf(rowWin);
      gameStateObj.playerWins[indexOfWinner]++;
    }
    if(colWin){
      document.getElementById('result-space').innerHTML = colWin + ' is the WINNER';
      gameStateObj.win = 1;
      var indexOfWinner = gameStateObj.playerCharacters.indexOf(colWin);
      gameStateObj.playerWins[indexOfWinner]++;
    }
    if(diagWin){
      document.getElementById('result-space').innerHTML = diagWin + ' is the WINNER';
      gameStateObj.win = 1;
      var indexOfWinner = gameStateObj.playerCharacters.indexOf(diagWin);
      gameStateObj.playerWins[indexOfWinner]++;
    }

    // for(i=0; i<playerWins; i++){
    //   win reult innerHTML
    // }
    // var winsX = document.getElementById('wins-0');
    // var wins0 = document.getElementById('wins-1');
    document.getElementById('wins-0').innerHTML = gameStateObj.playerWins[0];
    document.getElementById('wins-1').innerHTML = gameStateObj.playerWins[1];
  }
} );

createBtn.addEventListener('click', function() {

  var boardSize = boardValueInput.value;

  gameStateObj = initialise(boardSize);
  console.log(gameStateObj);
  console.log('in [click] initialise');
  gameStateObj = sendBoard(gameStateObj);
  return gameStateObj;

} );

var clearBoard = function(gameStateObj) {
  console.log('in clear board');
  theBoardSize = Number(gameStateObj.boardSize);

  for(i=0; i<theBoardSize; i++){
    document.getElementById("myTable").deleteRow(0);
  }
}

var sendBoard = function(gameStateObj){

  boardSize = gameStateObj.boardSize;
  var i=0;
  var j=0;

  console.log('got to sendBoard');
  for(i=0; i<boardSize; i++){
    var newRow = document.createElement('TR');
    newRow.setAttribute("id", 'myRow' + i);
    newRow.setAttribute("class", 'row');
    document.getElementById('myTable').appendChild(newRow);

    for(j=0; j<boardSize; j++){
      var newCell = document.createElement('TD');
      newCell.setAttribute("id", 'i' + i + 'j' + j );
      newCell.setAttribute("class", 'cell');
      document.getElementById('myRow' + i).appendChild(newCell);
      document.getElementById('i'+i+'j'+j).innerHTML = gameStateObj.boardArray[i][j];
    }
  }
  return gameStateObj;
}

var reinitialise = function(userBoardSize, gameStateObj) {

  console.log('in reinitialise');
  gameStateObj.boardArray = [];
  gameStateObj.movesRemaining = [];
  gameStateObj.boardSize = userBoardSize;
  gameStateObj.win = 0;
  gameStateObj.turn = 0;
  //randomise the order later..

  if (!userBoardSize){
    gameStateObj.boardSize = 3
  }

  var movesSize = gameStateObj.boardSize*gameStateObj.boardSize;
  gameStateObj.movesRemaining[0] = Math.ceil(movesSize/2);
  gameStateObj.movesRemaining[1] = Math.floor(movesSize/2);

  var boardArr = gameStateObj.boardArray;
  var boardSizer = gameStateObj.boardSize;

  for(i=0; i<boardSizer; i++){
    boardArr.push([]);
  }
  for(i=0; i<boardSizer; i++){
    for(j=0; j<boardSizer; j++){
      boardArr[i].push(null);
    }
  }
  return gameStateObj;
}

var initialise = function(userBoardSize) {

  var gameStateObj = {
    boardArray : [],
    movesRemaining : [],
    boardSize : userBoardSize,
    win : 0,
    playerWins : [],
    playerCharacters : ['X', 'O'],
    numberOfPlayers : 2,
    turn : 0
    //randomise the order later..
  };

  for(i=0; i<gameStateObj.numberOfPlayers; i++){
    gameStateObj.playerWins[i] = 0;
  }

  if (!userBoardSize){
    gameStateObj.boardSize = 3
  }

  var movesSize = gameStateObj.boardSize*gameStateObj.boardSize;
  gameStateObj.movesRemaining[0] = Math.ceil(movesSize/2);
  gameStateObj.movesRemaining[1] = Math.floor(movesSize/2);

  var boardArr = gameStateObj.boardArray;
  var boardSizer = gameStateObj.boardSize;

  for(i=0; i<boardSizer; i++){
    boardArr.push([]);
  }
  for(i=0; i<boardSizer; i++){
    for(j=0; j<boardSizer; j++){
      boardArr[i].push(null);
    }
  }
  return gameStateObj;
}

var checkDiagonals = function(gameStateObj) {

  var board = gameStateObj.boardArray;
  var setWinner = null;
  boardSize = gameStateObj.boardSize;
  var j;

  var setWinner = board[0][0];

  for(i=0; i<boardSize; i++){
    if(board[i][i] != setWinner){
      setWinner = null;
    }
  }
  if(setWinner){
    return setWinner;
  }
  else {
    setWinner = board[0][boardSize-1];
    j=boardSize-1;
    for(i=0; i<boardSize; i++){
      if(board[i][j] != setWinner){
        setWinner = null;
      }
      j--;
    }
  }
  return setWinner;
}

var checkColumns = function(gameStateObj) {

  var board = gameStateObj.boardArray;
  var setWinner = null;
  var j=0;
  var i=0;
  boardSize = gameStateObj.boardSize;
    //row checker
    //while setWinner is non-null OR while the loop is maximised
    while(!setWinner && ((i<(boardSize)&&(j<(boardSize))))){
      //enter the nested for loops..
      for (i=0; i<boardSize; i++){
      j=0;
        //set setWinner to the first square of a row
//        var setWinner = board[i][j];
        //while setWinner is non-null..
        while(!setWinner && (j<(boardSize))){
          //set setWinner to the first square of a row
          setWinner = board[j][i];
          //cycle through the row..
          for(j=0; j<boardSize; j++){
            //..setting setWinner as null if not equal to the first, or any thereafter.
            if(board[j][i] != setWinner){
              setWinner = null;
            }
          //loop back to for and complete the row
          }
        }
      }
    }
    return setWinner;
}

var checkRows = function(gameStateObj) {

  var board = gameStateObj.boardArray;
  var setWinner = null;
  var j=0;
  var i=0;
  boardSize = gameStateObj.boardSize;
    //row checker
    //while setWinner is non-null OR while the loop is maximised
    while(!setWinner && ((i<(boardSize)&&(j<(boardSize))))){
      //enter the nested for loops..
      for (i=0; i<boardSize; i++){
      j=0;
        //set setWinner to the first square of a row
        //while setWinner is non-null..
        while(!setWinner && (j<(boardSize))){
          //set setWinner to the first square of a row
          setWinner = board[i][j];
          //cycle through the row..
          for(j=0; j<boardSize; j++){
            //..setting setWinner as null if not equal to the first, or any thereafter.
            if(board[i][j] != setWinner){
              setWinner = null;
            }
          //loop back to for and complete the row
          }
        }
      }
    }
    return setWinner;
}

var moveStateUpdate = function(gameStateObj, squareID) {

  charLength = gameStateObj.playerCharacters.length;
  if(gameStateObj.turn === gameStateObj.playerCharacters.length){
    gameStateObj.turn = 0;
  }

  var turnIndex =  gameStateObj.turn;
  charTurn = gameStateObj.playerCharacters[turnIndex];
  XCoord = Number(squareID[0]);
  YCoord = Number(squareID[1]);
  if(gameStateObj.boardArray[XCoord][YCoord]===null){
    gameStateObj.boardArray[XCoord][YCoord] = charTurn;
    gameStateObj.turn+=1;
  }

  return gameStateObj;
}
