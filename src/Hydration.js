class Hydration {
  constructor(data) {
    this.data = data;
  }

  getDailyWaterIntake(date) {
    let dailyOunces = this.data.find(user => user.date === date).numOunces;
    return dailyOunces;
  }

  getWeeklyWaterIntake() {
    let weekly = this.data.slice(this.data.length - 7, this.data.length + 1);
    let weeklyWaterIntake = weekly.map(day => day.numOunces);
    return weeklyWaterIntake;
  }

  getAverageWaterConsumption() {
    let totalWaterConsume = this.data.reduce(
      (acc, day) => (acc += day.numOunces),
      0
    );
    return parseInt(totalWaterConsume / this.data.length);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
