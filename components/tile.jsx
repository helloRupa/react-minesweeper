import React from 'react'

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.showValue = this.showValue.bind(this);
    this.setClass = this.setClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showValue() {
    if (this.props.tile.flagged) { return '\u2691'; }
    if (!this.props.tile.explored) { return 'E'; }
    if (this.props.tile.bombed) { return '\uD83D\uDCA3'; }
    return this.props.tile.adjacentBombCount();
  }

  setClass() {
    if (this.props.tile.flagged) { return 'flagged'; }
    if (!this.props.tile.explored) { return 'unclicked'; }
    if (this.props.tile.bombed) { return 'bombed'; }
    if (this.props.tile.adjacentBombCount() === 0) {
      return 'empty';
    }
    return 'number';
  }

  handleClick(e) {
    const isFlagging = e.altKey;

    this.props.updateGame(this.props.tile, isFlagging);
  }

  render() {
    return (
      <div className={ 'tile ' + this.setClass()} onClick={this.handleClick}>{this.showValue()}</div>
    );
  }
}