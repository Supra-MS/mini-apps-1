import React, { useState } from 'react';
import Circle from './Circle.jsx';

function Board({cells, currentPlayer, handleClick }) {
  const [ highlightedColumn, setHighlightedColumn ] = useState(null)

  const onMouseEnter= (col) => {
    setHighlightedColumn(col)
  }

  const onMouseLeave = () => {
    setHighlightedColumn(null)
  }

  const matrixDom = [];
  let circleColumnKey = 0;
  /* Row of 7 col/cell */
  for (let row = 5; row >= 0; row--) {
    let rowOf7Cells = [];
    for (let col = 0; col < 7; col++) {
      rowOf7Cells.push(
        <Circle
          key={circleColumnKey++}
          cell={cells[row][col]}
          handleClick={() => handleClick(col)}
          onMouseEnter={() => onMouseEnter(col)}
          onMouseLeave={onMouseLeave}
          highlight={col === highlightedColumn}
         />
      )
    }
    // div for each row
    let rowDiv = <div key={row} className="row">{rowOf7Cells}</div>
    matrixDom.push(rowDiv);
  }

  return (
    <div className="board">
      <div className="row">
        {(new Array(7).fill(0)).map((cell, i) => (
          <div key={`hCell_${i}`} >
            <div
            className={`${i === highlightedColumn ? (currentPlayer === "Red" ? "fillRed" : "fillYellow") : "hide"} hidecircle`}
            />
          </div>
        ))}
      </div>

      {matrixDom}
    </div>
  )

}

export default Board;