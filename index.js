/** @jsx React.DOM */
var React = require('react/addons');
var tetris = require('./tetris');
var mousetrap = require('mousetrap');

var CanvasSquare = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'square': true,
      'active': this.props.data > 0,
      'black': this.props.data === 0,
      'red': this.props.data === 1,
      'blue': this.props.data === 2,
      'green': this.props.data === 3,
      'purple': this.props.data === 4,
      'yellow': this.props.data === 5
    });

    return (
      <div className={classes} />
    );
  }
});

var CanvasRow = React.createClass({
  render: function() {
    var squares = this.props.row.map(function(block, i) {
      return <CanvasSquare key={i} data={block} />;
    });

    return (
      <div className="board-row">
        { squares }
      </div>
    );
  }
});

var Tetris = React.createClass({
  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getInitialState: function() {
    return tetris.getInitialState(this.props.height, this.props.width);
  },

  componentDidMount: function() {
    function step() {
      this.setState(tetris.step(this.state));
      setTimeout(step.bind(this), 200);
    }

    step.call(this);
    this.bindKeyPresses();
  },

  bindKeyPresses: function() {
    function _do(action) {
      this.setState(action(this.state));
    }

    mousetrap.bind('left',  _do.bind(this, tetris.moveLeft));
    mousetrap.bind('right', _do.bind(this, tetris.moveRight));
    mousetrap.bind('down',  _do.bind(this, tetris.moveDown));
    mousetrap.bind('up',    _do.bind(this, tetris.rotate));
    mousetrap.bind('space', _do.bind(this, tetris.drop));
  },

  render: function() {
    var board = this.state.board;
    var rows = board.map(function(row, i) {
      return <CanvasRow key={i} row={row} />
    });

    return (
      <div ref="board" className="board" onKeyDown={this._handleKey}>
        { rows }
      </div>
    );
  }
});


React.renderComponent(<Tetris height={20} width={10} />, document.body);
