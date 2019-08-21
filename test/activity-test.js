//To run only this series of test run:
//npm test test/activity-test.js
//from the terminal
const chai = require('chai');
const expect = chai.expect;

const activityTestData = require('../subset-data/activity.js');
const Activity = require('../src/Activity');
const activity = new Activity(activityTestData);

const userData = require('../subset-data/users');
const UserRepository = require('../src/User-repository');
const User = require('../src/User');
const user1 = new User(userData[0]);
const user2 = new User(userData[1]);
const user1ID = 1;
const user2ID = 2;

describe('ACTIVITY', () => {
  it('should calculate the miles a user has walked on a given day', () => {
    expect(activity.calculateMilesWalked('2019/06/20', user1)).to.equal(11.8);
  });

  it('should return the number of minutes a user was active for a given day', () => {
    expect(activity.getMinutesActive('2019/06/20', user1ID)).to.equal(140);
  });

  it('should calculate how many minutes active did they average for a given week', () => {
    expect(activity.getWeekAverageActivity('2019/06/21', user1ID)).to.equal(
      171.1
    );
  });

  it('should check if a user reached their step goal on a given day', () => {
    expect(activity.checkStepGoal('2019/06/20', user1)).to.equal(true);
  });

  it('should find all the days a user exceeded their step goal', () => {
    let days = ['2019/06/17', '2019/06/20', '2019/06/22'];
    expect(activity.findExceedStepGoal(user1)).to.eql(days);
  });

  it.only("should find a user's all-time stair climbing record", () => {
    expect(activity.getMostStairsClimbed(user2ID)).to.equal(44);
  });

  it('should calculate the all user average steps, active minutes and flights of stairs climbed for a given day', () => {
    expect(activity.getAllUserAverage('2019/06/20', 'numSteps')).to.equal(
      8711.6
    );
    expect(activity.getAllUserAverage('2019/06/20', 'minutesActive')).to.equal(
      180.6
    );
    expect(
      activity.getAllUserAverage('2019/06/20', 'flightsOfStairs')
    ).to.equal(25.5);
  });
});
