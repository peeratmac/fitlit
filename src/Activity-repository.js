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
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
