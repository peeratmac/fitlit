class Sleep {
  constructor(userSleepData) {
    this.userData = userSleepData;
  }

  averageDailySleep() {
    let nightCount = this.userData.length;
    let totalHoursSlept = this.userData.reduce((acc, night) => {
      acc += night.hoursSlept;
      return acc;
    }, 0);

    return Number((totalHoursSlept / nightCount).toFixed(1));
  }

  averageSleepQuality() {
    let nightCount = this.userData.length;
    let totalSleepQuality = this.userData.reduce((acc, night) => {
      acc += night.sleepQuality;
      return acc;
    }, 0);

    return Number((totalSleepQuality / nightCount).toFixed(1));
  }

  getHoursSleptByDate(date) {
    let hoursSlept = this.userData.find(night => night.date === date)
      .hoursSlept;

    return hoursSlept;
  }

  getQualityByDate(date) {
    let nightQuality = this.userData.find(night => night.date === date)
      .sleepQuality;

    return nightQuality;
  }

  getWeeklySleeps(date) {
    let lastDay;
    this.userData.forEach((night, index) =>
      night.date === date ? (lastDay = index) : null
    );
    let weekly = this.userData.slice(lastDay - 6, lastDay + 1);
    let weeklyHoursSlept = weekly.map(night => night.hoursSlept);

    return weeklyHoursSlept;
  }

  getWeeklyQualities(date) {
    let lastDay;
    this.userData.forEach((night, index) =>
      night.date === date ? (lastDay = index) : null
    );

    return this.userData
      .slice(lastDay - 6, lastDay + 1)
      .map(night => night.sleepQuality);
  }

  calculateSleepScore(date) {
    let selectedNightSleep = this.userData.find(night => night.date === date);
    let sleepScore =
      selectedNightSleep.hoursSlept * selectedNightSleep.sleepQuality;
    return sleepScore;
  }

  getWeeklySleepScores(date) {
    let weeklySleeps = this.getWeeklySleeps(date);
    let weeklyQualities = this.getWeeklyQualities(date);

    return weeklySleeps.map((hour, index) => {
      return Number((hour * weeklyQualities[index]).toFixed(2));
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
