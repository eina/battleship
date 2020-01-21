/**
 * BOARD RELATED FUNCTIONS
 * ie. clicking board buttons, rendering etc
 */

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
  _generateObscuredBoard,
  _generateActiveBoard,
  _clickObscuredCell,
};
