
module.exports = function(state) {

  var WIDTH = state.board[0].length;
  var HEIGHT = state.board.length;

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

  function rotateFigureMutation(dir) {
    var result = [];
    for (var i = 0; i < state.figure.length; i++) {
      for (var j = 0; j < state.figure[i].length; j++) {
        var y = dir === 1 ? j : state.figure.length-j-1;
        var x = dir === 1 ? state.figure.length-1-i : i;
        result[y] = result[y] || [];
        result[y][x] = state.figure[i][j];
      }
    }
    state.figure = result;
  }

  function rotateFigure(dir) {
    removeFigureMutation();
    rotateFigureMutation(dir);
    if (addFigureMutation()) return true;
    rotateFigureMutation(-dir);
    addFigureMutation();
  }

  rotateFigure(1);
  return state;
};
