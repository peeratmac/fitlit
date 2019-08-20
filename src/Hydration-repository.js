class HydrationRepository {
  constructor(data) {
    this.data = data;
  }

  getUserByID(idNumber) {
    return this.data.find(user => user.userID === idNumber);
  }

  averageUserWaterIntake() {
    let waterTotal = this.data.reduce((acc, x) => acc + x.numOunces, 0);
    return waterTotal / this.data.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}
