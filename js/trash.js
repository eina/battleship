const testEnemyArr = {
  header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  a: [null, null, null, null, null, null, null, null, null, null],
  b: [null, "O", null, null, null, "O", "O", "X", null, null],
  c: [null, "O", null, null, null, null, null, null, null, null],
  d: [null, "O", null, null, null, null, null, null, null, null],
  e: [null, "O", null, "O", "O", "O", null, null, null, null],
  f: [null, "O", null, null, null, null, null, null, null, null],
  g: [null, null, "O", null, null, null, "O", "O", null, null],
  h: [null, null, "O", null, null, null, null, null, null, null],
  i: [null, null, "O", null, null, null, null, null, null, null],
  j: [null, null, "O", null, null, null, null, null, null, null],
};

// data with potential ship?
const testShipsArr = {
  header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  a: [null, null, null, null, null, null, null, null, null, null],
  b: [
    null,
    { shipType: "carrier", hit: false },
    null,
    null,
    null,
    { shipType: "cruiser", hit: true },
    { shipType: "cruiser", hit: false },
    { shipType: "cruiser", hit: false },
    null,
    null,
  ],
  c: [
    null,
    { shipType: "carrier", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  d: [
    null,
    { shipType: "carrier", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  e: [
    null,
    { shipType: "carrier", hit: false },
    null,
    { shipType: "submarine", hit: false },
    { shipType: "submarine", hit: true },
    { shipType: "submarine", hit: false },
    null,
    null,
    null,
    null,
  ],
  f: [
    null,
    { shipType: "carrier", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  g: [
    null,
    null,
    { shipType: "battleship", hit: false },
    null,
    null,
    null,
    { shipType: "destroyer", hit: false },
    { shipType: "destroyer", hit: false },
    null,
    null,
  ],
  h: [
    null,
    null,
    { shipType: "battleship", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  i: [
    null,
    null,
    { shipType: "battleship", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  j: [
    null,
    null,
    { shipType: "battleship", hit: false },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};
