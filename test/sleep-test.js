const chai = require('chai');
const expect = chai.expect;

const sleep = require('../subset-data/sleep.js');

describe('SLEEP', () => {
  it('should have a subset list of sleep data of more than 7 days for testing', () => {
    expect(sleep.length).to.equal(80);
  });
});
