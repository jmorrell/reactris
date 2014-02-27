module.exports = function(state) {

  var WIDTH = state.board[0].length;
  var HEIGHT = state.board.length;

  function addFigureMutation(draw) {
    for (var i = 0; i < state.figure.length; i++) {
      for (var j = 0; j < state.figure[i].length; j++) {
        var py = state.y+i;
        var px = state.x+j;
        if (state.figure[i][j] && (px < 0 || px >= WIDTH)) return false;
        if (py < 0) continue;
        if (!state.figure[i][j]) continue;
        if (!state.board[py] || state.board[py][px] || state.board[py][px] === undefined) return false;
        if (!draw) continue;
        state.board[py][px] = state.figure[i][j] || state.board[py][px];
      }
    }
    return draw ? true : addFigureMutation(true);
  }

  function removeFigureMutation() {
    for (var i = 0; i < state.figure.length; i++) {
      for (var j = 0; j < state.figure[i].length; j++) {
        var py = state.y+i;
        var px = state.x+j;
        if (px < 0) continue;
        if (!state.figure[i][j] || !state.board[py] || state.board[py][px] === undefined) continue;
        state.board[py][px] = 0;
      }
    }
  }

  function moveFigure(dx,dy) {
    removeFigureMutation();
    state.x += dx;
    state.y += dy;
    if (addFigureMutation()) return true;
    state.x -= dx;
    state.y -= dy;
    addFigureMutation();
  }

  moveFigure(1, 0);

  return state;
};

