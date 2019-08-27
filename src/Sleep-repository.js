class SleepRepository {
  constructor(sleepData) {
    this.data = sleepData;
  }

  getUserSleepData(idNumber) {
    return this.data.filter(night => night.userID === idNumber);
  }

  getGroupAverageQuality() {
    let totalQuality = this.data.reduce((acc, sleep) => {
      acc += sleep.sleepQuality;
      return acc;
    }, 0);
    return Number((totalQuality / this.data.length).toFixed(1));
  }

  getAllUsersId() {
    return this.data
      .map(sleep => sleep.userID)
      .reduce((acc, idNumber) => {
        if (!acc.includes(idNumber)) {
          acc.push(idNumber);
        }
        return acc;
      }, []);
  }
  getGoodSleepers(date) {
    let goodSleepers = [];
    this.getAllUsersId().forEach(id => {
      let lastDay;
      let userData = this.getUserSleepData(id);
      userData.forEach((night, index) => {
        if (night.date === date) {
          lastDay = index;
        }
      });

      let weekData = userData
        .slice(lastDay - 6, lastDay + 1)
        .map(night => night.sleepQuality);
      if (weekData.reduce((a, b) => a + b, 0) / 7 > 3) {
        goodSleepers.push(id);
      }
    });

    return goodSleepers;
  }

  getTopSleeper(date) {
    let dateData = this.data.filter(sleep => sleep.date === date);
    dateData.sort((sleepA, sleepB) => sleepB.hoursSlept - sleepA.hoursSlept);

    return dateData[0].hoursSlept > dateData[1].hoursSlept
      ? [dateData[0].userID]
      : [dateData[0].userID, dateData[1].userID];
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}
