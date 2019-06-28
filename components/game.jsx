import React from 'react'
import * as Minesweeper from '../src/minesweeper'
import Board from './board';

const gridSize = 9;
const bombs = 12;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: new Minesweeper.Board(gridSize, bombs), close: false };
    this.updateGame = this.updateGame.bind(this);
    this.showModal = this.showModal.bind(this);
    this.restart = this.restart.bind(this);
    this.gameOverMsg = this.gameOverMsg.bind(this);
  }

  updateGame(tile, isFlagging) {
    if (isFlagging) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  }

  restart() {
    this.setState({ board: new Minesweeper.Board(gridSize, bombs) });
  }

  close() {
    this.setState({close: true});
  }

  showModal() {
    if (this.state.close) return;

    if (this.state.board.won() || this.state.board.lost()) {
      return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="form">
            <p>Would you like to play again?</p>
            <button onClick={this.restart.bind(this)}>Yes</button>
            <button onClick={this.close.bind(this)}>No</button>
          </div>
        </div>
      );
    }
  }

  gameOverMsg() {
    if (this.state.board.lost()) {
      return 'You Lose!';
    }

    if (this.state.board.won()) {
      return 'You Win!';
    }
  }

  render() {
    return (
      <div>
        <Board board={this.state.board} updateGame={this.updateGame} />
        {this.showModal()}
        <h1>{this.gameOverMsg()}</h1>
      </div>
    );
  }
}