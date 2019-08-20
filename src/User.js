class User {
  constructor(userDataObject) {
    this.id = userDataObject.id;
    this.name = userDataObject.name;
    this.address = userDataObject.address || '';
    this.email = userDataObject.email || '';
    this.strideLength = userDataObject.strideLength || 3;
    this.dailyStepGoal = userDataObject.dailyStepGoal || 10000;
    this.friends = userDataObject.friends || [];
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }
}

module.exports = User;
