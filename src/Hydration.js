class Hydration {
  constructor(data) {
    this.data = data;
  }

  filterUser(idNumber) {
    return this.data.filter(user => user.userID === idNumber);
  }

  getDailyWaterIntake(id, date) {
    let theUser = this.data.find(
      user => user.userID === id && user.date === date
    );
    return theUser.numOunces;
  }

  getWeeklyWaterIntake(idNumber) {
    let theUser = this.filterUser(idNumber);
    let weekly = theUser.slice(theUser.length - 7, theUser.length + 1);

    let weeklyWaterIntake = weekly.map(user => user.numOunces);

    return weeklyWaterIntake;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
