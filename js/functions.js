import u from 'umbrellajs';

/**
 * Helper function to show proper marker for ships on board
 * @param {object} shipObj 
 * @param {string} row 
 * @param {number} col 
 * @returns {string} 'X' if hit, 'O' if not hit, '--' if no ship in area
 */
function showShipMarker(shipObj, row, col) {
  let marker;
  if(shipObj && typeof shipObj === "object") {
    marker = shipObj.hit ? "X" : "O";
  } else {
    marker = '--';
  }
  return (`<div class="cell row-${row} col-${col}">${marker}</div>`);
}

// generate board with ships
function generateActiveBoard(boardData, idName) {  
  const board = u(`#${idName}`);        
  if(board) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      // generate row header
      board.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);     
      board.append((status, index) => {
        // generate col header
        if(key === "header") {
          return `<div class="cell-header">${status}</div>`
        }
         // generate body 
         return showShipMarker(status, key, index);
      }, data);
    }
  }  
}

// generate blank one to be hit!!!!
function generateObscuredBoard(boardData, idName) {
  const board = u(`#${idName}`);   
  if(board) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];
      board.append(`<div class="cell-header">
        ${key === "header" ? " " : key}
      </div>`);
      board.append((status, index) => {      
        if(key === "header") {
          return `<div class="cell-header">${status}</div>`
        }
        return (`<div class="cell">          
          <button class="btn-cell"           
              data-x=${key} 
              data-y=${index}>?
          </button>
        </div>`);
      }, data);
    }        
  }
}

function clickObscuredCell(e, dataArr) {
  const { x, y } = e.target.dataset  
  console.log('what do you know about yourself', x, y);

  if(dataArr[x][y] === 'O') {
    console.log('hit!!!!', dataArr[x][y])
    // will change array
    dataArr[x][y] = "X";
    // change visual
    // console.log(`cell row-${x} col-${y}`);
    u(`div.cell.row-${x}.col-${y}`).text('X');
  }  
}

module.exports = {
  generateActiveBoard,
  generateObscuredBoard,
  clickObscuredCell
}