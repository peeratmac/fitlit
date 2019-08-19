const chai = require('chai');
const expect = chai.expect;

const hydration = require('../subset-data/hydration.js');

describe('HYDRATION', () => {
  it('should have a subset list of hydration data of more than 7 days for testing', () => {
    expect(hydration.length).to.equal(80);
  });
});
