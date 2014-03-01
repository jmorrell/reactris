var FIGURES = require('./figures.js');

module.exports = function() {
  return (Math.random()*FIGURES.length)|0;
};
