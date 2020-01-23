
// default game board is 7x6
var boardCols = 7;
var boardRows = 6; // not including row for input buttons
var maxCells = boardCols * boardRows;

var winningRun = 4; // need 4 in a row to win
var gameOver = false; // state for when the game ends
var redsTurn = true; // red goes first

// counters for pieces dropped
var redPieces = 0;
var bluePieces = 0;

var winner = "";

///////////////////////////////////////

function newGame() {

	// reset variables and messages, create new board
	gameOver = false;
	document.getElementById("game-board").innerHTML = "";
	createGameBoard(boardCols, boardRows);
	document.getElementById("message-area").innerHTML = "New game started.";
	gameOver = false;
	redsTurn = true;
	redPieces = 0;
	bluePieces = 0;
	winner = "";
	
};

///////////////////////////////////////

function createGameBoard(cols, rows) {

	// creates game board at table, each cell has id in format "0,0"
	
	var gameBoard = document.getElementById("game-board");
	
	var table = document.createElement('TABLE');
	
  	var tableBody = document.createElement('TBODY');
  	table.appendChild(tableBody);
  	
  	var cellDiv = document.createElement('DIV');

  	for (var i = 0; i < rows+1; i++) { // note: extra row included for buttons
    	var tr = document.createElement('TR');
    	tableBody.appendChild(tr);

    	for (var j = 0; j < cols; j++) {
      		var td = document.createElement('TD');
      		//td.appendChild(document.createTextNode(i+","+j));
      		var cellDiv = document.createElement('DIV');
      		var button = document.createElement('BUTTON');
      		
      		if(i == rows){ // for button row (last row), insert buttons instead
      			//button.innerHTML = "Button "+i+","+j;
      			button.innerHTML = "Drop";
      			button.setAttribute("id", j);
      			button.setAttribute("onClick", "dropDisc("+j+")");
      			td.appendChild(button);
      			tr.appendChild(td);
      		} else { // create blank cells
      			//cellDiv.innerHTML = "Cell "+i+","+j;
      			//cellDiv.innerHTML = "&nbsp;";
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

	var discColour = "";
	var discDiv = document.createElement('DIV'); // element to draw disc
	
	var emptyRow = boardRows-1; //starts with lowest row
	
	for (emptyRow; emptyRow>=0; emptyRow--) { 
	
		// checks if row is empty, otherwise continues to higher row
		if (document.getElementById(emptyRow+","+col).innerHTML == "") {
			document.getElementById(emptyRow+","+col).innerHTML = "";
			
			// check whose turn it is to set colour
			if (redsTurn == true) {
				discColour = "red";
				redPieces++;
				redsTurn = false;
			} else {
				discColour = "blue";
				bluePieces++;
				redsTurn = true;
			};
			
			// set disc colour and add to cell
			discDiv.setAttribute("class", discColour+"-disc");
			document.getElementById(emptyRow+","+col).appendChild(discDiv);
			document.getElementById("message-area").innerHTML = "Disc dropped by "
				+discColour+" in col "+col+". Total red: "+redPieces+". Total blue: "
				+bluePieces+".";
			break; // can exit for loop after first empty cell
		};
	
	};
	
	checkWin();

};

///////////////////////////////////////

function checkWin() {

	// TODO: add win state checking

	// if total pieces dropped reach mak number of cells, game is over
	if ((redPieces+bluePieces) >= (maxCells)) {
		gameOver = true;
	};

	// declare if there is a winner or draw
	if (gameOver == true && winner == ""){
		document.getElementById("message-area").innerHTML = "Game over - draw!"
	} else if (gameOver == true && winner != "") {
		document.getElementById("message-area").innerHTML = "Game over - "+winner+" wins!"
	};

};

///////////////////////////////////////


