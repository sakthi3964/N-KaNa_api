module.exports = function (databaseBS, Sequelize){
    var test = require('../controller/test')(databaseBS, Sequelize);
    var ApiRouter = {};
    ApiRouter.apiRouters = function (router) {
        test.registration(router);
    }
    return ApiRouter;
}