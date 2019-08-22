class Hydration {
  constructor(data) {
    this.data = data;
  }

  getDailyWaterIntake(date) {
    return this.data.find(user => user.date === date).numOunces;
  }

  getWeeklyWaterIntake() {
    return this.data
      .slice(this.data.length - 7, this.data.length + 1)
      .map(day => day.numOunces);
  }

  getAverageWaterConsumption() {
    return parseInt(
      this.data.reduce((acc, day) => (acc += day.numOunces), 0) /
        this.data.length
    );
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
