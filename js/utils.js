/**
 * Util: Generate a random number from 0 to [max]
 * @param {number} max 
 */
const _randNum = (max) => {
  return Math.round(Math.random() * max);
};

/**
 * Util: Generate a random letter from a - j
 * @returns {string}
 */
const _randRowLetter = () => {
  const letterArrays = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const randIdx = _randNum(9);

  return letterArrays[randIdx];
}

const _randOrientation = () => {
  const orientation = ['vertical', 'horizontal']
  const randIdx = _randNum(1);

  return orientation[randIdx];
}

export {
  _randNum,
  _randRowLetter,
  _randOrientation
}