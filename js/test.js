const testEnemyArr = {
  a: [null, null, null, null, null,null, null, null, null, null],
  b: [null, 'O', null, null, null, 'O', 'O', 'X', null, null],
  c: [null, 'O', null, null, null, null, null, null, null, null],
  d: [null, 'O', null, null, null, null, null, null, null, null],
  e: [null, 'O', null, 'O', 'O', 'O', null, null, null, null],
  f: [null, 'O', null, null, null, null, null, null, null, null],
  g: [null, null, 'O', null, null, null, 'O', 'O', null, null],
  h: [null, null, 'O', null, null, null, null, null, null, null],
  i: [null, null, 'O', null, null, null, null, null, null, null],
  j: [null, null, 'O', null, null, null, null, null, null, null],
};

// test if i can append 
const enemyBoard = u('#board__enemy');
// let enemyRow = u('.row');

// console.log('what is this', enemyRow);

if(enemyBoard) {
  for (const x of Object.keys(testEnemyArr)) {
    const row = testEnemyArr[x];  
    enemyBoard.append((status) => {
        if(status === null) {
          return '<div class="cell">--</div>';
        } else {
          return `<div class="cell">${status}</div>`;
        }
    }, row);
  }
}

