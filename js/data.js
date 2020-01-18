const testEnemyArr = {
  header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

// data with potential ship?
const testShipsArr ={
  header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  a: [null, null, null, null, null,null, null, null, null, null],
  b: [null, {shipType: 'carrier', hit: false}, null, null, null, {shipType: 'cruiser', hit: true}, {shipType: 'cruiser', hit: false}, {shipType: 'cruiser', hit: false}, null, null],
  c: [null, {shipType: 'carrier', hit: false}, null, null, null, null, null, null, null, null],
  d: [null, {shipType: 'carrier', hit: false}, null, null, null, null, null, null, null, null],
  e: [null, {shipType: 'carrier', hit: false}, null, {shipType: 'submarine', hit: false}, {shipType: 'submarine', hit: true}, {shipType: 'submarine', hit: false}, null, null, null, null],
  f: [null, {shipType: 'carrier', hit: false}, null, null, null, null, null, null, null, null],
  g: [null, null, {shipType: 'battleship', hit: false}, null, null, null, {shipType: 'destroyer', hit: false}, {shipType: 'destroyer', hit: false}, null, null],
  h: [null, null, {shipType: 'battleship', hit: false}, null, null, null, null, null, null, null],
  i: [null, null, {shipType: 'battleship', hit: false}, null, null, null, null, null, null, null],
  j: [null, null, {shipType: 'battleship', hit: false}, null, null, null, null, null, null, null],
};

// default should never change!
// when placed give coords?
const shipsDefaults = {
  carrier: {
    hitParts: 0,
    length: 5,
    placed: false,        
    active: true // if hit completely becomes false?
  },
  battleship: {
    hitParts: 0,
    length: 4,
    placed: false,        
    active: true // if hit completely becomes false?
  },
  cruiser: {
    hitParts: 0,
    length: 3,
    placed: false,        
    active: true // if hit completely becomes false?
  },
  submarine: {
    hitParts: 0,
    length: 3,
    placed: false,        
    active: true // if hit completely becomes false?
  },
  destroyer: {
    hitParts: 0,
    length: 2,
    placed: false,        
    active: true // if hit completely becomes false?
  }   
}

const scores = {
  player1: 0,
  player2: 0
}

module.exports = {
  testEnemyArr,
  testShipsArr,
  shipsDefaults,
  scores
}

