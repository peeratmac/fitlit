const todayDate = `${new Date().getFullYear()}/${String(
  new Date().getMonth() + 1
).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;

const userRepo = new UserRepository(userData);
let userID = Math.ceil(Math.random() * userRepo.data.length);
const currentUser = new User(userRepo.getUserByID(userID));
const hydrationRepo = new HydrationRepository(hydrationData);
const hydrationUser = new Hydration(hydrationRepo.getUserHydrationByID(userID));
const activityRepo = new ActivityRepository(activityData);
const activity = new Activity(activityRepo.getUserActivityData(userID));
const sleepRepo = new SleepRepository(sleepData);
const sleepUser = new Sleep(sleepRepo.getUserSleepData(userID));
const dailyStepGoal = currentUser.dailyStepGoal;
const globalStepAverage = userRepo.averageUserStepGoal();
const percentGlobalSteps = parseInt((dailyStepGoal / globalStepAverage) * 100);
const dailyWaterIntake = hydrationUser.getDailyWaterIntake(todayDate);
const weeklyWaterIntake = hydrationUser.getWeeklyWaterIntake(todayDate);
const lastNightSleep = sleepUser.getHoursSleptByDate(todayDate, userID);
const weeklySleepArray = sleepUser.getWeeklySleeps(todayDate, userID);
const weeklySleepQualityArray = sleepUser.getWeeklyQualities(todayDate, userID);
const weeklyWinnerId = currentUser.friends.concat(currentUser.id)
.map(id => ({id: id, weeklySteps: activityRepo.weeklyStepTotal(id, todayDate)}))
.sort((a, b) => b.weeklySteps - a.weeklySteps)[0].id;

const weeklyWinner = userData.find(el => el.id === weeklyWinnerId).name;

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

$('.miles-walked').text(activity.calculateMilesWalked(todayDate, currentUser));

$('.weekly-minutes-active').text(
  activity.getWeekAverageActivity(todayDate, 'minutesActive')
);

$('.weekly-steps').text(activity.getWeekAverageActivity(todayDate, 'numSteps'));

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

$('.step-leader').append(`<h3>${weeklyWinner}</h3>`);
activity.getDaysWithStepsTrend().forEach(day => {
  $('.day-streaks').prepend(`<p>${day}</p>`);
});

activityRepo.getFriendsListStepCount(currentUser.friends, todayDate)
  .sort((a, b) => b.steps - a.steps)
  .forEach(friend => {
    $('.friend-list').append(
      `<li class="jq-user${friend.id}"> ${friend.steps}</li>`
    );
  });

userRepo.getFriends(currentUser.friends).forEach(friend => {
  $(`.jq-user${friend.id}`).prepend(`${friend.name} steps: `);
});

hydrationUser.getWeeklyWaterIntake(todayDate).forEach(day => {
  $('.water-history').append(`<p>${day.date} you drank ${day.ounces}oz.</p>`);
});

sleepUser.getWeeklySleeps(todayDate).forEach(night => {
  $('.user-sleep-average').append(
    `<p>On ${night.date} you slept for ${night.hours} hours.</p>`
  );
});

sleepUser.getWeeklyQualities(todayDate).forEach(night => {
  $('.jq-week-quality').append(
    `<p>On ${night.date} your sleep quality was rated at ${night.quality}.</p>`
  );
});

currentUser.friends.concat(currentUser.id)
  .map(id => ({ id: id, weeklySteps: activityRepo.weeklyStepTotal(id, todayDate)}))
  .sort((a, b) => b.weeklySteps - a.weeklySteps)
  .forEach(friend => {
    if (friend.id === currentUser.id) {
      $('.jq-friend-week-steps').append(
        `<b><li class="green" id="jq-ws-${friend.id}">
          ${friend.weeklySteps}
        </li></b>`
      );
    } else {
      $('.jq-friend-week-steps').append(
        `<li id="jq-ws-${friend.id}">${friend.weeklySteps}</li>`
      );
    }
  });

userRepo.getFriends(currentUser.friends.concat(currentUser.id))
  .forEach(friend => {
    $(`#jq-ws-${friend.id}`).prepend(`${friend.name}: `);
  });

$('.toggle-dark').on('click', () => {
  $('body').toggleClass('dark');
  $('header').toggleClass('dark');
  $('section').toggleClass('dark');
  $('button').toggleClass('dark');
  $('.toggle-dark').blur();
})

// ! * Chart.js
Chart.defaults.global.defaultFontFamily = 'Livvic';
const getWeeklySleepsArray = date => {
  return sleepUser.getWeeklySleeps(date).map(night => night.hours);
};

const getWeeklyQualitiesArray = date => {
  return sleepUser.getWeeklyQualities(date).map(night => night.quality);
};

// * Sleep Hours
const getWeeklySleepDates = date => {
  return sleepUser.getWeeklySleeps(date).map(night => night.date);
};

let lastWeekSleepHoursChart = $('#TEST-CHART-SLEEP-1');
new Chart(lastWeekSleepHoursChart, {
  type: 'bar',
  data: {
    labels: getWeeklySleepDates(todayDate),
    datasets: [
      {
        label: 'Sleep Quality',
        data: getWeeklyQualitiesArray(todayDate),
        backgroundColor: [
          'rgba(69,170,242, 0.5)',
          'rgba(0, 184, 148, 0.5)',
          'rgba(165,94,234, 0.5)',
          'rgba(75,123,236, 0.5)',
          'rgba(43,203,186, 0.5)',
          'rgba(162,155,254, 0.5)',
          'rgba(38,222,129, 0.5)'
        ],
        borderColor: [
          'rgba(69,170,242, 1)',
          'rgba(0, 184, 148, 1)',
          'rgba(165,94,234, 1)',
          'rgba(75,123,236, 1)',
          'rgba(43,203,186, 1)',
          'rgba(162,155,254, 1)',
          'rgba(38,222,129, 1)'
        ],
        borderWidth: 2,
        type: 'line',
        fill: false,
        hoverBorderWidth: 3
      },
      {
        label: 'Sleep Hours',
        data: getWeeklySleepsArray(todayDate),
        backgroundColor: [
          'rgba(69,170,242, 0.5)',
          'rgba(0, 184, 148, 0.5)',
          'rgba(165,94,234, 0.5)',
          'rgba(75,123,236, 0.5)',
          'rgba(43,203,186, 0.5)',
          'rgba(162,155,254, 0.5)',
          'rgba(38,222,129, 0.5)'
        ],
        type: 'bar',
        fill: false,
        hoverBorderWidth: 3,
        hoverBorderColor: [
          'rgba(69,170,242, 1)',
          'rgba(0, 184, 148, 1)',
          'rgba(165,94,234, 1)',
          'rgba(75,123,236, 1)',
          'rgba(43,203,186, 1)',
          'rgba(162,155,254, 1)',
          'rgba(38,222,129, 1)'
        ]
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
    hoverBorderWidth: 3,
    maintainAspectRatio: false
  }
});

// * Sleep Scores Chart
let weeklySleepScores = sleepUser.getWeeklySleepScores(todayDate);
let lastWeekSleepScoresChart = $('#TEST-CHART-SLEEP-2');
let xlastWeekSleepScoresChart = new Chart(lastWeekSleepScoresChart, {
  type: 'bar',
  data: {
    labels: getWeeklySleepDates(todayDate),
    datasets: [
      {
        label: 'Sleep Scores',
        backgroundColor: [
          'rgba(69,170,242, 0.5)',
          'rgba(0, 184, 148, 0.5)',
          'rgba(165,94,234, 0.5)',
          'rgba(75,123,236, 0.5)',
          'rgba(43,203,186, 0.5)',
          'rgba(162,155,254, 0.5)',
          'rgba(38,222,129, 0.5)'
        ],
        data: weeklySleepScores,
        borderColor: '#777',
        hoverBorderWidth: 3,
        hoverBorderColor: [
          'rgba(69,170,242, 1)',
          'rgba(0, 184, 148, 1)',
          'rgba(165,94,234, 1)',
          'rgba(75,123,236, 1)',
          'rgba(43,203,186, 1)',
          'rgba(162,155,254, 1)',
          'rgba(38,222,129, 1)'
        ]
      }
    ]
  },
  options: {
    legend: false,
    title: {
      display: true
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

// * Weekly Water Chart
const getWeeklyWaterDates = date => {
  return hydrationUser.getWeeklyWaterIntake(date).map(day => day.date);
};
let lastWeekWaterChart = $('#TEST-CHART-WATER-1');
let xLastWeekWaterChart = new Chart(lastWeekWaterChart, {
  type: 'line',
  data: {
    labels: getWeeklyWaterDates(todayDate),
    datasets: [
      {
        label: 'Water Consumed (Ounces)',
        borderColor: [
          'rgba(69,170,242, 1)',
          'rgba(0, 184, 148, 1)',
          'rgba(165,94,234, 1)',
          'rgba(75,123,236, 1)',
          'rgba(43,203,186, 1)',
          'rgba(162,155,254, 1)',
          'rgba(38,222,129, 1)'
        ],
        data: hydrationUser
          .getWeeklyWaterIntake(todayDate)
          .map(day => day.ounces),
        borderWidth: 2,
        // fill: true,
        backgroundColor: 'rgba(69,170,242, 0.5)'
      }
    ]
  },
  options: {
    legend: false,
    title: {
      display: true,
      text: 'Ounces'
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

// * All Time Activity (Steps)
let allTimeActivityChart = $('#TEST-CHART-ACTIVITY-ALL');
let xAllTimeActivityChart = new Chart(allTimeActivityChart, {
  type: 'bar',
  data: {
    labels: activityRepo.getAllTimeDates(userID),
    datasets: [
      {
        label: 'Steps',
        backgroundColor: 'rgba(0, 184, 148, 0.5',
        data: activityRepo.getUserActivityAllTime(userID)
      }
    ]
  },
  options: {
    legend: false,
    title: {
      display: true
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

// Packery and Draggabilly
let $grid = $('.grid').packery({
  itemSelector: '.grid-item',
  columnWidth: 100
});

$('.grid').packery({
  itemSelector: '.grid-item',
  gutter: 15,
  percentPosition: true,
  columnWidth: 100
});

$grid.find('.grid-item').each(function(i, gridItem) {
  let draggie = new Draggabilly(gridItem);
  $grid.packery('bindDraggabillyEvents', draggie);
});