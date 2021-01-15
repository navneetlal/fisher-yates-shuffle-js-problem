const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const shuffleArray = require('..');

describe('Array Shuffle', () => {
  function getArray(length, multiplier) {
    return new Array(length).fill(null).map(() => Math.floor(Math.random() * multiplier * 1000));
  }

  let positiveTestArrays;
  let negativeTestArrays;
  let testArrays;

  before(() => {
    positiveTestArrays = new Array(10).fill(null).map(() => getArray(5, 1));
    negativeTestArrays = new Array(10).fill(null).map(() => getArray(5, -1));
    testArrays = [...positiveTestArrays, ...negativeTestArrays];
  });

  it('should return empty array', () => expect(shuffleArray([])).to.be.empty);

  it('should not always return sorted array', () => {
    testArrays.forEach((array) => {
      const sortedArray = [...array].sort();
      const shuffledArray = shuffleArray([...array]);
      expect(shuffledArray).to.not.eql(sortedArray, 'Expected shuffled array to be not equals to sorted array');
    });
  });

  it('should return shuffled array for positive elements array', () => {
    positiveTestArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array]);
      expect(shuffledArray).to.have.members(array).but.not.eql(array);
    });
  });

  it('should return shuffled array for negative elements array', () => {
    negativeTestArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array]);
      expect(shuffledArray).to.have.members(array).but.not.eql(array);
    });
  });

  it('should return shuffled array for positive + negative elements array', () => {
    testArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array]);
      expect(shuffledArray).to.have.members(array).but.not.eql(array);
    });
  });
});
