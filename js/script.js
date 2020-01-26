import u from "umbrellajs";
import player from "./player";
import { PLAYER_2_NAME, PLAYER_2_ID } from "./data";
import { _clickObscuredCell, _clickActiveCell, _clickPosButton } from "./board";

/**
 * Flow:
 *
 * 1. Ask for user's name
 * 2. Place Player 2's ships
 * 3. generate a list of moves
 * 4. Let Player 1 place their ships
 * 5. Wait until start game button is pressed
 */

// start game btn
const startBtn = u("#start-game");
startBtn.handle("click", e => {
  console.log("start game!");
});
let currentTurn = ""; // playerID?

// when game loads, instantiate players
const player1 = { ...player };
const player2 = { ...player };

// give playerNames, grab player 1's from user input
player1.setPlayerName("Player 1");
player1.setPlayerID(1); // randomly generate in the future idk
player2.setPlayerName(PLAYER_2_NAME);
player2.setPlayerID(PLAYER_2_ID);

// when instantiated:
// generate player 2 ships
player2.placeGeneratedShips();

// generate boards
// player 1's boards
player1.showBoardOnDOM({ obscured: false });
player2.showBoardOnDOM({ obscured: true });

// player 2's boards
player1.showBoardOnDOM({ obscured: true });
player2.showBoardOnDOM({ obscured: false });

/**
 * Position Control Button Handlers
 * For Player 1
 */
const posControlBtns = u(".pos-control");
posControlBtns.handle("click", e => {
  _clickPosButton(e, player1);
});

/**
 * Obscure Boards Click Handlers
 */
const player1ObscureBtns = u("#player1--hidden .cell .btn-cell");
player1ObscureBtns.handle("click", e => {
  // player 1 clicks
  _clickObscuredCell(e, { enemy: player2, owner: player1 });
  console.log("is the main board updating", player1.board);
});

const player2ObscureBtns = u("#player2--hidden .cell .btn-cell");
player2ObscureBtns.handle("click", e => {
  _clickObscuredCell(e, { enemy: player1, owner: player2 });

  // player 2 moves after
  player2.generateMove();
  player2.simulateClick({ enemy: player1, owner: player2 }, _clickObscuredCell);
  // console.log("is the main board updating", player2.board);

  // console.log("scores", { player1: player1.score, player2: player2.score });
});

/**
 * Obscure Boards Click Handlers
 */
const player1ActiveCell = u("#player1--active .cell");
player1ActiveCell.handle("click", e => {
  _clickActiveCell(e, player1);
  // console.log("is the main board updating", player1.board);
});

// const player2ActiveCell = u("#player2--active .cell");
// player2ActiveCell.handle("click", e => {
//   _clickActiveCell(e, { enemy: player1, owner: player2 });
//   console.log("is the main board updating", player2.board);
// });
