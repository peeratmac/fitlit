class Activity {
  constructor(activityData) {
    this.userData = activityData;
  }

  calculateMilesWalked(date, user) {
    let stepsTaken = this.userData.find(
      active => active.date === date && active.userID === user.id
    ).numSteps;
    return Number(((stepsTaken * user.strideLength) / 5280).toFixed(1));
  }

  getMinutesActive(date) {
    let minutesActive = this.userData.find(active => active.date === date)
      .minutesActive;

    return minutesActive;
  }

  getWeekAverageActivity(date, property) {
    let lastDay;
    this.userData.forEach((activity, index) =>
      activity.date === date ? (lastDay = index) : null
    );
    let weekly = this.userData.slice(lastDay - 6, lastDay + 1);
    let weeklyActivity =
      weekly.reduce((acc, active) => {
        acc += active[property];
        return acc;
      }, 0) / 7;

    return Number(weeklyActivity.toFixed(1));
  }

  checkStepGoal(date, user) {
    let activeDay = this.userData.find(active => active.date === date);
    return activeDay.numSteps >= user.dailyStepGoal ? true : false;
  }

  findExceedStepGoal(user) {
    let daysExceedStepGoal = this.userData.filter(
      active =>
        active.userID === user.id && active.numSteps > user.dailyStepGoal
    );

    return daysExceedStepGoal.map(active => active.date);
  }

  getMostStairsClimbed() {
    let maxFlights = Math.max(
      ...this.userData.map(active => active.flightsOfStairs)
    );
    return maxFlights;
  }

  calculateStepGoalAchievement(user) {
    let daysAchieved = this.userData.filter(day => {
      return day.numSteps > user.dailyStepGoal;
    });
    return Math.ceil((daysAchieved.length / this.userData.length) * 100);
  }

  returnCurrentActivityDatum(date, activity) {
    return this.userData.find(e => e.date === date)[activity];
  }

  getWeeklySteps(date) {
    let lastDay;
    this.userData.forEach((activity, index) =>
      activity.date === date ? (lastDay = index) : null
    );
    let weekly = this.userData.slice(lastDay - 6, lastDay + 1);
    let totalWeeklySteps = weekly.reduce((acc, active) => {
      acc += active.numSteps;
      return acc;
    }, 0);
    return totalWeeklySteps;
  }

  getDaysWithStepsTrend() {
    let daysTrend = this.userData.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if (
        day.numSteps > this.userData[index - 1].numSteps &&
        this.userData[index - 1].numSteps > this.userData[index - 2].numSteps
      ) {
        acc.push(day.date);
      }
      return acc;
    }, []);
    return daysTrend;
  }

  compareMilesWalkedToHike(user) {
    let totalStepsTaken = this.userData.reduce((acc, active) => {
      acc += active.numSteps;
      return acc;
    }, 0);
    let totalMilesWalked = Number(
      (totalStepsTaken * user.strideLength) / 5280
    ).toFixed(1);
    let mountRainierSummitHike = 14.7;
    let timesYouHiked = Number(
      totalMilesWalked / mountRainierSummitHike
    ).toFixed(1);

    return `Your ${totalMilesWalked} lifetime miles is equivalent to ${timesYouHiked} times you have completed the Mount Rainier Standard Summit Hike`;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
