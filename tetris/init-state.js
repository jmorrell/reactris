var FIGURES = require('./figures.js');

module.exports = function(height, width) {
  return {
    board: initBoard(height, width),
    score: 0,
    nextFigure: (Math.random()*FIGURES.length)|0,
    nextColor: 1,
    x: 0,
    y: 0,
    figure: undefined
  };
};

function initBoard(height, width) {
  var board = [];
  for (var i = 0; i < height; i++) {
    board[i] = [];
    for (var j = 0; j < width; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}
