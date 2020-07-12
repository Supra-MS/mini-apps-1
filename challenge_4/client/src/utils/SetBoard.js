let SetBoard = () => {
  let matrix = [];

  for(let row = 0; row < 6; row++) {
    matrix.push(new Array(7).fill(null));
  }

  return matrix;
}

console.log('Initial Board Matrix: ', SetBoard());

module.exports = SetBoard;