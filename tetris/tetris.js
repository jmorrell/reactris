var WIDTH = 10;
var HEIGHT = 20;

var getInitialState = require('./init-state.js');
var step = require('./step.js');

var state = getInitialState(HEIGHT, WIDTH);
var speed = 10;

function draw(state) {
  console.log(state.board);
}

function iter() {
  draw(state);
  state = step(state);
  setTimeout(iter, speed);
}

iter();

