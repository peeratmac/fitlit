class Hydration {
  constructor(data) {
    this.data = data;
  }

  getDailyWaterIntake(date) {
    return this.data.find(user => user.date === date).numOunces;
  }

  getWeeklyWaterIntake(date) {
    let lastDay;
    this.data.forEach((hydration, index) => {
      if (hydration.date === date) {
        lastDay = index;
      }
    });

    return this.data
      .slice(lastDay - 6, lastDay + 1)
      .map(day => ({ ounces: day.numOunces, date: day.date }));
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
