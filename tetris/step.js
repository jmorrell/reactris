var emptyLine = require('./utils/empty-line.js');
var selectFigure = require('./utils/select-figure.js');
var moveFigure = require('./utils/move-figure.js');

function hasEmpty(arr) {
  return arr.some(function(val) {
    return !val;
  });
}

function removeLines(state) {
  var modifier = 0;
  for (var i = 0; i < state.board.length; i++) {
    if (hasEmpty(state.board[i])) continue;
    state.board.splice(i,1);
    state.board.unshift(emptyLine(state.board[0].length));
    if (!modifier) {
      modifier += 150;
    }
    modifier *= 2;
  }
  if (modifier) {
    state.speed = Math.max(state.speed - 20, 50);
  }
  state.score += modifier;
}

module.exports = function(state) {
  if (state.running) {
    if (moveFigure(state, 0,1)) return state;
    removeLines(state);
    if (state.y < 0) {
      state.running = false;
    }
    selectFigure(state);
  }

  return state;
}

