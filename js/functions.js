import u from 'umbrellajs';

function generateEnemyBoard(boardData) {
  const enemyBoard = u('#board__enemy');    
  if(enemyBoard) {
    for (const x of Object.keys(boardData)) {
      const data = boardData[x];  
      enemyBoard.append((status) => {
          if(status === null) {
            return '<div class="cell">--</div>';
          } else {
            return `<div class="cell">${status}</div>`;
          }
      }, data);
    }
  }  
}

// generate blank one to be hit!!!!
function generateBlankEnemyBoard(boardData) {
  const blankBoard = u('#board__enemy--blank');
  
  if(blankBoard) {
    for (const x of Object.keys(boardData)) {
      const data = boardData[x];  
      blankBoard.append((status) => '<button class="cell">hit</button>', data);
    }        
  }
}

module.exports = {
  generateEnemyBoard
}