const players = ["Red", "Yellow"];

const checkRow = (boardState) => {
  for (let player of players) {
    for (let col = 0; col < 4; col ++) {
      for (let row = 0; row < 6; row ++) {
        if (boardState[row][col] == player) {
          if ((boardState[row][col+1] == player) && (boardState[row][col+2] == player) && (boardState[row][col+3] == player)) {
            return player;
          }
        }
      }
    }
  }
};

const checkColumn = (boardState) => {
  for (let player of players) {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (boardState[row][col] == player) {
          if ((boardState[row+1][col] == player) && (boardState[row+2][col] == player) && (boardState[row+3][col] == player)) {
            return player;
          }
        }
      }
    }
  }
}


const checkDiagonalLeftToRight = (boardState) => {
  for (let player of players) {
    for (let col = 0; col < 4; col++) {
      for (let row = 3; row < 6; row++) {
        if (boardState[row][col] == player) {
          if ((boardState[row-1][col+1] == player) && (boardState[row-2][col+2] == player) && (boardState[row-3][col+3] == player)) {
            return player;
          }
        }
      }
    }
  }
};


const checkDiagonalRightToLeft = (boardState) => {
  for (let player of players)  {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (boardState[row][col] == player) {
          if ((boardState[row+1][col+1] == player) && (boardState[row+2][col+2] == player) && (boardState[row+3][col+3] == player)) {
            return player;
          }
        }
      }
    }
  }
};

module.exports = {
  checkRow,
  checkColumn,
  checkDiagonalLeftToRight,
  checkDiagonalRightToLeft
};