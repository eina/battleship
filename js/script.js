import u from 'umbrellajs';
import { testEnemyArr } from './data';
import { generateActiveBoard, generateObscuredBoard } from './functions';

/* TESTING */

generateActiveBoard(testEnemyArr, "player2--active");


/** 
 * when you press start you want to generate
 *  player 2's obscured board for player 1
 * */

generateObscuredBoard(testEnemyArr, "player2--hidden");

// assign a click handler to the buttons
const buttons = u('.btn-cell');
buttons.handle('click', (e) => {
  const { x, y } = e.target.dataset  
  // console.log('what do you know about yourself', x, y);
  if(testEnemyArr[y][x] === 'O') {
    console.log('hit!!!!', testEnemyArr[y][x])
    // will change array
    testEnemyArr[y][x] = "X";
    // change visual
    // console.log(`cell row-${x} col-${y}`);
    u(`div.cell.row-${y}.col-${x}`).text('X');
  }  
})