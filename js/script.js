console.log('hello!')
// import u from 'umbrellajs';
import { testEnemyArr } from './data';
import { generateEnemyBoard } from './functions';

// when you press start you want to generate an enemy board
generateEnemyBoard(testEnemyArr);
// also generate the other player's board to be hit
// generateBlankEnemyBoard(testEnemyArr);