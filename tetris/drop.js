var moveFigure = require('./utils/move-figure.js');

module.exports = function(state) {
  while(moveFigure(state, 0, 1)) {
    state.score += 10;
  }

  return state;
};
