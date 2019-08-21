// All DOM manipulation

let userID = 6;
// Math.ceil(Math.random() * 10);

// ! replace hard-coded dates with real data once that part is ready
// ! date should mostly be today's date (to get the past week / 7 days data)
const todayDate = '2019/09/22';
const userRepo = new UserRepository(userData);
const user = userRepo.getUserByID(userID);
const currentUser = new User(user);
const dailyStepGoal = currentUser.dailyStepGoal;
const globalStepAverage = userRepo.averageUserStepGoal();
const percentGlobalSteps = parseInt((dailyStepGoal / globalStepAverage) * 100);
const hydrationRepo = new HydrationRepository(hydrationData);
const userDataHydrations = hydrationRepo.getUserHydrationByID(userID);
const hydrationUser = new Hydration(userDataHydrations);
const dailyWaterIntake = hydrationUser.getDailyWaterIntake('2019/06/22');
const weeklyWaterIntake = hydrationUser.getWeeklyWaterIntake();
const sleepUser = new Sleep(sleepData);
const lastNightSleep = sleepUser.getHoursSleptByDate('2019/06/22', userID);
const weeklySleepArray = sleepUser.getWeeklySleeps('2019/06/22', userID);
const weeklySleepQualityArray = sleepUser.getWeeklyQualities(
  '2019/06/22',
  userID
);

// ? This probably can be done in the Sleep class, leaving it here for now.
const weeklySleepAverage = Number(
  weeklySleepArray.reduce((acc, night) => (acc += night), 0) /
    weeklySleepArray.length
).toFixed(1);

const weeklySleepQualityAverage = Number(
  weeklySleepQualityArray.reduce((acc, quality) => (acc += quality), 0) /
    weeklySleepQualityArray.length
).toFixed(1);

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
$('.water-history').text(weeklyWaterIntake.join('oz, ') + 'oz');
$('.user-sleep').text(lastNightSleep);
$('.user-sleep-average').text(weeklySleepAverage);
$('.user-quality-average').text(weeklySleepQualityAverage);
// $('.current-steps').text()
