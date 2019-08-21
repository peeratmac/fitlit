// All DOM manipulation

let userId = 5;
// Math.ceil(Math.random() * 10);
const todayDate = '2019/09/22';
const userRepo = new UserRepository(userData);
const user = userRepo.getUserByID(userId);
const currentUser = new User(user);
const dailyStepGoal = currentUser.dailyStepGoal;
const globalStepAverage = userRepo.averageUserStepGoal();
const percentGlobalSteps = parseInt((dailyStepGoal / globalStepAverage) * 100);
const hydrationRepo = new HydrationRepository(hydrationData);
const userDataHydrations = hydrationRepo.getUserHydrationByID(userId);
const hydrationUser = new Hydration(userDataHydrations);
const dailyWaterIntake = hydrationUser.getDailyWaterIntake('2019/06/22');
const weeklyWaterIntake = hydrationUser.getWeeklyWaterIntake();

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
// $('.current-steps').text()
