class Sleep {
  constructor(userSleepData) {
    this.userData = userSleepData;
  }

  // getUserSleepData(idNumber) {
  //   return this.data.filter(night => night.userID === idNumber);
  // }

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

  // getGroupAverageQuality() {
  //   let totalQuality = this.data.reduce((acc, sleep) => {
  //     acc += sleep.sleepQuality;
  //     return acc;
  //   }, 0);
  //   return Number((totalQuality / this.data.length).toFixed(1));
  // }

  // getGoodSleepers(date) {
  //   let goodSleepers = [];
  //   // console.log(this.data)
  //   let idList = this.data
  //     .map(sleep => sleep.userID)
  //     .reduce((acc, idNumber) => {
  //       if (!acc.includes(idNumber)) acc.push(idNumber);
  //       return acc;
  //     }, []);
  //   idList.forEach(id => {
  //     if (this.getWeeklyQualities(date, id).reduce((a, b) => a + b, 0) / 7 > 3)
  //       goodSleepers.push(id);
  //   });

  //   return goodSleepers;
  // }

  // getTopSleeper(date) {
  //   let dateData = this.data.filter(sleep => sleep.date === date);
  //   dateData.sort((sleepA, sleepB) => sleepB.hoursSlept - sleepA.hoursSlept);

  //   return dateData[0].hoursSlept > dateData[1].hoursSlept
  //     ? [dateData[0].userID]
  //     : [dateData[0].userID, dateData[1].userID];
  // }

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
