class Activity {
  constructor(activityData) {
    this.data = activityData;
  }

  calculateMilesWalked(date, id) {
    let stepsTaken = this.data.find(active => active.date === date && active.userID === id).numSteps
    let stride = 1;

    return Number((stepsTaken*stride/5280).toFixed(1))
  }

  getMinutesActive(date, id) {}

  getWeekAverageActivity(date, id) {}

  checkStepGoal(date, id) {}

  findExceedStepGoal(id) {}

  getMostStairsClimbed(id) {}

  getAllUserAverage(date, property) {
    let allUserDateData = this.data.filter(active => active.date === date);
    return allUserDateData.reduce((acc, active)=> acc + active[property], 0) / allUserDateData.length
  }


}









if (typeof module !== 'undefined') {
  module.exports = Activity;
}