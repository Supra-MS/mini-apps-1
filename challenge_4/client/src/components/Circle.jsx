import React from 'react';

function Circle({ cell, handleClick, highlight, onMouseEnter, onMouseLeave }) {
  let className;
  switch (cell) {
    case null:
      className = "";
      break;
    case "Red":
      className = "fillRed";
      break;
    case "Yellow":
      className = "fillYellow";
      break;
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${highlight ? "highlight" : ""} circlediv`}>
      <div className={`circle ${className}`}
        onClick={handleClick}
      />
    </div>
  )
}

export default Circle;
