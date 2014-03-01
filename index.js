var React = require('react/addons');
var tetris = require('./tetris');
var div = React.DOM.div;

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

    return div({ className: classes });
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
