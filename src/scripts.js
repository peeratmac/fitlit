const todayDate = `${new Date().getFullYear()}/${String(
  new Date().getMonth() + 1
).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;

$(document).ready(function() {
  const userRepo = new UserRepository(userData);
  let userID = Math.ceil(Math.random() * userRepo.data.length);
  const currentUser = new User(userRepo.getUserByID(userID));
  const hydrationRepo = new HydrationRepository(hydrationData);
  const hydrationUser = new Hydration(
    hydrationRepo.getUserHydrationByID(userID)
  );
  const activityRepo = new ActivityRepository(activityData);
  const activity = new Activity(activityRepo.getUserActivityData(userID));
  const sleepRepo = new SleepRepository(sleepData);
  const sleepUser = new Sleep(sleepRepo.getUserSleepData(userID));
  const dailyStepGoal = currentUser.dailyStepGoal;
  const globalStepAverage = userRepo.averageUserStepGoal();
  const percentGlobalSteps = parseInt(
    (dailyStepGoal / globalStepAverage) * 100
  );
  const dailyWaterIntake = hydrationUser.getDailyWaterIntake(todayDate);
  const weeklyWaterIntake = hydrationUser.getWeeklyWaterIntake();
  const lastNightSleep = sleepUser.getHoursSleptByDate(todayDate, userID);
  const weeklySleepArray = sleepUser.getWeeklySleeps(todayDate, userID);
  const weeklySleepQualityArray = sleepUser.getWeeklyQualities(
    todayDate,
    userID
  );

  $('.user-name').text(currentUser.name);
  $('.user-first-name').text(currentUser.getFirstName());
  $('.user-step-goal').text(currentUser.dailyStepGoal);
  $('.average-all-step-goal').text(userRepo.averageUserStepGoal());
  $('.date-today').text(todayDate);
  $('.step-goal-card').text(currentUser.dailyStepGoal);
  $('.step-goal-percent').text(percentGlobalSteps);
  $('.address').text(currentUser.address);
  $('.email').text(currentUser.email);
  $('.stride').text(currentUser.strideLength);
  $('.water').text(dailyWaterIntake);

  $('.user-sleep').text(lastNightSleep);

  $('.jq-all-time-sleep-average').text(sleepUser.averageDailySleep(userID));
  $('.jq-all-time-quality-average').text(sleepUser.averageSleepQuality(userID));
  $('.jq-percent-achieve').text(
    activity.calculateStepGoalAchievement(currentUser) + '%'
  );
  $('.current-steps').text(
    activity.returnCurrentActivityDatum(todayDate, 'numSteps')
  );
  $('.active-minutes').text(
    activity.returnCurrentActivityDatum(todayDate, 'minutesActive')
  );
  $('.current-flight-of-stairs').text(
    activity.returnCurrentActivityDatum(todayDate, 'flightsOfStairs')
  );

  $('.miles-walked').text(
    activity.calculateMilesWalked(todayDate, currentUser)
  );

  $('.weekly-minutes-active').text(
    activity.getWeekAverageActivity(todayDate, 'minutesActive')
  );

  $('.weekly-steps').text(
    activity.getWeekAverageActivity(todayDate, 'numSteps')
  );

  $('.weekly-stairs').text(
    activity.getWeekAverageActivity(todayDate, 'flightsOfStairs')
  );

  $('.all-average-steps').text(
    activityRepo.getAllUserAverage(todayDate, 'numSteps')
  );
  $('.all-average-minutes').text(
    activityRepo.getAllUserAverage(todayDate, 'minutesActive')
  );
  $('.all-average-stairs').text(
    activityRepo.getAllUserAverage(todayDate, 'flightsOfStairs')
  );
  $('.mountain').text(activity.compareMilesWalkedToHike(currentUser));

  activity.getDaysWithStepsTrend().forEach(day => {
    $('.day-streaks').append(`<li>${day}</li>`);
  });

  activityRepo
    .getFriendsListStepCount(currentUser.friends, todayDate)
    .sort((a, b) => b.steps - a.steps)
    .forEach(friend => {
      $('.friend-list').append(
        `<li class="jq-user${friend.id}"> ${friend.steps}</li>`
      );
    });

  userRepo.getFriends(currentUser.friends).forEach(friend => {
    $(`.jq-user${friend.id}`).prepend(`${friend.name} steps: `);
  });

  hydrationUser.getWeeklyWaterIntake().forEach(day => {
    $('.water-history').append(`<p>${day.date} you drank ${day.ounces}oz.</p>`);
  });

  sleepUser.getWeeklySleeps(todayDate).forEach(night => {
    $('.user-sleep-average').append(
      `<p>On ${night.date} you slept for ${night.hours} hours.</p>`
    );
  });

  sleepUser.getWeeklyQualities(todayDate).forEach(night => {
    $('.jq-week-quality').append(
      `<p>On ${night.date} your sleep quality was rated at ${
        night.quality
      }.</p>`
    );
  });

  // ! testing chart.js
  Chart.defaults.global.defaultFontFamily = 'Livvic';
  // * for mapping sleep hours in a correct format
  const getWeeklySleepsArray = date => {
    return sleepUser.getWeeklySleeps(date).map(night => night.hours);
  };

  let lastWeekSleepHoursChart = $('#TEST-CHART-SLEEP-1');
  let xLastWeekSleepHoursChart = new Chart(lastWeekSleepHoursChart, {
    type: 'bar',

    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', todayDate],
      datasets: [
        {
          label: 'Sleep Hours',
          backgroundColor: [
            '#45aaf2',
            '#4b7bec',
            '#a55eea',
            '#26de81',
            '#2bcbba',
            '#fed330',
            '#fd9644'
          ],
          data: getWeeklySleepsArray(todayDate),
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Sleep (Hours)'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  let weeklySleepScores = sleepUser.getWeeklySleepScores(todayDate);

  let lastWeekSleepScoresChart = $('#TEST-CHART-SLEEP-2');
  let xlastWeekSleepScoresChart = new Chart(lastWeekSleepScoresChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', todayDate],
      datasets: [
        {
          label: 'Sleep Scores',
          backgroundColor: [
            '#45aaf2',
            '#4b7bec',
            '#a55eea',
            '#26de81',
            '#2bcbba',
            '#fed330',
            '#fd9644'
          ],
          data: weeklySleepScores,
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Sleep Scores (Points)'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // ******** Water Chart **********
  let lastWeekWaterChart = $('#TEST-CHART-WATER-1');
  let xLastWeekWaterChart = new Chart(lastWeekWaterChart, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', todayDate],
      datasets: [
        {
          label: 'Water Consumed (Ounces)',
          backgroundColor: [
            '#45aaf2',
            '#4b7bec',
            '#a55eea',
            '#26de81',
            '#2bcbba',
            '#fed330',
            '#fd9644'
          ],
          data: hydrationUser.getWeeklyWaterIntake().map(day => day.ounces),
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Water (Ounces)'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
