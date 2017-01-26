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
        router.post('/childreviewcheck', childrenReviewRouter.childreviewcheck);// to check review is filled for more than 3 months     
        router.post('/childReviewDates', childrenReviewRouter.childReviewDates);// to fetch dates for filled child review
        router.post('/childReviewDatesMentor', childrenReviewRouter.childReviewDatesMentor);  // to fetch dates for mentor
        router.post('/trackerDates', trackerRouter.ListDates);// list dates at the graph module
        router.post('/trackerDatesMentor', trackerRouter.ListTrackerDatesmentorid);
        router.post('/tracker', trackerRouter.Tracker);// tracker form with the holistic indicators
        router.post('/review', childrenReviewRouter.ChildrenReview);// child review form
        router.post('/viewReviewDetail', trackerRouter.ReviewGraph);//graph generation
        router.post('/registration', registrationRouter.Registration);// insert data for registration
        router.post('/validateuser', registrationRouter.ValidateUser);//validate users at login
        router.post('/viewvolunteer', profileRouter.viewVolunteer);//view the volunteer profile details
        router.post('/preassess', childrenProfileRouter.Preassess);
        router.post('/childrenregistration', childrenProfileRouter.childregistration);
        router.get('/listofvolunteer', profileRouter.listofvolunteer);
        router.get('/selectChild', childrenProfileRouter.SelectChild);//display list registed children
        router.post('/viewchildrenownprofile', childrenProfileRouter.viewdata);//children profile view via volunteerhome
        router.post('/insertConnectionRequest', connectionRouter.InsertRequest);
        router.get('/loginactivechange', loginactiveChangeRouter.loginactivechange); // list details for login active change page
        router.get('/approvevolunteer', registrationRouter.viewVolunteerToApprove); // 
        router.post('/changestatus', registrationRouter.changeStatusController);
        router.get('/listofmentor', profileRouter.listofmentor);//display list of mentor for both admin side and vounteer side
        router.post('/viewmentor', profileRouter.viewmentor);//Select paticular mentor for both admin and volunteer side
        router.get('/listchild', childrenProfileRouter.listchild);
        router.post('/volunteerhome', connectionRouter.volunteerhomeselectchild); //change display icon child for volunteer home page
        router.post('/activechange', loginactiveChangeRouter.activechange); // update active value in login table
        router.post('/viewchild', connectionRouter.viewchild); // view child details from volunteer and mentor profile
        router.post('/viewchildvolunteer', connectionRouter.viewchildvolunteer); // view volunteer and  mentor details from child profile
        router.post('/viewmentorownprofile', childrenProfileRouter.viewdata);//children profile view via volunteerhome
        router.post('/insertmentorConnectionRequest', connectionRouter.InsertMentorRequest);//used for mentor request in the database
        router.post('/viewvolunteermentorprofile', connectionRouter.viewvolunteermentorprofile); // view mentor profile from volunteer and child profile    
        router.post('/childrenhome', childrenProfileRouter.childrenhome);
        router.post('/childvolunteermentorid', connectionRouter.childvolunteermentor);
        router.post('/viewChildrenReview', childrenReviewRouter.viewChildrenReview);
        router.post('/addfiles', registrationRouter.addfiles);
        router.post('/childphoto', childrenProfileRouter.childphoto);
        router.get('/viewadmintracker', connectionRouter.viewadmintracker);
        router.get('/connectionapproval', connectionRouter.connectionapproval);
        router.post('/changeapproval', connectionRouter.changeapproval);
        router.post('/volunteerhomeviewmentor', connectionRouter.volunteerhomeviewmentor);
        router.post('/mentorgraphDates', trackerRouter.mentorgraphDates);
        router.post('/adminmentorgraphDates', trackerRouter.adminmentorgraphDates);
        router.post('/editreturn', profileRouter.editreturn);
        router.post('/editupdate', profileRouter.editupdate);
    }
    return ApiRouter;
}

