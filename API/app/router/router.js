module.exports = function (databaseBS, Sequelize) {
    var trackerRouter = require('../controller/trackerController')(databaseBS, Sequelize);
    var childrenReviewRouter = require('../controller/childrenReviewController')(databaseBS, Sequelize);
    var registrationRouter = require('../controller/registrationController')(databaseBS, Sequelize);
    var profileRouter = require('../controller/profileController')(databaseBS, Sequelize);
    var childrenProfileRouter = require('../controller/childrenProfileController')(databaseBS, Sequelize);
    var connectionRouter = require('../controller/connectionController')(databaseBS, Sequelize);
    var loginactiveChangeRouter = require('../controller/loginController')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {

        router.post('/trackerDates', trackerRouter.ListDates);// list dates at the graph module
        router.post('/tracker', trackerRouter.Tracker);// tracker form with the holistic indicators
        router.post('/review', childrenReviewRouter.ChildrenReview);// child review form
        router.post('/viewReviewDetail', trackerRouter.ReviewGraph);//graph generation
        router.post('/registration', registrationRouter.Registration);// insert data for registration
        router.post('/validateuser', registrationRouter.ValidateUser);//validate users at login
        router.post('/viewvolunteer', profileRouter.viewVolunteer);//view the volunteer profile details
        router.post('/preassess', childrenProfileRouter.Preassess);
        router.post('/childrenregistration', childrenProfileRouter.childregistration);
        router.get('/listofvolunteer', profileRouter.listofvolunteer);
        router.get('/selectChild', childrenProfileRouter.SelectChild);
        router.post('/viewchildrenownprofile', childrenProfileRouter.viewdata);
        router.post('/insertConnectionRequest', connectionRouter.InsertRequest);
        router.get('/loginactivechange', loginactiveChangeRouter.loginactivechange);
        router.get('/approvevolunteer', registrationRouter.viewVolunteerToApprove);
        router.post('/changestatus', registrationRouter.changeStatusController);
        router.get('/listofmentor',profileRouter.listofmentor);
        router.post('/viewmentor',profileRouter.viewmentor);
        router.get('/listchild', childrenProfileRouter.listchild);
    }
    return ApiRouter;
}

