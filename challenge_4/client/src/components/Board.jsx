import React from 'react';
import Circle from './Circle.jsx';

function Board({matrix, handleClick }) {
  const matrixDom = [];
  let circleColumnKey = 0;
  /* Row of 7 col/cell */
  for (let row = 5; row >= 0; row--) {
    let rowOf7Cells = [];
    for (let col = 0; col < 7; col++) {
      rowOf7Cells.push(
        <Circle
          key={circleColumnKey++}
          cell={matrix[row][col]}
          handleClick={() => handleClick(col)}
         />
      )
    }
    // div for each row
    let rowDiv = <div key={row} className="row">{rowOf7Cells}</div>
    matrixDom.push(rowDiv);
  }

  return (
    <div className="board">
      <div>{matrixDom}</div>
    </div>
  )

}

export default Board;