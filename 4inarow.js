
// default game board is 7x6
var boardCols = 7;
var boardRows = 6; // not counting row for input buttons

var winningRun = 4; // need 4 in a row to win
var gameOver = false; // state for when the game ends

///////////////////////////////////////

function newGame() {

	gameOver = false;
	document.getElementById("game-board").innerHTML = "";
	createGameBoard(boardCols, boardRows);
	document.getElementById("message-area").innerHTML = "New game started.";
	
	
};

///////////////////////////////////////

function createGameBoard(cols, rows) {

	//document.getElementById("game-board").innerHTML = cols + "x" + rows + 
	//	" game board goes here.";
	
	var gameBoard = document.getElementById("game-board");
	
	var table = document.createElement('TABLE');
	
  	var tableBody = document.createElement('TBODY');
  	table.appendChild(tableBody);
  	
  	var cellDiv = document.createElement('DIV');

  	for (var i = 0; i < rows+1; i++) { // note: extra row for buttons
    	var tr = document.createElement('TR');
    	tableBody.appendChild(tr);

    	for (var j = 0; j < cols; j++) {
      		var td = document.createElement('TD');
      		//td.appendChild(document.createTextNode(i+","+j));
      		var cellDiv = document.createElement('DIV');
      		var button = document.createElement('BUTTON');
      		
      		if(i == rows){ // for button row (last row), insert buttons instead
      			//button.innerHTML = "Button "+i+","+j;
      			button.innerHTML = "Col "+j;
      			button.setAttribute("id", j);
      			button.setAttribute("onClick", "dropDisc("+j+")");
      			td.appendChild(button);
      			tr.appendChild(td);
      		} else {
      			//cellDiv.innerHTML = "Cell "+i+","+j;
      			cellDiv.innerHTML = "O";
      			cellDiv.setAttribute("id", i+","+j);
      			td.appendChild(cellDiv);
      			tr.appendChild(td);
      		};
    	};
  	};
  	
  	gameBoard.appendChild(table);
	
};

///////////////////////////////////////

function dropDisc(col) {

	document.getElementById("message-area").innerHTML = "Disc dropped in col "+col;
	document.getElementById("5,"+col).innerHTML = "X";

};

///////////////////////////////////////


