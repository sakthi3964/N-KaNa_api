module.exports = function (databaseBS, Sequelize) {
    var regmodel = require('../module/test').UserDetial(databaseBS, Sequelize, "users");
    var test = require('../service/test')(regmodel);
    var childReviewModel = require('../module/childReview').ChildReviewDetial(databaseBS,Sequelize,"reviews");
    var test1 = require('../service/test')(childReviewModel);
    var testController = {};

        testController.ChildReview = function (router) {
        router.post('/review',function (req,res,next) {
            console.log("hi review user");
            test1.InsertReview(req,childReviewModel,Sequelize,res);
        });
    }

    testController.ValidateUser = function (router) {
        router.post('/validateuser', function (req, res, next) {
            console.log("Entering into validate user");
            test.validateUserDetial(
                req,
                regmodel,
                Sequelize,
                res);
        });
    }
    testController.registration = function (router) {
        router.post('/registration', function (req, res, next) {
            console.log("Helo users");
            test.InsertData(req, regmodel, Sequelize, res);
        });
    }
    return testController;
}