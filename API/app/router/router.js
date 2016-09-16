module.exports = function (databaseBS, Sequelize){
    var test = require('../controller/test')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {
        test.ValidateUser(router);
        test.ChildReview(router);
        test.Tracker(router);
        test.ListDates(router);
        test.ReviewDetail(router);
        test.registration(router);

    }
    return ApiRouter;
}