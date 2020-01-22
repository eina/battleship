/**
 * Default starting board!
 * No need to generate this lmao
 */
const _board = {
  header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  a: [null, null, null, null, null, null, null, null, null, null],
  b: [null, null, null, null, null, null, null, null, null, null],
  c: [null, null, null, null, null, null, null, null, null, null],
  d: [null, null, null, null, null, null, null, null, null, null],
  e: [null, null, null, null, null, null, null, null, null, null],
  f: [null, null, null, null, null, null, null, null, null, null],
  g: [null, null, null, null, null, null, null, null, null, null],
  h: [null, null, null, null, null, null, null, null, null, null],
  i: [null, null, null, null, null, null, null, null, null, null],
  j: [null, null, null, null, null, null, null, null, null, null],
};

// default should never change!
// when placed give coords?
const shipsDefaults = {
  carrier: {
    hitParts: 0,
    length: 5,
    placed: false,
    active: true, // if hit completely becomes false?
  },
  battleship: {
    hitParts: 0,
    length: 4,
    placed: false,
    active: true, // if hit completely becomes false?
  },
  cruiser: {
    hitParts: 1,
    length: 3,
    placed: false,
    active: true, // if hit completely becomes false?
  },
  submarine: {
    hitParts: 1,
    length: 3,
    placed: false,
    active: true, // if hit completely becomes false?
  },
  destroyer: {
    hitParts: 0,
    length: 2,
    placed: false,
    active: true, // if hit completely becomes false?
  },
};

const _scores = {
  player1: 0,
  player2: 0,
};

module.exports = {
  // testEnemyArr,
  // testShipsArr,
  shipsDefaults,
  _scores,
  _board,
};
