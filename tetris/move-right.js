var moveFigure = require('./utils/move-figure.js');

module.exports = function(state) {
  moveFigure(state, 1, 0);
  return state;
};
