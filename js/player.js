import u from "umbrellajs";
import { shipsDefaults, _board } from "./data";
import { _generateBoardID } from "./utils";
import {
  _generateObscuredBoard,
  _generateActiveBoard,
} from "./board";
/**
 * Player object and its defaults
 */

const player = {
  // definitions
  playerName: "", // for score purposes
  currentTurn: false, // is it the user's current turn or not
  score: 0, // increments when a player downs an enemy's ship
  ships: shipsDefaults, // ships available to the user, shipDefaults, are the ships alive etc
  board: _board, // player board, starts as all null, will get edited as game progresses
  movesHistory: [], // push the player moves here, what they click, {row: x, col: y}

  // functions
  setPlayerName: function(name) {
    this.playerName = name.trim();
  },
  showBoardOnDOM: function(obscured = false, randomized = false) {
    const idName = _generateBoardID(this.playerName, obscured);
    const board = u(`#${idName}`);
    if (obscured) {
      _generateObscuredBoard(board, this.board, this.playerName);
    } else {
      _generateActiveBoard(board, this.board, this.playerName);
    }
  },
  placeShip: () => {},
  // main click function that handles attacks and scores
  incrementScore: () => {}, // increments score (this.score) for the player
};

export default player;
