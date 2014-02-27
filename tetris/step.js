var FIGURES = require('./figures.js');

module.exports = function(state) {

  var WIDTH = state.board[0].length;
  var HEIGHT = state.board.length;

  function selectFigure() {
    state.figure = FIGURES[state.nextFigure];
    state.nextFigure = (Math.random()*FIGURES.length)|0;
    for (var i = 0; i < state.figure.length; i++) {
      for (var j = 0; j < state.figure.length; j++) {
        state.figure[i][j] = state.figure[i][j] && state.nextColor;
      }
    }
    state.nextColor = 1+((Math.random()*5)|0);
    state.y = -state.figure.length;
    state.x = ((WIDTH / 2) - (state.figure.length / 2)) | 0;

    var btm = state.figure.length-1;

    while (allEmpty(state.figure[btm])) {
      state.y++;
      btm--;
    }
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

  function line() {
    var arr = [];
    for (var i = 0; i < WIDTH; i++) {
      arr[i] = 0;
    }
    return arr;
  }

  function allEmpty(arr) {
    return !arr.some(function(val) {
      return val;
    });
  }

  function hasEmpty(arr) {
    return arr.some(function(val) {
      return !val;
    });
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

  function rotateFigure(dir) {
    removeFigureMutation();
    rotateFigureMutation(dir);
    if (addFigureMutation()) return true;
    rotateFigureMutation(-dir);
    addFigureMutation();
  }

  function removeLines() {
    var modifier = 0;
    for (var i = 0; i < state.board.length; i++) {
      if (hasEmpty(state.board[i])) continue;
      state.board.splice(i,1);
      state.board.unshift(line());
      if (!modifier) {
        modifier += 150;
      }
      modifier *= 2;
    }
    state.score += modifier;
  }

  function reset() {
    for (var i = 0; i < HEIGHT; i++) {
      for (var j = 0; j < WIDTH; j++) {
        state.board[i][j] = 0;
      }
    }
    state.score = 0;
  }

  if (!state.figure) {
    selectFigure();
  }

  if (moveFigure(0,1)) return state;
  removeLines();
  if (state.y < 0) {
    reset();
  }
  selectFigure();

  return state;
}

