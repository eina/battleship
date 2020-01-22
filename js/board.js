import {
  _randNum,
  _randRowLetter,
  _randOrientation,
  _generateRange,
} from "./utils";
/**
 * BOARD RELATED FUNCTIONS
 * ie. clicking board buttons, rendering etc
 */

const _generateBoardID = (name, obscured) => {
  const boardId = name.replace(/\s/g, "").toLowerCase();
  if (obscured) {
    return `${boardId}--hidden`;
  } else {
    return `${boardId}--active`;
  }
};

/**
 * Generate A Character Within Limit (ie. within the bounds of the board)
 * @param {string} orientation horizontal/vertical
 * @param {string} randChar letters a-j
 * @param {number} length length of ship being placed
 */
const _generateCharWithinLimit = (orientation, randChar, length) => {
  const limit = orientation === "horizontal" ? 9 : 106;
  const isItNumber =
    orientation === "horizontal" && typeof randChar === "number";
  const letterCode = isItNumber ? null : randChar.charCodeAt(0);

  // make sure that randNum provided is within the bounds:
  // 1. it can never be bigger than 9
  // 2. the sum of the current randChar + length is not bigger than the limit
  // if it's a letter:
  // 1. the range is between 97 - 106 and it can't be bigger than 106
  // 2. the 'letter'.charCode + length should not be bigger than the limit
  if (orientation === "horizontal" && randChar + length > limit) {
    return _randNum(limit - length);
  } else if (
    orientation === "vertical" &&
    letterCode &&
    letterCode + length > limit
  ) {
    const min = "a".charCodeAt(0) - 1;
    const newMax = limit - length - min;
    return _randRowLetter(newMax);
  } else {
    return randChar;
  }
};

/**
 * generate rand positions for ships
 */
const _randPosGen = shipItem => {
  const placedShips = {};

  for (const ship of Object.keys(shipItem)) {
    const shipDetail = shipItem[ship];
    const orientation = _randOrientation();
    let row, col, range;

    if (orientation === "horizontal") {
      row = _randRowLetter(); // same letter
      col = _generateCharWithinLimit(
        orientation,
        _randNum(9),
        shipDetail.length,
      );
      range = _generateRange(col, Number(col) + shipDetail.length);

      range.forEach(num => {
        placedShips[ship] = {
          ...placedShips[ship],
          [row + num]: true,
        };
      });
    }

    if (orientation === "vertical") {
      row = _generateCharWithinLimit(
        orientation,
        _randRowLetter(),
        shipDetail.length,
      );
      col = _randNum(9);
      const startingPoint = row.charCodeAt(0);
      range = _generateRange(
        startingPoint,
        startingPoint + shipDetail.length,
      );

      range.forEach(charNum => {
        const letter = String.fromCharCode(charNum);
        placedShips[ship] = {
          ...placedShips[ship],
          [letter + col]: true,
        };
      });
    }
  }

  /** SOMEWHERE ASK IF THE POSITIONS GENERATED EXISTS??? */

  return placedShips;
};

/**
 * generate obscured board to be hit
 */
const _generateObscuredBoard = (board, boardData) => {
  if (board) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      // col header
      board.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);
      board.append((status, index) => {
        // row header
        // console.log('what the fuck is this tho', status)
        if (key === "header") {
          return `<div class="cell-header">${status}</div>`;
        }
        if (status && status.shipType) {
          // console.log(status.hit)
          return `<div class="cell">
            <button class="btn-cell"
                ${status.hit ? "disabled" : ""}
                data-x=${key}
                data-y=${index}>?
            </button>
          </div>`;
        }
        return `<div class="cell">
          <button class="btn-cell"
              data-x=${key}
              data-y=${index}>?
          </button>
        </div>`;
      }, data);
    }
  }
};

/**
 * Helper function to show proper marker for ships on board
 * @param {object} shipObj
 * @param {string} row
 * @param {number} col
 * @returns {string} 'X' if hit, 'O' if not hit, '--' if no ship in area
 */
const _showShipMarker = (shipObj, row, col) => {
  let marker;
  if (shipObj && typeof shipObj === "object") {
    marker = shipObj.hit ? "X" : "O";
  } else {
    marker = "--";
  }
  return `<div class="cell row-${row} col-${col}">${marker}</div>`;
};

/**
 *
 * @param {HTML element} board
 * @param {object} boardData
 */
const _generateActiveBoard = (board, boardData, playerName) => {
  if (board) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      // generate row header
      board.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);
      board.append((status, index) => {
        // generate col header
        if (key === "header") {
          return `<div class="cell-header">${status}</div>`;
        }
        // generate body
        return _showShipMarker(status, key, index);
      }, data);
    }
  }
};

const _clickObscuredCell = (e, players) => {
  const { x, y } = e.target.dataset;
  const { enemy, owner } = players;
  // console.log("hello", e);
  console.log("hi are you still clicking", x, y, {
    enemy: enemy.playerName,
    owner: owner.playerName,
  });

  // hit the enemy, update their board etc

  // update my own score
};

export {
  _generateBoardID,
  _generateCharWithinLimit,
  _randPosGen,
  _generateObscuredBoard,
  _generateActiveBoard,
  _clickObscuredCell,
};
