import React from 'react';
import Board from './Board.jsx';
import SetBoard from '../utils/SetBoard.js';
import { checkRow, checkColumn, checkDiagonalLeftToRight, checkDiagonalRightToLeft } from '../utils/CheckWinnerMoves.js';

let gameBoard = SetBoard();

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('Set State: ', gameBoard);
    this.state = {
      boardState: gameBoard,
      winner: "",
      hasWinner: false,
      isTie: false,
      playerTurn: "Red",
      playerRedScore: 0,
      playerYellowScore: 0,
      tieScore: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.displayWinnerMessage = this.displayWinnerMessage.bind(this);
    this.checkTie = this.checkTie.bind(this);
    this.reset = this.reset.bind(this);
    this.playagain = this.playagain.bind(this);
  }

  switchPlayer() {
    if (this.state.playerTurn == "Red" ) {
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
        end: true,
        hasWinner: true,
        isTie: false
      })
    }
  }

  checkTie() {
    const { boardState, tieScore } = this.state;
    console.log('Check tie board state: ', boardState);
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (boardState[row][col] !== null) {
          this.setState({
            isTie: true,
          })
        } else {
          this.setState({
            isTie: false
          })
        }
      }
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
      tieScore: 0
    })
  }

  playagain() {
    this.setState({
      boardState: SetBoard(),
      hasWinner: false,
      isTie: false,
      playerTurn: this.state.winner,
    })
  }

  handleClick(col) {
    const { boardState, playerTurn, hasWinner, isTie } = this.state;
    console.log('On click has winner: ', hasWinner, 'isTie: ',isTie);
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

    console.log('Clicked', this.state.playerTurn);
  }

  displayWinnerMessage() {
    const { hasWinner, winner, isTie } = this.state;
    console.log('isTie: ',isTie, "hasWinner: " , hasWinner)
    if (hasWinner) {
      return (
        <div className="winner lead">
          {`Player ${winner} wins!`}
        </div>
      )
    }

    if (isTie) {
      return (
        <div className="tie">
          It's a Tie!!
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
          <span>Tie: {(isTie) ? tieScore + 1 : tieScore}</span>
          <span className="yellowGame">Yellow: {playerYellowScore}</span>
        </div>
        <div className="jumbotron">
        {hasWinner || isTie ? (this.displayWinnerMessage()) : null }
          <Board cells={boardState} handleClick={this.handleClick} currentPlayer={playerTurn} />
        </div>
        <button className="btn btn-warning" onClick={(e) => {
            console.log('Reset clicked')
            this.playagain();
            }}>Play again</button>
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
