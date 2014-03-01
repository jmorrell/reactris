function removeFigureMutation(state) {
  for (var i = 0; i < state.figure.length; i++) {
    for (var j = 0; j < state.figure[i].length; j++) {
      var py = state.y + i;
      var px = state.x + j;
      if (px < 0) continue;
      if (!state.figure[i][j] || !state.board[py] || state.board[py][px] === undefined) continue;
      state.board[py][px] = 0;
    }
  }
}

module.exports = removeFigureMutation;
