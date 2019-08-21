class Sleep {
  constructor(sleepData) {
    this.data = sleepData;
  }
  getUserSleepData(idNumber) {
    return this.data.filter(night => night.userID === idNumber);
  }

  averageDailySleep(idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let nightCount = userSleepData.length;
    let totalHoursSlept = userSleepData.reduce((acc, night) => {
      acc += night.hoursSlept;
      return acc;
    }, 0);

    return Number((totalHoursSlept / nightCount).toFixed(1));
  }

  averageSleepQuality(idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let nightCount = userSleepData.length;
    let totalSleepQuality = userSleepData.reduce((acc, night) => {
      acc += night.sleepQuality;
      return acc;
    }, 0);

    return Number((totalSleepQuality / nightCount).toFixed(1));
  }

  getHoursSleptByDate(date, idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let hoursSlept = userSleepData.find(night => night.date === date)
      .hoursSlept;

    return hoursSlept;
  }

  getQualityByDate(date, idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let nightQuality = userSleepData.find(night => night.date === date)
      .sleepQuality;

    return nightQuality;
  }

  getWeeklySleeps(date, idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let lastDay;
    userSleepData.forEach((night, index) =>
      night.date === date ? (lastDay = index) : null
    );
    let weekly = userSleepData.slice(lastDay - 6, lastDay + 1);
    let weeklyHoursSlept = weekly.map(night => night.hoursSlept);

    return weeklyHoursSlept;
  }

  getWeeklyQualities(date, idNumber) {
    let userSleepData = this.getUserSleepData(idNumber);
    let lastDay;
    userSleepData.forEach((night, index) =>
      night.date === date ? (lastDay = index) : null
    );
    let weekly = userSleepData.slice(lastDay - 6, lastDay + 1);
    let weeklyQualities = weekly.map(night => night.sleepQuality);

    return weeklyQualities;
  }

  getGroupAverageQuality() {
    let totalQuality = this.data.reduce((acc, sleep) => {
      acc += sleep.sleepQuality;
      return acc;
    }, 0);
    return Number((totalQuality / this.data.length).toFixed(1));
  }

  getGoodSleepers(date) {
    this.data.forEach(sleep => {
      let sleepData = this.getUserSleepData(sleep.userID);
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
