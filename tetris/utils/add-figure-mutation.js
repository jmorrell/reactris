
function addFigureMutation(state, draw) {
  var width = state.board[0].length;
  for (var i = 0; i < state.figure.length; i++) {
    for (var j = 0; j < state.figure[i].length; j++) {
      var py = state.y + i;
      var px = state.x + j;
      if (state.figure[i][j] && (px < 0 || px >= width)) return false;
      if (py < 0) continue;
      if (!state.figure[i][j]) continue;
      if (!state.board[py] || state.board[py][px] || state.board[py][px] === undefined) return false;
      if (!draw) continue;
      state.board[py][px] = state.figure[i][j] || state.board[py][px];
    }
  }
  return draw ? true : addFigureMutation(state, true);
}

module.exports = addFigureMutation;
