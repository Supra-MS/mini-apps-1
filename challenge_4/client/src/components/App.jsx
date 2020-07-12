import React from 'react';
import Board from './Board.jsx';
import SetBoard from '../utils/SetBoard.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardState: SetBoard,
      winner: "",
      isTie: false,
      playerTurn: "Red"
    }
    this.handleClick = this.handleClick.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
  }

  switchPlayer() {
    if (this.state.playerTurn == "Red" ) {
      this.setState({
        playerTurn: "Orange"
      })
    } else {
      this.setState({
        playerTurn: "Red"
      })
    }
  }

  handleClick(col) {
    console.log('Clicked', this.state.playerTurn);
  }

  render() {
    const { boardState, playerTurn } = this.state;
    return (
      <div>
        <h5 className="title">Connect 4 Game</h5>
        <div className="jumbotron">
          <Board matrix={boardState} handleClick={this.handleClick} currentPlayer={playerTurn} />
        </div>
        <button className="btn btn-success"
          onClick={() => {
            this.state.boardState = SetBoard;
            this.state.hasWinner = false;
            this.state.playerTurn = "red";
            this.state.isTie = false;
            }}
          >Reset</button>
      </div>
    )
  }
}

export default App;

