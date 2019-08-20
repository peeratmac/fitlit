//All DOM manipulation


let userId = 4
const todayDate = '2019/09/22';
const userRepo = new UserRepository(userData);
const user = userRepo.getUserByID(userId);
const currentUser = new User(user);
const dailyStepGoal = currentUser.dailyStepGoal;
const globalStepAverage = userRepo.averageUserStepGoal()
const percentGlobalSteps = parseInt(dailyStepGoal / globalStepAverage * 100)

$('.user-name').text(currentUser.name);
$('.user-first-name').text(currentUser.getFirstName());
$('.user-step-goal').text(currentUser.dailyStepGoal);
$('.average-all-step-goal').text(userRepo.averageUserStepGoal());
$('.date-today').text(todayDate);
$('.step-goal-card').text(currentUser.dailyStepGoal);
$('.step-goal-percent').text(percentGlobalSteps);
$('.email').text(currentUser.email);
$('.address').text(currentUser.address);
$('.stride').text(currentUser.strideLength);
// $('.current-steps').text()


