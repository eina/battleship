import u from 'umbrellajs';
import { scores } from './data';
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

function isShipAlive(hitParts, length) {  
  if(hitParts === length) {
    console.log('ship down!')
    return false;
  }
  return true;
}

function clickObscuredCell(e, dataArr, shipsState) {
  const { x, y } = e.target.dataset;
  const cellDetail = dataArr[x][y];

  // if you hit a ship, it'll always be an object with a shipType property
  if(cellDetail && cellDetail.shipType) {    
    const { shipType } = cellDetail;
    const { length, hitParts } = shipsState[shipType];
    // change dataArr
    cellDetail.hit = true;
    // update player2 shipState
    shipsState[shipType] = { 
      ...shipsState[shipType], 
      hitParts: hitParts + 1, 
      active: isShipAlive(hitParts + 1, length)
    }
    // change visual to match
    u(`div.cell.row-${x}.col-${y}`).text('X');
    // increment score if a ship is down
    incrementScore('player1', shipsState[shipType]);
    console.log('what the score?', scores.player1)
    stopGame(scores.player1)
    // console.log('hit!!!!', x, y,);
    // console.log('did you update', shipsState[shipType])    
  }  
}

function incrementScore(player, shipState) {
  if(shipState && shipState.active === false) {        
    console.log('increase score!');
    scores[player] += 1;
  }  
}

function stopGame(score) {
  if(score === 5) {
    console.log('you won! stop it!!!!!')
  }
}

module.exports = {
  generateActiveBoard,
  generateObscuredBoard,
  clickObscuredCell
}