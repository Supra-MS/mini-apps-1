import React from 'react';
import Board from './Board.jsx';
import SetBoard from '../utils/SetBoard.js';
import { checkRow, checkColumn, checkDiagonalLeftToRight, checkDiagonalRightToLeft } from '../utils/CheckWinnerMoves.js';

let gameBoard = SetBoard();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: gameBoard,
      winner: "",
      hasWinner: false,
      isTie: false,
      playerTurn: "Red",
      playerRedScore: 0,
      playerYellowScore: 0,
      tieScore: 0,
      noOfNull: 41
    }

    this.handleClick = this.handleClick.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.displayWinnerMessage = this.displayWinnerMessage.bind(this);
    this.checkTie = this.checkTie.bind(this);
    this.reset = this.reset.bind(this);
    this.playagain = this.playagain.bind(this);
  }

  switchPlayer() {
    if (this.state.playerTurn === "Red" ) {
      this.setState({
        playerTurn: "Yellow"
      })
    } else {
      this.setState({
        playerTurn: "Red"
      })
    }
  }

  checkWinner() {
    const { boardState, playerRedScore, playerYellowScore } = this.state;
    const horizontalWinner = checkRow(boardState)
    const verticalWinner = checkColumn(boardState)
    const diagonalLeftToRightWinner = checkDiagonalLeftToRight(boardState)
    const diagonalRightToLeftWinner = checkDiagonalRightToLeft(boardState)
    let winner;

    if (horizontalWinner) {
      winner = horizontalWinner;
    } else if(verticalWinner) {
      winner = verticalWinner;
    } else if(diagonalLeftToRightWinner) {
      winner = diagonalLeftToRightWinner;
    } else if(diagonalRightToLeftWinner) {
      winner = diagonalRightToLeftWinner;
    }

    if (winner === "Red") {
      this.setState({
        playerRedScore: playerRedScore + 1
      })
    }
    if (winner === "Yellow") {
      this.setState({
        playerYellowScore: playerYellowScore + 1
      })
    }

    if (winner) {
      this.setState({
        winner,
        hasWinner: true,
        isTie: false
      })
    }
  }

  checkTie() {
    const { tieScore, noOfNull } = this.state;

    this.setState({
      noOfNull: noOfNull - 1
    });

    if (noOfNull === 0) {
      this.setState({
        isTie: true,
        tieScore: tieScore + 1
      });
    }
  }

  reset() {
    this.setState({
      boardState: SetBoard(),
      winner: "",
      hasWinner: false,
      isTie: false,
      playerTurn: "Red",
      playerRedScore: 0,
      playerYellowScore: 0,
      tieScore: 0,
      noOfNull: 41
    })
  }

  playagain() {
    this.setState({
      boardState: SetBoard(),
      hasWinner: false,
      isTie: false,
      playerTurn: this.state.winner,
      noOfNull: 41
    })
  }

  handleClick(col) {
    const { boardState, playerTurn, hasWinner, isTie, tieScore } = this.state;

    if(!hasWinner && !isTie) {
      for (let row = 0; row < 6; row++) {
        if (boardState[row][col] === null) {
          if (playerTurn === "Red") {
            boardState[row][col] = "Red"
          } else {
            boardState[row][col] = "Yellow"
          }
          this.switchPlayer();
          this.checkWinner();
          this.checkTie();
          break;
        } else {
          console.log("Cell is occupied!!");
        }
      }
    }

  }

  displayWinnerMessage() {
    const { hasWinner, winner, isTie } = this.state;
    if (hasWinner) {
      return (
        <div className="winner lead" onClick={() => this.playagain()}>
          {`${winner} wins! Click Me to Play again!`}
        </div>
      )
    }

    if (isTie) {
      return (
        <div className="tie" onClick={() => this.playagain()}>
          It's a Tie! Click Me to Play again!
        </div>
      )
    }
  }

  render() {
    const { hasWinner, boardState, playerTurn, isTie, playerRedScore, playerYellowScore, tieScore } = this.state;
    return (
      <div>
        <h5 className="title">Connect 4 Game</h5>
        <div className="jumbotron gameboard">
          <span className="redGame">Red: {playerRedScore}</span>
          <span className="tieGame">Tie: {isTie ? tieScore : tieScore}</span>
          <span className="yellowGame">Yellow: {playerYellowScore}</span>
        </div>
        <div className="jumbotron">
        {hasWinner || isTie ? (this.displayWinnerMessage()) : null }
          <Board cells={boardState} handleClick={this.handleClick} currentPlayer={playerTurn} />
        </div>
        <button className="btn btn-success"
          onClick={(e) => {
            console.log('Reset clicked');
            this.reset();
            }}>Reset</button>
      </div>
    )
  }
}

export default App;
