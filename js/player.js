import u from "umbrellajs";
import { shipsDefaults, _board } from "./data";
import { _generateRange, _randNum, _randRowLetter } from "./utils";
import {
  _generateBoardID,
  _generateObscuredBoard,
  _generateActiveBoard,
  _randPosGen as randPosGen,
  _isCellAvailable
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
  currentShipSelected: {}, // for player 1, shipName and orientation etc
  ships: shipsDefaults, // ships available to the user, shipDefaults, are the ships alive etc
  board: _board, // player board, starts as all null, will get edited as game progresses
  placedShips: [], // array of coordinates where there are ships, used to if you can place a ship there
  movesHistory: [], // push the player moves here, what they click, {row: x, col: y}

  // functions
  setPlayerName: function(name) {
    this.playerName = name.trim();
  },
  setPlayerID: function(ID) {
    this.playerID = ID;
  },
  setCurrentShipSelected: function(obj) {
    // shipType, orientation
    this.currentShipSelected = { ...obj };
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
  placeShip: function({ shipType, row, col, orientation }) {
    const idName = _generateBoardID(this.playerName, false);
    const currentRow = row.charCodeAt();
    const rowLimit = "j".charCodeAt();
    const colLimit = 9;
    const shipSelected = this.ships[shipType];
    const { length } = shipSelected;
    const newBoard = { ...this.board };
    const shipDetail = { shipType, hit: false };
    if (orientation === "horizontal" && col + length <= colLimit) {
      const range = _generateRange(col, col + length);
      for (const colPosition of range) {
        const rowArray = newBoard[row].map((x, idx) => (colPosition === idx ? shipDetail : x));
        newBoard[row] = [...rowArray];
        // disable placing button
        u(`.pos-${shipType}`).attr({ disabled: true });
        // show ships visually
        u(`#${idName} > .cell-${row}${colPosition}`).text("O");
        // set ship as placed
        this.ships[shipType].placed = true;
      }
      // reset currentsetCurrentShipSelected
      this.setCurrentShipSelected({});
      // update board
      this.board = { ...newBoard };
    } else if (orientation === "vertical" && currentRow + length <= rowLimit) {
      const range = _generateRange(currentRow, currentRow + length);
      for (const letterNum of range) {
        const rowLetter = String.fromCharCode(letterNum);
        const rowArray = newBoard[rowLetter].map((x, idx) => (col === idx ? shipDetail : x));
        newBoard[row] = [...rowArray];
        // disable placing button
        u(`.pos-${shipType}`).attr({ disabled: true });
        // show ships visually
        u(`#${idName} > .cell-${rowLetter}${col}`).text("O");
        // turn off click handler so people can't double click
        u(`#${idName} > .cell-${rowLetter}${col}`).off("click");
        // set ship as placed
        this.ships[shipType].placed = true;
      }
      this.setCurrentShipSelected({});
      // update board
      this.board = { ...newBoard };
    } else {
      alert("please select a different cell");
      // console.log("try again!");
    }
  },
  // generate moves for player2
  generateMoves: function() {
    // generate random number and letter
    const randomRow = _randRowLetter();
    const randomCol = _randNum(9);
    // if (this.movesHistory.length) {
    //   console.log(
    //     "what is this recursion case",
    //     this.movesHistory.indexOf(randomRow + randomCol) < 0
    //   );
    //   // if (this.movesHistory.indexOf(randomRow + randomCol) < 0) {
    //   //   this.generateMoves();
    //   // }
    //   this.movesHistory = [...this.movesHistory, randomRow + randomCol];
    // }
    this.movesHistory = [...this.movesHistory, randomRow + randomCol];

    console.log("what is moves history now", this.movesHistory);
  },
  // main click function that handles attacks and scores
  incrementScore: function(player) {}
};

export default player;
