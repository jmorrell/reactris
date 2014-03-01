var emptyLine = require('./utils/empty-line.js');
var selectFigure = require('./utils/select-figure.js');
var getNextFigure = require('./utils/get-next-figure.js');

module.exports = function(height, width) {
  var state = {
    board: initBoard(height, width),
    running: true,
    score: 0,
    nextFigure: getNextFigure(),
    nextColor: 1,
    x: 0,
    y: 0,
    speed: 500,
    figure: undefined
  };

  selectFigure(state);
  return state;
};

function initBoard(height, width) {
  var board = [];
  for (var i = 0; i < height; i++) {
    board[i] = emptyLine(width);
  }
  return board;
}
