import u from "umbrellajs";
import { shipsDefaults, _board } from "./data";
// import { _generateBoardID } from "./utils";
import {
  _generateBoardID,
  _generateObscuredBoard,
  _generateActiveBoard,
  _randPosGen as randPosGen
} from "./board";

/**
 * Player object and its defaults
 */

const player = {
  // definitions
  playerName: "", // for score purposes
  playerID: null,
  currentTurn: false, // is it the user's current turn or not
  score: 0, // increments when a player downs an enemy's ship
  ships: shipsDefaults, // ships available to the user, shipDefaults, are the ships alive etc
  placedShips: [], // array of coordinates where there are ships, used to if you can place a ship there
  board: {}, // player board, starts as all null, will get edited as game progresses
  movesHistory: [], // push the player moves here, what they click, {row: x, col: y}

  // functions
  setPlayerName: function(name) {
    this.playerName = name.trim();
  },
  setPlayerID: function(ID) {
    this.playerID = ID;
  },
  showBoardOnDOM: function({ obscured }) {
    const idName = _generateBoardID(this.playerName, obscured);
    const boardElem = u(`#${idName}`);
    if (obscured) {
      _generateObscuredBoard(boardElem, _board, this);
      // _generateObscuredBoard(boardElem, this.board, this.playerName);
    } else {
      _generateActiveBoard(boardElem, _board, this);
    }
  },
  generateShipPositions: function() {
    let generatedShips = {};
    for (const shipName in this.ships) {
      const obj = randPosGen({ [shipName]: this.ships[shipName] }, this);
      generatedShips = { ...generatedShips, ...obj };
    }
    return generatedShips;
  },
  placeGeneratedShips: function() {
    const generatedShips = this.generateShipPositions();
    let newBoard = { ..._board };
    // console.log("before", { oldBoard: this.board, newBoard, generatedShips });
    for (const position in generatedShips) {
      const row = position[0];
      const col = position[1];
      const ship = generatedShips[position];
      // map through values to avoid mutating original board object
      const rowArray = newBoard[row].map((x, idx) => (Number(col) === idx ? ship : x));
      newBoard[row] = [...rowArray];
    }
    // console.log("newBoard", this.playerID, newBoard);
    this.board = { ...newBoard };

    // return newBoard;
  },
  placeShip: function() {},
  // main click function that handles attacks and scores
  incrementScore: function(player) {}
};

export default player;
