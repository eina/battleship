import u from 'umbrellajs';

// generate board with ships
function generateActiveBoard(boardData, idName) {  
  const board = u(`#${idName}`);        
  if(board) {
    for (const key of Object.keys(boardData)) {
      const data = boardData[key];  
      board.append((status, index) => {  
        return (`<div class="cell row-${key} col-${index}">${status === null ? '--' : status}</div>`);
      }, data);
    }
  }  
}

// generate blank one to be hit!!!!
function generateObscuredBoard(boardData, idName) {
  const board = u(`#${idName}`);   
  if(board) {
    for (const x of Object.keys(boardData)) {
      const data = boardData[x];  
      board.append((status, index) => {      
        return (`<div class="cell">
          <button class="btn-cell"           
              data-x=${index} 
              data-y=${x}
              >?</button>
        </div>`);
      }, data);
    }        
  }
}

function cellBtnClick() {
  console.log('a click!');
}

module.exports = {
  generateActiveBoard,
  generateObscuredBoard
}