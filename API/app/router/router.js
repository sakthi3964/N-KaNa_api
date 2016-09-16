module.exports = function (databaseBS, Sequelize){
    var test = require('../controller/test')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {
        test.ValidateUser(router);//validate users at login
        test.ChildReview(router);// child review form
        test.Tracker(router);// tracker form with the holistic indicators
        test.ListDates(router);// list dates at the graph module
        test.ReviewDetail(router);//graph generation
        test.registration(router);// insert data for registration

    }
    return ApiRouter;
}