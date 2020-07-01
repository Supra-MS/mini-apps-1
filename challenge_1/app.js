/* SVG */
const circle = `<svg width="53" height="55" viewBox="0 0 53 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M46.5 23.5C46.5 35.2015 37.4444 44.5 26.5 44.5C15.5556 44.5 6.5 35.2015 6.5 23.5C6.5 11.7985 15.5556 2.5 26.5 2.5C37.4444 2.5 46.5 11.7985 46.5 23.5Z" stroke="#F27404" stroke-width="5"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="53" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>`;

const cross = `<svg width="50" height="42" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 2L21.587 17.2331L48 38.8801M3 38.8801C3 40.8471 33 18.118 48 6.50757" stroke="#BEDB38" stroke-width="5"/>
</svg>`;



let playerTurn;

let playerScores = {
  'X': {
    'name': 'x',
    'score': 0,
    'color': '#bedb38'
  },

  'O': {
    'name': 'o',
    'score': 0,
    'color': '#f27404'
  },
  'ties': {
    'score': 0
  }
};


/* Get elements */
let cells = Array.from(document.getElementsByClassName('cell'));
let winnerMsg = document.getElementsByClassName('winnermsg');
let winnerPanel = document.getElementsByClassName('winner-panel');
let playerx = document.getElementsByClassName('playerx');
let playero = document.getElementsByClassName('playero');
let pxscore = document.getElementsByClassName('pxscore');
let poscore = document.getElementsByClassName('poscore');
let tiescore = document.getElementsByClassName('tiescore');
let playagain = document.getElementById('playagain');
let board = document.getElementById('board');
let reset = document.getElementById('reset');
let pxname = document.getElementsByClassName('pxname');
let poname = document.getElementsByClassName('poname');

/* On Initial Page load */
function init() {
  document.winner = null;
  var player1 = prompt('Please enter player 1 name. Use 7 chars or less for the player name!') || 'PlayerX';
  var player2 = prompt('Please enter player 2 name. Use 7 chars or less for the player name!') || 'PlayerO';
  player1 = player1.split('').slice(0, 7).join('');
  player2 = player2.split('').slice(0, 7).join('');

  playerScores['X'].name = player1;
  pxname[0].textContent = player1;

  playerScores['O'].name = player2;
  poname[0].textContent = player2;

  playerTurn = 'X';
  playerx[0].className += ' active';
  winnerPanel[0].className += ' invisible';

  cells.forEach((cell) => {
    clearCell(cell);
  });

}

function winnerInit() {
  if (document.winner === 'X') {
    playerTurn = 'X';
    playerx[0].className += ' active';
    winnerPanel[0].className += ' invisible';
  } else {
    playerTurn = 'O';
    playero[0].className += ' active';
    winnerPanel[0].className += ' invisible';
  }

  document.winner = null;

  cells.forEach((cell) => {
    clearCell(cell);
  });

}

function nextMove(cell) {
  if (document.winner !== null) {
    return;
  } else if (cell.innerText === '') {
    cell.textContent = playerTurn;
    switchPlayer(cell);
  } else {
    console.log('Cell is occupied');
  }
}

function switchPlayer(cell) {
  if (checkWinner(playerTurn)) {
    cell.style.color = playerScores[playerTurn]['color'];
    console.log('winner msg');
    winnerPanel[0].classList.remove('invisible');
    winnerPanel[0].className += ' visible';
    winnerMessage(playerTurn);
    document.winner = playerTurn;
  } else if (checkTie()) {
    cell.style.color = playerScores[playerTurn]['color'];
    console.log('tie msg');
    winnerPanel[0].classList.remove('invisible');
    winnerPanel[0].className += ' visible';
    winnerMsg[0].textContent = `It's a Tie. Play again!!`;
    playerScores['ties']['score']++;
    tiescore[0].textContent = playerScores['ties']['score'];

  } else if (playerTurn === 'X') {
    console.log('X turn');
    cell.style.color = '#bedb38';
    playerTurn = 'O';
    playero[0].className += ' active';
    playerx[0].classList.remove('active');
  } else {
    console.log('O turn');
    playerTurn = 'X';
    cell.style.color = '#f27404';
    playerx[0].className += ' active';
    playero[0].classList.remove('active');
  }
}

function checkWinner(move) {
	var result = false;
	if (checkCell(0, 1, 2, move) || checkCell(3, 4, 5, move) || checkCell(6, 7, 8, move)
		|| checkCell(0, 3, 6, move) || checkCell(1, 4, 7, move) || checkCell(2, 5, 8, move)
		|| checkCell(0, 4, 8, move) || checkCell(2, 4, 6, move)) {

		result = true;
  }

	return result;
}

function checkCell(a, b, c, move) {
	var result = false;
	if (getCell(a) === move && getCell(b) === move && getCell(c) === move) {
		result = true;
	}
	return result;

}

function getCell(number) {
	return document.getElementById('' + number).innerText;
}

function clearCell(cellValue) {
  cellValue.innerText = '';
}

function winnerMessage(player) {
  winnerMsg[0].textContent = ` !!😀 ${playerScores[player].name} Wins 😀!!  `;
  playerScores[player].score++;
  if (player === 'X') {
    pxscore[0].textContent = playerScores[player].score;
  } else {
    poscore[0].textContent = playerScores[player].score;
  }

}

function checkTie() {
	for(var i = 0; i < 9; i++) {
		if (getCell(i) === '') {
			return false;
		}
	}
	return true;
}

/* Reset */
reset.addEventListener('click', function() {
  init();
  winnerPanel[0].classList.remove('visible');
  winnerPanel[0].className += ' invisible';
  pxscore[0].textContent = playerScores['X'].score = 0;
  poscore[0].textContent = playerScores['O'].score = 0;
  tiescore[0].textContent = playerScores['ties'].score = 0;
});

playagain.addEventListener('click', function() {
  winnerInit();
  winnerPanel[0].classList.remove('visible');
  winnerPanel[0].className += ' invisible';
});




