import u from 'umbrellajs';
import { testEnemyArr, testShipsArr } from './data';
import { generateActiveBoard, 
  generateObscuredBoard,
  clickObscuredCell
 } from './functions';

/* TESTING WITH STATIC DATA*/
generateActiveBoard(testShipsArr, "player2--active");

/** 
 * when you press start you want to generate
 *  player 2's obscured board for player 1
 * */

generateObscuredBoard(testEnemyArr, "player2--hidden");

/**
 * Assigns a click handler for the obscured board's buttons
 * will change data of array it's generating
 * will also change visually
 */
const buttons = u('.btn-cell');
buttons.handle('click', (e) => clickObscuredCell(e, testEnemyArr))

