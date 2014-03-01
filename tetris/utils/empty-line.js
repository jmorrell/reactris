module.exports = function emptyLine(width) {
  var arr = [];
  for (var i = 0; i < width; i++) {
    arr[i] = 0;
  }
  return arr;
}
