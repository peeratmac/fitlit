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
    let goodSleepers = [];
    // console.log(this.data)
    let idList = this.data.map(sleep => sleep.userID).reduce((acc, idNumber)=> {
      if (!acc.includes(idNumber)) acc.push(idNumber);
      return acc;
    },[]);
    idList.forEach(id => {
      if (this.getWeeklyQualities(date, id).reduce((a, b)=> a + b, 0 ) / 7 > 3) goodSleepers.push(id);
    });

    return goodSleepers
  }

  getTopSleeper(date) {
    let dateData = this.data.filter(sleep => sleep.date === date);
    dateData.sort((sleepA,sleepB)=> sleepB.hoursSlept - sleepA.hoursSlept);

    return dateData[0].hoursSlept > dateData[1].hoursSlept ? [dateData[0].userID] : [dateData[0].userID,dateData[1].userID];   
  }


}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
