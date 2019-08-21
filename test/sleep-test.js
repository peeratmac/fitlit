const chai = require('chai');
const expect = chai.expect;

const sleepTestData = require('../subset-data/sleep.js');
const Sleep = require('../src/Sleep');
const user1ID = 1;
const user2ID = 2;
let sleep = new Sleep(sleepTestData);

describe('SLEEP', () => {
  it('should average a user number of hours slept per day to 1 decimal places', () => {
    expect(sleep.averageDailySleep(user1ID)).to.equal(7.9);
  });

  it('should calculate average daily sleep quality for a user to 1 decimal places', () => {
    expect(sleep.averageSleepQuality(user2ID)).to.equal(3.5);
  });

  it('should be able to return the hours slept for a user on a specific date', () => {
    expect(sleep.getHoursSleptByDate('2019/06/15', user1ID)).to.equal(6.1);
  });

  it('should be able to return the quality of sleep for a user on a specific date', () => {
    expect(sleep.getQualityByDate('2019/06/15', user1ID)).to.equal(2.2);
  });

  it('should return the daily hours slept for a given week', () => {
    let hours = [4.1, 8, 10.4, 10.7, 9.3, 7.8, 7];
    let hours2 = [6.1, 4.1, 8, 10.4, 10.7, 9.3, 7.8];
    expect(sleep.getWeeklySleeps('2019/06/22', user1ID)).to.eql(hours);
    expect(sleep.getWeeklySleeps('2019/06/21', user1ID)).to.eql(hours2);
  });

  it('should return the nightly sleep quality for a given week', () => {
    let qualities1 = [3.8, 2.6, 3.1, 1.2, 1.2, 4.2, 3];
    let qualities2 = [2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2];
    expect(sleep.getWeeklyQualities('2019/06/22', user1ID)).to.eql(qualities1);
    expect(sleep.getWeeklyQualities('2019/06/21', user1ID)).to.eql(qualities2);
  });

  it('should be able to calculate the average sleep quality to one decimal', () => {
    expect(sleep.getGroupAverageQuality()).to.equal(3);
  });

  it('should find all users who average sleep quality greater than 3 for a given week', () => {
    let goodSleepers = [ 2, 3, 5, 6, 7, 8 ];
    expect(sleep.getGoodSleepers('2019/06/22')).to.eql(goodSleepers);
  });

  it.only('shoould be able to find the top sleeper for a given date', () =>{
    expect(sleep.getTopSleeper('2019/06/16')).to.eql([3])
    expect(sleep.getTopSleeper('2019/06/20')).to.eql([2, 5])
  })
});
