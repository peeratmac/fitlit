// All DOM manipulation

let userID = Math.ceil(Math.random() * 50);

// ! replace hard-coded dates with real data once that part is ready
// ! date should mostly be today's date (to get the past week / 7 days data)
const todayDate = '2019/06/22';
const userRepo = new UserRepository(userData);
const user = userRepo.getUserByID(userID);
const currentUser = new User(user);
const dailyStepGoal = currentUser.dailyStepGoal;
const globalStepAverage = userRepo.averageUserStepGoal();
const percentGlobalSteps = parseInt((dailyStepGoal / globalStepAverage) * 100);
const hydrationRepo = new HydrationRepository(hydrationData);
const userDataHydrations = hydrationRepo.getUserHydrationByID(userID);
const hydrationUser = new Hydration(userDataHydrations);
const dailyWaterIntake = hydrationUser.getDailyWaterIntake(todayDate);
const weeklyWaterIntake = hydrationUser.getWeeklyWaterIntake();
const sleepUser = new Sleep(sleepData);
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
$('.water-history').text(weeklyWaterIntake.join('oz, ') + 'oz');
$('.user-sleep').text(lastNightSleep);
$('.user-sleep-average').text(`${weeklySleepArray.join(' hours, ')}`);
$('.jq-week-quality').text(weeklySleepQualityArray.join(' points, '));
$('.jq-all-time-sleep-average').text(sleepUser.averageDailySleep(userID))
$('.jq-all-time-quality-average').text(sleepUser.averageSleepQuality(userID))
// $('.current-steps').text()
