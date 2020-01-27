// Four In A Row (2-player game)

// default game board is 7x6
var boardCols = 7;
var boardRows = 6; // not including row for input buttons
var maxCells = boardCols * boardRows;

var winningRun = 4; // need 4 in a row to win - note: auto win checking will remain at 4
var gameOver = false; // state for when the game ends
var redsTurn = true; // red goes first

// counters for pieces dropped
var redPieces = 0;
var bluePieces = 0;
var redTerritory = [];
var blueTerritory = [];

var winner = "";

///////////////////////////////////////

function newGame() {

	// reset variables and messages, create new board
	gameOver = false;
	document.getElementById("game-board").innerHTML = "";
	createGameBoard(boardCols, boardRows);
	document.getElementById("message-area").innerHTML = 
		"New game started - red goes first.";
	gameOver = false;
	redsTurn = true;
	redPieces = 0;
	bluePieces = 0;
	redTerritory = [];
	blueTerritory = [];
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
      		//td.appendChild(document.createTextNode(i+","+j)); // label cell for debug
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
	var nextPlayer = "";
	var discDiv = document.createElement('DIV'); // element to draw disc
	
	var emptyRow = boardRows-1; //starts with lowest row
	
	for (emptyRow; emptyRow>=0; emptyRow--) { 
	
		// checks if row is empty, otherwise continues to higher row
		if (gameOver==false && document.getElementById(emptyRow+","+col).innerHTML == "") {
			document.getElementById(emptyRow+","+col).innerHTML = "";
			
			// check whose turn it is to set colour
			if (redsTurn == true) {
				discColour = "red";
				//redTerritory.push("["+emptyRow+","+col+"]");
				redTerritory.push(emptyRow+","+col);
				redTerritory.sort();
				nextPlayer = "blue";
				redPieces++;
				redsTurn = false;
			} else {
				discColour = "blue";
				//blueTerritory.push("["+emptyRow+","+col+"]");
				blueTerritory.push(emptyRow+","+col);
				blueTerritory.sort();
				nextPlayer = "red";
				bluePieces++;
				redsTurn = true;
			};
			
			// set disc colour and add to cell
			discDiv.setAttribute("class", discColour+"-disc");
			document.getElementById(emptyRow+","+col).appendChild(discDiv);
			
			// for debug:
			//document.getElementById("message-area").innerHTML = "Disc dropped by "
			//	+discColour+" in col "+col+" - "+nextPlayer+" goes next. Total red: "
			//	+redPieces+". Total blue: "+bluePieces+". \n"+
			//	"Red territory: " +redTerritory+ ". Blue territory: "+blueTerritory+".";
			
			document.getElementById("message-area").innerHTML = "Next player: "
				+nextPlayer;
				
			break; // can exit for loop after first empty cell
		};
	
	};
	
	checkWin();

};

///////////////////////////////////////

function checkWin() {

	// for debug:
	//document.getElementById("win-message-area").innerHTML = "Checking win states.";
	
	var redDiscCounter = [0,0,0,0];
	var blueDiscCounter = [0,0,0,0];
	
	// cycle through each cell on the board as an anchor point
	for (i=0; i<boardRows; i++) {
		for (j=0; j<boardCols; j++) {
			
			// 4 win patterns possible: horizontal, vertical, down diagonal, up diagonal
			// coordinates: [row,col] = [i,j], which is the anchor point
			// note: currently this will always check 4 discs in a row
			
			// horizontal
			var h = [[i,j],[i,j+1],[i,j+2],[i,j+3]];
	
			// vertical
			var v = [[i,j],[i+1,j],[i+2,j],[i+3,j]];
	
			// down diagonal
			var dd = [[i,j],[i+1,j+1],[i+2,j+2],[i+3,j+3]];
	
			// up diagonal
			var ud = [[i,j],[i+1,j-1],[i+2,j-2],[i+3,j-3]];
			
			var allWinStates = [h,v,dd,ud];
			
			// reset counters for each anchor point
			redDiscCounter = [0,0,0,0];
			blueDiscCounter = [0,0,0,0];
			
			// cycle through territories to find matches in territory held
			for (k=0; k<redTerritory.length; k++) {
				for (l=0; l<allWinStates.length; l++) {
					for (m=0; m<allWinStates[l].length; m++) {
						
						// for debug:
						//document.getElementById("win-message-area").innerHTML = 
						//		"i="+i+",j="+j+",k="+k+",l="+l+" - h="+h+"; redcounter="
						//		+redDiscCounter+"; bluecounter="+blueDiscCounter;
						
						if (redTerritory[k]==allWinStates[l][m]) {
							redDiscCounter[l]++; // if match found, increment counter
							if (redDiscCounter[l] >= winningRun) { // winningRun set in header
								winner = "red";
								gameOver = true;
							};
						};
					}; //m loop
				}; // l loop
			}; // k loop
			
			for (k=0; k<blueTerritory.length; k++) {
				for (l=0; l<allWinStates.length; l++) {
					for (m=0; m<allWinStates[l].length; m++) {
					
						// for debug:
						//document.getElementById("win-message-area").innerHTML = 
						//		"i="+i+",j="+j+",k="+k+",l="+l+" - h="+h+"; redcounter="
						//		+redDiscCounter+"; bluecounter="+blueDiscCounter;
						
						if (blueTerritory[k]==allWinStates[l][m]) {
							blueDiscCounter[l]++; // if match found, increment counter
							if (blueDiscCounter[l] >= winningRun) { // winningRun set in header
								winner = "blue";
								gameOver = true;
							};
						};
					}; //m loop
				}; // l loop
			}; // k loop

		}; // j loop
	}; // i loop
	

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