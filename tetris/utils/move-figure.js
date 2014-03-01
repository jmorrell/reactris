var addFigureMutation = require('./add-figure-mutation.js');
var removeFigureMutation = require('./remove-figure-mutation.js');

function moveFigure(state, dx, dy) {
  removeFigureMutation(state);
  state.x += dx;
  state.y += dy;
  // If the move was successful, exit and return true
  if (addFigureMutation(state)) {
    return true;
  }

  // otherwise undo the mutation and return false
  state.x -= dx;
  state.y -= dy;
  addFigureMutation(state);
  return false;
}

module.exports = moveFigure;
