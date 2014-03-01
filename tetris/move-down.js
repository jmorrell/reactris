var moveFigure = require('./utils/move-figure.js');

module.exports = function(state) {
  moveFigure(state, 0, 1);
  return state;
};

