import u from "umbrellajs";
import { _randNum, _randRowLetter, _randOrientation, _generateRange } from "./utils";
import player from "./player";
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
  const isItNumber = orientation === "horizontal" && typeof randChar === "number";
  const letterCode = isItNumber ? null : randChar.charCodeAt(0);

  // make sure that randNum provided is within the bounds:
  // 1. it can never be bigger than 9
  // 2. the sum of the current randChar + length is not bigger than the limit
  // if it's a letter:
  // 1. the range is between 97 - 106 and it can't be bigger than 106
  // 2. the 'letter'.charCode + length should not be bigger than the limit
  if (orientation === "horizontal" && randChar + length > limit) {
    return _randNum(limit - length);
  } else if (orientation === "vertical" && letterCode && letterCode + length > limit) {
    const min = "a".charCodeAt(0) - 1;
    const newMax = limit - length - min;
    return _randRowLetter(newMax);
  } else {
    return randChar;
  }
};

const _isCellAvailable = playerName => {};

/**
 * generate rand positions for ships
 */
const _randPosGen = (shipItem, playerObj) => {
  const shipCoords = {};
  const { placedShips } = playerObj;
  let tempCounter = {};

  for (const ship of Object.keys(shipItem)) {
    const shipDetail = shipItem[ship];
    const orientation = _randOrientation();
    let row, col, range;

    tempCounter = { [ship]: 0, ...tempCounter };

    if (orientation === "horizontal") {
      row = _randRowLetter(); // same letter
      col = _generateCharWithinLimit(orientation, _randNum(9), shipDetail.length);
      range = _generateRange(col, Number(col) + shipDetail.length);
      range.forEach(num => {
        // console.log("ship???", ship, tempCounter[ship]);
        // place in array of placed ships
        playerObj.placedShips = [...placedShips, row + num];
        // return { shipType: [ship], hit: false} in an object
        shipCoords[row + num] = { shipType: ship, hit: false };
        // mark ship as placed if counter is the same length
        tempCounter[ship] += 1;
      });
    }

    // console.log("hello temp counter", tempCounter);

    if (orientation === "vertical") {
      row = _generateCharWithinLimit(orientation, _randRowLetter(), shipDetail.length);
      col = _randNum(9);
      const startingPoint = row.charCodeAt(0);
      range = _generateRange(startingPoint, startingPoint + shipDetail.length);

      range.forEach(charNum => {
        const letter = String.fromCharCode(charNum);

        // place in array of placed ships
        playerObj.placedShips = [...placedShips, letter + col];
        // return { shipType: [ship], hit: false} in an object
        shipCoords[letter + col] = { shipType: ship, hit: false };
        // mark ship as placed if counter is the same length
        tempCounter[ship] += 1;
      });
    }
  }

  /** SOMEWHERE ASK IF THE POSITIONS GENERATED EXISTS??? */
  return shipCoords;
};

/**
 * generate obscured board to be hit
 */
const _generateObscuredBoard = (boardElem, boardTemplate, playerObj) => {
  // if player already has a generated board, use that, if not, use the boardTemplate
  const boardData = playerObj.board.header ? playerObj.board : boardTemplate;
  if (boardElem) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      // col header
      boardElem.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);
      boardElem.append((status, index) => {
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
  return `<div class="cell"><button class="btn-cell" data-x=${row} data-y=${col}>${marker}</button></div>`;
};

/**
 *
 * @param {HTML element} board
 * @param {object} boardData
 */
const _generateActiveBoard = (boardElem, boardTemplate, playerObj) => {
  // if player already has a generated board, use that, if not, use the boardTemplate
  const boardData = playerObj.board.header ? playerObj.board : boardTemplate;
  if (boardElem) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      // generate row header
      boardElem.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);
      boardElem.append((status, index) => {
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
  const cellDetail = owner.board[x][y];
  console.log("can you hit a ship", cellDetail);

  if (cellDetail) {
    const { shipType } = cellDetail;
    const ship = owner.ships[shipType];
    const { length, hitParts } = ship;
    // disable button if hit
    e.target.disabled = true;
    // change ship's hit status
    cellDetail.hit = true;
    // update owner's ship state
    owner.ships = {
      ...ship,
      hitParts: hitParts + 1
    };
    // change visual to match
    u(`div.cell.row-${x}.col-${y}`).text("X");

    console.log(owner.playerName, "ships: ", owner.ships);

    console.log("have you updated", cellDetail);
    // update my own score
  }
};

const _clickActiveCell = (e, players) => {
  const { x, y } = e.target.dataset;
  console.log("hey!", x, y);
};

export {
  _generateBoardID,
  _generateCharWithinLimit,
  _randPosGen,
  _generateObscuredBoard,
  _generateActiveBoard,
  _clickObscuredCell,
  _clickActiveCell
};
