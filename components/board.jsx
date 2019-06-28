import React from 'react'
import Tile from './tile'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">
        {this.props.board.grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((tile, x) => (
            <Tile tile={tile} updateGame={this.props.updateGame} key={`${y}, ${x}`} />
          ))}
        </div>))}
      </div>
    );
  }
}