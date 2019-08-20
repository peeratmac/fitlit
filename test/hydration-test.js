const chai = require('chai');
const expect = chai.expect;

const hydrationData = require('../subset-data/hydration.js');
const HydrationRepository = require('../src/Hydration-repository');
const Hydration = require('../src/Hydration');

describe('HYDRATION REPOSITORY', () => {
  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function');
  });

  it('should be able to find user by ID', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    expect(hydrationRepo.getUserByID(5)).to.eql(hydrationData[4]);
  });

  it('should be able to calculate the average of all user water intake', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    expect(hydrationRepo.averageUserWaterIntake()).to.equal(67.025);
  });
});

describe('HYDRATION', () => {
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be able to filter user by ID number and return all of that user data', () => {
    let hydrationUser = new Hydration(hydrationData);
    expect(hydrationUser.filterUser(1)).to.eql([
      { userID: 1, date: '2019/06/15', numOunces: 37 },
      { userID: 1, date: '2019/06/16', numOunces: 69 },
      { userID: 1, date: '2019/06/17', numOunces: 96 },
      { userID: 1, date: '2019/06/18', numOunces: 61 },
      { userID: 1, date: '2019/06/19', numOunces: 91 },
      { userID: 1, date: '2019/06/20', numOunces: 50 },
      { userID: 1, date: '2019/06/21', numOunces: 50 },
      { userID: 1, date: '2019/06/22', numOunces: 43 }
    ]);
  });

  it('should be able to calculate daily water intake of a specific user given the id and date', () => {
    let hydrationUser = new Hydration(hydrationData);
    expect(hydrationUser.getDailyWaterIntake(8, '2019/06/15')).to.eql(84);

    let hydrationData2 = [
      {
        userID: 60,
        date: '2019/06/24',
        numOunces: 66
      }
    ];

    let hydrationUser2 = new Hydration(hydrationData2);

    expect(hydrationUser2.getDailyWaterIntake(60, '2019/06/24')).to.eql(66);
  });

  it('should be able to get the last 7 days data for water intake', () => {
    let hydrationUser = new Hydration(hydrationData);

    expect(hydrationUser.getWeeklyWaterIntake(3).length).to.equal(7);
    expect(hydrationUser.getWeeklyWaterIntake(3)).to.eql([
      99,
      28,
      40,
      85,
      51,
      41,
      78
    ]);
  });
});
