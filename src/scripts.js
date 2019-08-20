//All DOM manipulation


let userId = Math.ceil(Math.random()*10)
const todayDate = '2019/09/22';
const userRepo = new UserRepository(userData);
const user = userRepo.getUserByID(5);
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
$('.address').text(currentUser.address);
$('.email').text(currentUser.email);
$('.stride').text(currentUser.strideLength);
// $('.current-steps').text()


