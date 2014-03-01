var FIGURES = require('./figures.js');
var getNextFigure = require('./get-next-figure.js');

function allEmpty(arr) {
  return !arr.some(function(val) {
    return val;
  });
}

function selectFigure(state) {
  state.figure = FIGURES[state.nextFigure];
  state.nextFigure = getNextFigure();
  for (var i = 0; i < state.figure.length; i++) {
    for (var j = 0; j < state.figure.length; j++) {
      state.figure[i][j] = state.figure[i][j] && state.nextColor;
    }
  }
  state.nextColor = 1+((Math.random()*5)|0);
  state.y = -state.figure.length;
  state.x = ((state.board[0].length / 2) - (state.figure.length / 2)) | 0;

  var btm = state.figure.length-1;

  while (allEmpty(state.figure[btm])) {
    state.y++;
    btm--;
  }
}

module.exports = selectFigure;
