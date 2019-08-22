let date = new Date();
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0'); 
const yyyy = date.getFullYear();
date =  yyyy + '/' + mm + '/' + dd;


// All DOM manipulation
$(document).ready(function () {
  const userRepo = new UserRepository(userData);
  let userID = Math.ceil(Math.random() * userRepo.data.length);

  // ! replace hard-coded dates with real data once that part is ready
  // ! date should mostly be today's date (to get the past week / 7 days data)
  const todayDate = date;
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
  const activity = new Activity(activityData)
  const lastNightSleep = sleepUser.getHoursSleptByDate(todayDate, userID);
  const weeklySleepArray = sleepUser.getWeeklySleeps(todayDate, userID);
  const weeklySleepQualityArray = sleepUser.getWeeklyQualities(todayDate, userID);


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
  $('.jq-all-time-sleep-average').text(sleepUser.averageDailySleep(userID));
  $('.jq-all-time-quality-average').text(sleepUser.averageSleepQuality(userID));
  $('.jq-percent-achieve').text(activity.calculateStepGoalAchievement(user)+ '%');
  $('.current-steps').text(activity.returnCurrentActivityDatum(todayDate, userID, 'numSteps'));
  $('.active-minutes').text(activity.returnCurrentActivityDatum(todayDate, userID, 'minutesActive'));
  $('.current-flight-of-stairs').text(activity.returnCurrentActivityDatum(todayDate, userID, 'flightsOfStairs'));
  $('.miles-walked').text(activity.calculateMilesWalked(todayDate, user));
  $('.weekly-minutes-active').text(activity.getWeekAverageActivity(todayDate, userID));
  // $('.weekly-steps').text(activity.getWeekAverageSteps(todayDate, userID))
  // $().text()
  // $().text()
  $('.all-average-steps').text(activity.getAllUserAverage(todayDate, 'numSteps'))
  $('.all-average-minutes').text(activity.getAllUserAverage(todayDate, 'minutesActive'))
  $('.all-average-stairs').text(activity.getAllUserAverage(todayDate, 'flightsOfStairs'))
  
  $('.date').text(date)


})

