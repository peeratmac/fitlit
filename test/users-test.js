const chai = require('chai');
const expect = chai.expect;

const users = require('../subset-data/users.js');

describe('USERS', () => {
  it('should have a subset list of users for testing', () => {
    expect(users.length).to.equal(10);
  });
});
