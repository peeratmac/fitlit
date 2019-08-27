const chai = require('chai');
const expect = chai.expect;

const hydrationData = require('../subset-data/hydration.js');
const HydrationRepository = require('../src/Hydration-repository');
const Hydration = require('../src/Hydration');

describe('HYDRATION REPOSITORY', () => {
  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function');
  });

  it('should be able to find user data by ID', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    let hydrationUser5 = hydrationData.filter(user => user.userID === 5);
    expect(hydrationRepo.getUserHydrationByID(5)).to.eql(hydrationUser5);
  });

  it('should be able to calculate the average of all user water intake', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    expect(hydrationRepo.averageUserWaterIntake()).to.equal(67.025);
  });
});

describe('HYDRATION', () => {
  it('should be able to get user data from user ID', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    let userDataHydrations = hydrationRepo.getUserHydrationByID(1);
    let hydrationUser = new Hydration(userDataHydrations);
    expect(hydrationUser.data).to.eql([
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

  it('should be able to calculate daily water intake', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    let userDataHydrations = hydrationRepo.getUserHydrationByID(8);
    let hydrationUser = new Hydration(userDataHydrations);
    expect(hydrationUser.getDailyWaterIntake('2019/06/15')).to.eql(84);
  });

  it('should return an array of the last 7 days data for water intake', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    let userDataHydrations = hydrationRepo.getUserHydrationByID(3);
    let hydrationUser = new Hydration(userDataHydrations);

    const weeklyWaterUser7 = [
      {
        date: '2019/06/16',
        ounces: 99
      },
      {
        date: '2019/06/17',
        ounces: 28
      },
      {
        date: '2019/06/18',
        ounces: 40
      },
      {
        date: '2019/06/19',
        ounces: 85
      },
      {
        date: '2019/06/20',
        ounces: 51
      },
      {
        date: '2019/06/21',
        ounces: 41
      },
      {
        date: '2019/06/22',
        ounces: 78
      }
    ];

    expect(hydrationUser.getWeeklyWaterIntake('2019/06/22').length).to.equal(7);
    expect(hydrationUser.getWeeklyWaterIntake('2019/06/22')).to.eql(
      weeklyWaterUser7
    );
  });

  it('should calculate the average fluid consumed per day for all time', () => {
    let hydrationRepo = new HydrationRepository(hydrationData);
    let userDataHydrations = hydrationRepo.getUserHydrationByID(3);
    let userDataHydrations2 = hydrationRepo.getUserHydrationByID(6);
    let hydrationUser = new Hydration(userDataHydrations);
    let hydrationUser2 = new Hydration(userDataHydrations2);
    expect(hydrationUser.getAverageWaterConsumption()).to.equal(58);
    expect(hydrationUser2.getAverageWaterConsumption()).to.equal(68);
  });
});
