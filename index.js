var React = require('react');
var tetris = require('./tetris');
var div = React.DOM.div;

var COLORS = ['black', 'red', 'blue', 'green', 'purple', 'yellow'];

var CanvasSquare = React.createClass({
  render: function() {
    var className = 'square ' + [COLORS[this.props.data]];
    className += this.props.data > 0 ? ' active' : '';
    return div({ className: className });
  }
});

var CanvasRow = React.createClass({
  render: function() {
    var squares = this.props.row.map(function(block, i) {
      return CanvasSquare({ key: i, data: block });
    });

    return div({ className: 'board-row' }, squares);
  }
});

var Tetris = React.createClass({
  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      height: 20,
      width: 10
    };
  },

  getInitialState: function() {
    return tetris.getInitialState(this.props.height, this.props.width);
  },

  componentDidMount: function() {
    function step() {
      this.setState(tetris.step(this.state));
      setTimeout(step.bind(this), this.state.speed);
    }

    step.call(this);
    this.refs.board.getDOMNode().focus();
  },

  _handleKey: function(event) {
    event.preventDefault();

    var actionMap = {
      'ArrowUp': tetris.rotate,
      'ArrowDown': tetris.moveDown,
      'ArrowLeft': tetris.moveLeft,
      'ArrowRight': tetris.moveRight,
      ' ': tetris.drop
    };

    if (event.key in actionMap) {
      this.setState(actionMap[event.key](this.state))
    }
  },

  _onFocus: function(event) {
    this.setState({ running: true });
  },

  _onBlur: function(event) {
    this.setState({ running: false });
  },

  render: function() {
    var rows = this.state.board.map(function(row, i) {
      return CanvasRow({ key: i, row: row });
    });

    return div({
      ref: 'board',
      className: 'board',
      tabIndex: 0,
      onKeyDown: this._handleKey,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }, rows);
  }
});

React.renderComponent(Tetris(), document.body);
