
//Give the user the option of having 1 player with the computer, or 2 players without the computer
//Add a reset button
//SUPER BONUS
//Give the user the option of an Nth size grid.
//ULTRA BONUS
// Make the computer try and win.
$(document).ready(function() {





	$(".difficulty :button").click(function() {
		var diff = $(this).val();
		console.log(diff);

		if (diff == "easy"){
			rowSize = 3;
			gridSize = rowSize * rowSize;
		}else if(diff == "med"){
			rowSize = 4;
			gridSize = rowSize * rowSize;
		}else if(diff == "hard"){
			rowSize = 5;
			gridSize = rowSize * rowSize;
		}
			var square-width = (100 / rowSize);
			square-width.css()

	});

		for (var i = 0; i < gridSize.length; i++){
			var html = "<div class ='mg-tile'>";
					html += "<div class='mg-tile-inner unmatched flipped'>";
						html += "<div class='mg-tile-outside'>" + "</div>";
						html += "<div class='mg-tile-inside'>" + gridArray[i] + "</div>";
					html += "</div>";
				html += "</div>";
				$("#mg-contents").append(html);

		}

					<div id="row1">
				<button disabled class="left square empty" id="a1"></button>
				<button disabled class="square empty" id="a2"></button>
				<button disabled class="square empty" id="a3"></button>
			</div>


var winners = 
[
	['a1','a2','a3'],
	['b1','b2','b3'],
	['c1','c2','c3'],
	['a1','b1','c1'],
	['a2','b2','c2'],
	['a3','b3','c3'],
	['a1','b2','c3'],
	['c1','b2','a3']
];
var playerOneMarkings = [];
var playerTwoMarkings = [];
var whosTurn = 1;
var gameHeader = $('#game-header');
var computer;
//var playerMode;
var winsPlayerOne;
var winsPlayerTwo;

	$("#one-player").click(function() {

		computer = true;
	//playerMode = 1;
	$('#game-header').html('Your turn!');

	var buttons = $("button");
	for(i=0; i<buttons.length; i++){
		buttons[i].disabled = false;
	}
	})


	$("#two-players").click(function() {
		computer = false;
		//playerMode = 2;
		$(gameHeader).html('Player one turn!');
		var buttons = $("button");
		for(i=0; i<buttons.length; i++){
			buttons[i].disabled = false;
	}
	})

$(".square").click(function() {


	if ($(this).html("")){
		//Put a symbol in... X or O?
		if(whosTurn == 1){
			//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
			$(this).html('X');
			whosTurn = 2;
			$(gameHeader).html("It is Player 2's turn");
			gameHeader.className = 'player-two';
			//Get rid of class 'empty', and add who took the square
			$(this).removeClass('empty');
			$(this).addClass('p1');
			playerOneMarkings.push($(this).attr("id"));
			checkWin();
			//Only run computersTurn, if the user chose 1 player
			if(computer == true){
				// setTimeout(computersTurn, 3000);
				computersTurn();
			}
		}else{
		//Otherwise run players turn.
			//It has to be O's turn. Put an O in.
			$(this).html('O');
			whosTurn = 1;
			$(gameHeader).html("It is Player 1's turn");
			gameHeader.className = 'player-one';
			$(this).removeClass('empty');
			$(this).addClass('p2');
			playerTwoMarkings.push($(this).attr("id"));
			checkWin();
		}
	}else{
		$(gameHeader).html("This box is taken");
		$(gameHeader).addClass("red");
	}
	checkWin();
});

function computersTurn(){
	//It has to be O's turn. Put an O in.
	// Get a random, empty square.
	var arrayOfEmptySquares = $('.empty');
	var randomEmptySquareIndex = Math.floor(Math.random() * arrayOfEmptySquares.length);
	var element = arrayOfEmptySquares[randomEmptySquareIndex];
	$(element).html("0");
	whosTurn = 1;
	$(gameHeader).html("It is Player 1's turn");
	$(gameHeader).addClass('player-one');
	$(element).removeClass('empty');
	$(element).addClass('p2');
	playerTwoMarkings.push($(element).attr("id"));	
	console.log(playerTwoMarkings);
	checkWin();
}

function checkWin(){
	//Define a variable, and if it gets to 3, then we have a winner. If it doesn't, the row is not complete.
	var rowCount = 0;
	var playerTwoRowCount = 0;
	var thisWinCombination;
	//Loop through all winning possibilities. RowCount needs to restart each time. 
	for(i=0; i<winners.length; i++){
		rowCount = 0;
		playerTwoRowCount = 0;
		thisWinCombination = winners[i];
		//Now, let's check if all the elemtns in the winners array, exist in the current player array (playerOneMarkings or playerTwoMarkings)
		for(j=0; j<thisWinCombination.length; j++){
			//Check if this square of the win combo we are on, is in the player's marking
			if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1){
				//HIT!!!!
				rowCount++;
			}
			if(playerTwoMarkings.indexOf(thisWinCombination[j]) > -1){
				//HIT!!!!
				playerTwoRowCount++;
			}

		}
		if(rowCount === 3){
			//Player 1 won!!!!
			gameOver(thisWinCombination, 1);
		}else if(playerTwoRowCount === 3){
			gameOver(thisWinCombination, 2);			
		}
	}
}


function gameOver(combo, playerWhoWon){
	for(i=0; i<combo.length; i++){
		// console.log(combo[i]);
		document.getElementById(combo[i]).classList.add('winner');
	}
	$(gameHeader).html("Player" + playerWhoWon + ' , won the game!');

	var buttons = $("button");
	for(i=0; i<buttons.length; i++){
		buttons[i].disabled = true;
	}
	//Give the user a button to click on, to reset the board. When they click on it

	// Update wins counter for the winning playerOneMarkings
	if(playerWhoWon==1){
		winsPlayerOne++;
	}else{
		winsPlayerTwo++;
	}
	$('#play-again-button').prop("disabled", false);
	$('#play-again').css("display", "block");
}

function resetGame(){
	// Clear Player Arrays
	playerOneMarkings = [];
	playerTwoMarkings = [];
	
	var buttons = $(".square");
	// Clear innerHTML of squares
	for(i=0; i<buttons.length; i++){
		$(buttons[i]).html('');
		$(buttons[i]).addClass('empty');
		$(buttons[i]).removeClass('winner');
	}
	//Enable the one and two player buttons
	$('#one-player').css("disabled", false);
	$('#two-players').css("disabled", false);	
	//hide the play again button
	$('#play-again').css("display", "none");
}

var squareWidth = $('#a1').width();
var squares = $('.square');
for(i=0; i<squares.length; i++){
	squares[i].style.height = squareWidth + 'px';
}
});
