var addFigureMutation = require('./utils/add-figure-mutation.js');
var removeFigureMutation = require('./utils/remove-figure-mutation.js');

function rotateFigureMutation(state, dir) {
  var result = [];
  for (var i = 0; i < state.figure.length; i++) {
    for (var j = 0; j < state.figure[i].length; j++) {
      var y = dir === 1 ? j : state.figure.length - j - 1;
      var x = dir === 1 ? state.figure.length - 1 - i : i;
      result[y] = result[y] || [];
      result[y][x] = state.figure[i][j];
    }
  }
  state.figure = result;
}

function rotateFigure(state, dir) {
  removeFigureMutation(state);
  rotateFigureMutation(state, dir);
  if (addFigureMutation(state)) return true;
  rotateFigureMutation(state, -dir);
  addFigureMutation(state);
}

module.exports = function(state) {
  rotateFigure(state, 1);
  return state;
};
