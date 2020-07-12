import React from 'react';

function Circle({ matrix, handleClick }) {
  return (
    <div>
      <div className="circle" onClick={handleClick}></div>
    </div>
  )
}

export default Circle;