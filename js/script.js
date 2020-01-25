import u from "umbrellajs";
import { _randNum, _randRowLetter, _randOrientation } from "./utils";
import player from "./player";
import { _randPosGen, _clickObscuredCell } from "./board";
// import { testEnemyArr, testShipsArr, shipsDefaults } from "./data";
import { shipsDefaults } from "./data";

// when game loads, instantiate players
const player1 = { ...player };
const player2 = { ...player };

// give playerNames, grab player 1's from user input
player1.setPlayerName("Player 1");
player2.setPlayerName("Player 2");

// when instantiated:
// generate player 2 ships
// loop throuugh shipsDefaults
player2.placeShip(true);
// console.log("what are you?", player2.placedShips);
console.log("what is your board like?", player2.board);

// generate boards
// player 1's boards
player1.showBoardOnDOM();
player2.showBoardOnDOM(true);

// player 2's boards
player2.showBoardOnDOM();
player1.showBoardOnDOM(true, true);

// attach click functionality
const player1btns = u("#player1--hidden .cell .btn-cell");
player1btns.handle("click", e => _clickObscuredCell(e, { owner: player1, enemy: player2 }));

const player2btns = u("#player2--hidden .cell .btn-cell");
player2btns.handle("click", e => _clickObscuredCell(e, { enemy: player1, owner: player2 }));

/*** IGNORE BELOW FOR NOW  */

/* Planning start function */
// function startGame() {
//   // make player1 and player2 with player?
//   const player1 = player;
//   const player2 = player;

//   // generateBoard for player 2 with ships
//   // generateObscure for player 2 after ships are placed
// }

// function generateShipPosition(board, ship) {
//   // generate orientation
//   const orientation = _randOrientation();
//   // if vertical, check col and ship length?
//   // if horizontal, check row and ship length?
//   const startingPoint = {
//     row: _randRowLetter,
//     col: _randNum(9), // how do i make this generate properly?
//   };
// }

/* TESTING WITH STATIC DATA*/

/**
 * when you press start, you want to assign shipDefaultState to both players
 * player 2's ships will become {active: true}
 */

// testing for player 2 so their ships show up!
// function testPlaceShips(shipDefaultsObj) {
//   // assign to a new object to keep default state static
//   const newObj = { ...shipDefaultsObj };

//   for (const ship of Object.keys(newObj)) {
//     newObj[ship] = { ...newObj[ship], placed: true };
//   }

//   return newObj;
// }

// const player2ShipsState = testPlaceShips(shipsDefaults);
// console.log('are you all different?', player2ShipsState, shipsDefaults);

/**
 * when you press start you want to generate
 *  player 2's obscured board for player 1
 * */
// generateObscuredBoard(testShipsArr, "player2--hidden");

// TESTING: player 2's active board where you can see the ships
// generateActiveBoard(testShipsArr, "player2--active");

/**
 * Assigns a click handler for the obscured board's buttons
 * will change data of array it's generating
 * will also change visually
 */
// const buttons = u('.btn-cell');
// buttons.handle('click', (e) => clickObscuredCell(e, testShipsArr, player2ShipsState))
