const chai = require('chai');
const expect = chai.expect;

const sleepTestData = require('../subset-data/sleep.js');
const SleepRepository = require('../src/Sleep-repository');
const Sleep = require('../src/Sleep');

let sleepRepo = new SleepRepository(sleepTestData);
let sleeper1 = new Sleep(sleepRepo.getUserSleepData(1));
let sleeper2 = new Sleep(sleepRepo.getUserSleepData(2));

const user1ID = 1;
const user2ID = 2;

describe('SLEEP REPOSITORY', () => {
  it('should be able to return an array of user data', () => {
    expect(sleepRepo.getUserSleepData(user1ID).length).to.equal(8);
  });

  it('should be able to calculate the average sleep quality to one decimal', () => {
    expect(sleepRepo.getGroupAverageQuality()).to.equal(3);
  });

  it('should find all users who average sleep quality greater than 3 for a given week', () => {
    let goodSleepers = [2, 3, 5, 6, 7, 8];
    expect(sleepRepo.getGoodSleepers('2019/06/22')).to.eql(goodSleepers);
  });

  it('should be able to find the top sleeper for a given date', () => {
    expect(sleepRepo.getTopSleeper('2019/06/16')).to.eql([3]);
    expect(sleepRepo.getTopSleeper('2019/06/20')).to.eql([2, 5]);
  });
});

describe('SLEEP', () => {
  it('should average a user number of hours slept per day to 1 decimal places', () => {
    expect(sleeper1.averageDailySleep()).to.equal(7.9);
  });

  it('should calculate average daily sleep quality for a user to 1 decimal places', () => {
    expect(sleeper2.averageSleepQuality()).to.equal(3.5);
  });

  it('should be able to return the hours slept for a user on a specific date', () => {
    expect(sleeper1.getHoursSleptByDate('2019/06/15')).to.equal(6.1);
  });

  it('should be able to return the quality of sleep for a user on a specific date', () => {
    expect(sleeper1.getQualityByDate('2019/06/15')).to.equal(2.2);
  });

  it('should return the daily hours slept for a given week', () => {
    let hours = [4.1, 8, 10.4, 10.7, 9.3, 7.8, 7];
    let hours2 = [6.1, 4.1, 8, 10.4, 10.7, 9.3, 7.8];
    expect(sleeper1.getWeeklySleeps('2019/06/22')).to.eql(hours);
    expect(sleeper1.getWeeklySleeps('2019/06/21')).to.eql(hours2);
  });

  it('should return the nightly sleep quality for a given week', () => {
    let qualities1 = [3.8, 2.6, 3.1, 1.2, 1.2, 4.2, 3];
    let qualities2 = [2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2];
    expect(sleeper1.getWeeklyQualities('2019/06/22')).to.eql(qualities1);
    expect(sleeper1.getWeeklyQualities('2019/06/21')).to.eql(qualities2);
  });

  it('should calculate sleep score of a user for a given date', () => {
    expect(sleeper1.calculateSleepScore('2019/06/20')).to.equal(11.16);
  });

  it('should return sleep scores of a user for the last 7 days', () => {
    let sleepScores = [15.58, 20.8, 32.24, 12.84, 11.16, 32.76, 21];
    expect(sleeper1.getWeeklySleepScores('2019/06/22')).to.eql(sleepScores);
  });
});
