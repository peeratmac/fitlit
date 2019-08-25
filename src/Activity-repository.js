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

  getFriendsListStepCount(friendsList, date) {
    return this.data
      .filter(e => e.date === date)
      .reduce((acc, friend) => {
        if (friendsList.includes(friend.userID)) {
          acc.push({ steps: friend.numSteps, id: friend.userID });
        }
        return acc;
      }, []);
  }

  weeklyStepTotal(idNumber, date) {
    let userData = this.getUserActivityData(idNumber);
    let lastDay;
    userData.forEach((day, index) =>
      day.date === date ? (lastDay = index) : null
    );
    let weeklyTotal = userData
      .slice(lastDay - 6, lastDay + 1)
      .reduce((stepTotal, day) => (stepTotal += day.numSteps), 0);

    return weeklyTotal;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
