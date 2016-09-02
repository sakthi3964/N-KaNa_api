module.exports = function (databaseBS, Sequelize){
    var test = require('../controller/test')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {
        test.ValidateUser(router);
        test.registration(router);
        test.ChildReview(router);

    }
    return ApiRouter;
}