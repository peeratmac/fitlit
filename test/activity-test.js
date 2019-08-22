//To run only this series of test run:
//npm test test/activity-test.js
//from the terminal
const chai = require('chai');
const expect = chai.expect;

const activityTestData = require('../subset-data/activity.js');
const Activity = require('../src/Activity');
const ActivityRepository = require('../src/Activity-repository');
const activityRepo = new ActivityRepository(activityTestData);
const activity1 = new Activity(activityRepo.getUserActivityData(1));
const activity2 = new Activity(activityRepo.getUserActivityData(2));
const activity8 = new Activity(activityRepo.getUserActivityData(8));
const userData = require('../subset-data/users');
const UserRepository = require('../src/User-repository');
const User = require('../src/User');
const user1 = new User(userData[0]);
const user2 = new User(userData[1]);
const user1ID = 1;
const user2ID = 2;

describe('ACTIVITY REPOSITORY', () => {
  it('should be able to return an array of user data', () => {
    expect(activityRepo.getUserActivityData(user1ID).length).to.equal(8);
  });

  it('should calculate the all user average steps, active minutes and flights of stairs climbed for a given day', () => {
    expect(activityRepo.getAllUserAverage('2019/06/20', 'numSteps')).to.equal(
      8711
    );
    expect(
      activityRepo.getAllUserAverage('2019/06/20', 'minutesActive')
    ).to.equal(180);
    expect(
      activityRepo.getAllUserAverage('2019/06/20', 'flightsOfStairs')
    ).to.equal(25);
  });
});

describe('ACTIVITY', () => {
  it('should calculate the miles a user has walked on a given day', () => {
    expect(activity1.calculateMilesWalked('2019/06/20', user1)).to.equal(11.8);
  });

  it('should return the number of minutes a user was active for a given day', () => {
    expect(activity1.getMinutesActive('2019/06/20', user1ID)).to.equal(140);
  });

  it('should calculate how many minutes active did they average for a given week', () => {
    expect(activity1.getWeekAverageActivity('2019/06/21', user1ID)).to.equal(
      171.1
    );
  });

  it('should check if a user reached their step goal on a given day', () => {
    expect(activity1.checkStepGoal('2019/06/20', user1)).to.equal(true);
  });

  it('should find all the days a user exceeded their step goal', () => {
    let days = ['2019/06/17', '2019/06/20', '2019/06/22'];
    expect(activity1.findExceedStepGoal(user1)).to.eql(days);
  });

  it("should find a user's all-time stair climbing record", () => {
    expect(activity2.getMostStairsClimbed(user2ID)).to.equal(44);
  });

  it('should calculate how often a user achieve their step goal in percentage', () => {
    expect(activity2.calculateStepGoalAchievement(user2)).to.equal(50);
  });

  it('should return any activities for a user for any date', () => {
    expect(
      activity1.returnCurrentActivityDatum('2019/06/20', 'numSteps')
    ).to.equal(14478);
    expect(
      activity2.returnCurrentActivityDatum('2019/06/20', 'minutesActive')
    ).to.equal(74);
    expect(
      activity2.returnCurrentActivityDatum('2019/06/21', 'flightsOfStairs')
    ).to.equal(26);
  });

  it('should give out friends steps', () => {
    expect(activity2.getWeeklySteps('2019/06/21', user2ID)).to.equal(55054);
  });

  it('should return the dates where user had increased steps for the previous 3 days', () => {
    let daysTrend = ['2019/06/18', '2019/06/19'];
    expect(activity8.getDaysWithStepsTrend()).to.eql(daysTrend);
  });

  it('should return lifetime miles and calculate how many times the hikes were completed based on lifetime miles', () => {
    expect(activity1.compareMilesWalkedToHike(user1)).to.equal(
      'Your 56.1 lifetime miles is equivalent to 3.8 times you have done Mount Rainier Standard Summit Hike'
    );
  });
});
