class UserRepository {
  constructor(data) {
    this.data = data;
  }

  getUserByID(idNumber) {
    return this.data.find(user => user.id === idNumber);
  }

  averageUserStepGoal() {
    let stepTotal = this.data.reduce((acc, x) => acc + x.dailyStepGoal, 0);
    return stepTotal / this.data.length;
  }

  getFriends(array) {
    return this.data.reduce((acc, friend) => {
      if (array.includes(friend.id)) {
        acc.push({ name: friend.name, id: friend.id });
      }
      return acc;
    }, []);
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
