const { describe, it, before } = require('mocha');
const { expect } = require('chai');

const shuffleArray = require('..');

describe('Array Shuffle', () => {
  let positiveTestArrays;
  let negativeTestArrays;
  let testArrays;

  function getArray(multiplier) {
    const length = Math.floor(Math.random() * 50) + 5;
    return new Array(length).fill(null).map(() => Math.floor(Math.random() * multiplier * 1000));
  }

  before(() => {
    positiveTestArrays = new Array(10).fill(null).map(() => getArray(1));
    negativeTestArrays = new Array(10).fill(null).map(() => getArray(-1));
    testArrays = [...positiveTestArrays, ...negativeTestArrays];
  });

  it('should return empty array', () => expect(shuffleArray([], 0)).to.be.empty);

  it('should return shuffled array for positive elements array', () => {
    positiveTestArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array], array.length);
      expect(shuffledArray)
        .to.have.members(array)
        .but.not.eql(array);
    });
  });

  it('should return shuffled array for negative elements array', () => {
    negativeTestArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array], array.length);
      expect(shuffledArray)
        .to.have.members(array)
        .but.not.eql(array);
    });
  });

  it('should return shuffled array for positive + negative elements array', () => {
    testArrays.forEach((array) => {
      const shuffledArray = shuffleArray([...array], array.length);
      expect(shuffledArray)
        .to.have.members(array)
        .but.not.eql(array);
    });
  });

  it('should not always return same value', () => {
    const array = getArray(1);
    const firstShuffledArray = shuffleArray([...array], array.length);
    const secondShuffledArray = shuffleArray([...array], array.length);
    expect(firstShuffledArray)
      .to.not.eql(secondShuffledArray, 'Expected return different different array in each iteration');
  });
});
