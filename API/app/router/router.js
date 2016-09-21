module.exports = function (databaseBS, Sequelize) {
    var trackerRouter = require('../controller/trackerController')(databaseBS, Sequelize);
    var childrenReviewRouter = require('../controller/childrenReviewController')(databaseBS, Sequelize);
    var registrationRouter = require('../controller/registrationController')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {

        router.get('/trackerDates', trackerRouter.ListDates);// list dates at the graph module
        router.post('/tracker', trackerRouter.Tracker);// tracker form with the holistic indicators
        router.post('/review', childrenReviewRouter.ChildrenReview);// child review form
        router.post('/viewReviewDetail', trackerRouter.ReviewGraph);//graph generation
        router.post('/registration', registrationRouter.Registration);// insert data for registration

    }
    return ApiRouter;
}