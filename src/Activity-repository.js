class ActivityRepository {
  constructor(activityData) {
    this.data = activityData;
  }

  getUserActivityData(idNumber) {
    return this.data.filter(active => active.userID === idNumber);
  }

  getAllUserAverage(date, property) {
    let allUserDateData = this.data.filter(active => active.date === date);
    return parseInt(
      allUserDateData.reduce((acc, active) => acc + active[property], 0) /
        allUserDateData.length
    );
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
