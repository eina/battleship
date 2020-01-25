import u from "umbrellajs";
import { shipsDefaults, _board } from "./data";
// import { _generateBoardID } from "./utils";
import {
  _generateBoardID,
  _generateObscuredBoard,
  _generateActiveBoard,
  _randPosGen
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
  placedShips: [], // array of coordinates where there are ships, used to if you can place a ship there
  board: _board, // player board, starts as all null, will get edited as game progresses
  movesHistory: [], // push the player moves here, what they click, {row: x, col: y}

  // functions
  setPlayerName: function(name) {
    this.playerName = name.trim();
  },
  showBoardOnDOM: function(obscured = false, randomized = false) {
    const idName = _generateBoardID(this.playerName, obscured);
    const board = u(`#${idName}`);
    this.placeShip(randomized);
    if (obscured) {
      _generateObscuredBoard(board, this.board, this.playerName);
    } else {
      _generateActiveBoard(board, this.board, this.playerName);
    }
  },
  generateShipPositions: function() {
    let generatedShips = {};
    for (const shipName in this.ships) {
      const obj = _randPosGen({ [shipName]: this.ships[shipName] }, this);
      generatedShips = { ...generatedShips, ...obj };
    }
    return generatedShips;
  },
  placeShip: function(randomize = false) {
    if (randomize) {
      const generatedShips = this.generateShipPositions();
      for (const position in generatedShips) {
        const row = position[0];
        const col = position[1];
        const ship = generatedShips[position];
        // console.log(ship, this.board[row][col]);
        this.board[row][col] = ship;
      }
    }
  },
  // main click function that handles attacks and scores
  incrementScore: () => {} // increments score (this.score) for the player
};

export default player;
