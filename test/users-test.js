const chai = require('chai');
const expect = chai.expect;

const userData = require('../subset-data/users');
const UserRepository = require('../src/User-repository');
const User = require('../src/User');

describe('USER REPOSITORY', () => {
  it('should hold user data', () => {
    let userRepo = new UserRepository(userData);
    expect(userRepo.data).to.eql(userData);
  });

  it('should be able to find a user by ID', () => {
    let userRepo = new UserRepository(userData);
    expect(userRepo.getUserByID(2)).to.eql(userData[1]);
  });

  it('should be able to calculate the average of step goal of all users', () => {
    let userRepo = new UserRepository(userData);
    expect(userRepo.averageUserStepGoal()).to.equal(6200);
  });

  it('should be able to tell you about their friends', () => {
    let userRepo = new UserRepository(userData);
    expect(userRepo.getFriends([2, 3, 4])).to.eql([
      { name: 'Jarvis Considine', id: 2 },
      { name: 'Herminia Witting', id: 3 },
      { name: 'Mae Connelly', id: 4 }
    ]);
  });
});

describe('USERS', () => {
  it('should be able to instantiate a new User given userData', () => {
    let userData1 = {
      id: 107,
      name: 'Kirk White',
      address: '123 Main St',
      email: 'a@a.com'
    };
    let user = new User(userData1);
    userData1.strideLength = 3;
    userData1.friends = [];
    userData1.dailyStepGoal = 10000;
    expect(user).to.eql(userData1);
  });

  it("should be able to return a user's first name", () => {
    let user = new User(userData[1]);
    expect(user.getFirstName()).to.equal('Jarvis');
  });
});
