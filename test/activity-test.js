const chai = require('chai');
const expect = chai.expect;

const activity = require('../subset-data/activity.js');

describe('ACTIVITY', () => {
  it('should have a subset list of activity data of more than 7 days for testing', () => {
    expect(activity.length).to.equal(80);
  });
});
