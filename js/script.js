import u from 'umbrellajs';
import { testEnemyArr, testShipsArr, shipsDefaults } from './data';
import { generateActiveBoard, 
  generateObscuredBoard,
  clickObscuredCell
 } from './functions';

/* TESTING WITH STATIC DATA*/

/**
 * when you press start, you want to assign shipDefaultState to both players
 * player 2's ships will become {active: true}
 */

 // testing for player 2 so their ships show up!
function testPlaceShips(shipDefaultsObj) {
  // assign to a new object to keep default state static
  const newObj = {...shipDefaultsObj};

  for(const ship of Object.keys(newObj)) {    
    newObj[ship] = { ...newObj[ship], placed: true }
  }

  return newObj;
}

const player2ShipsState = testPlaceShips(shipsDefaults);
// console.log('are you all different?', player2ShipsState, shipsDefaults);

/** 
 * when you press start you want to generate
 *  player 2's obscured board for player 1
 * */
generateObscuredBoard(testShipsArr, "player2--hidden");

// TESTING: player 2's active board where you can see the ships
generateActiveBoard(testShipsArr, "player2--active");

/**
 * Assigns a click handler for the obscured board's buttons
 * will change data of array it's generating
 * will also change visually
 */
const buttons = u('.btn-cell');
buttons.handle('click', (e) => clickObscuredCell(e, testShipsArr, player2ShipsState))

