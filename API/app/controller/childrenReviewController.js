module.exports = function (databaseBS, Sequelize) {
    var childrenReviewModel = require('../module/childReview').ChildReviewDetial(databaseBS, Sequelize, "reviews");
    var childrenReviewServiceObject = require('../service/childrenReviewService')(childrenReviewModel);

    var childrenReviewController = {};

    childrenReviewController.ChildrenReview = function (req, res, next) {
        console.log("hi review user");
        childrenReviewServiceObject.insertChildrenReview(req, childrenReviewModel, Sequelize, function (result) {
            res.send(result);
        });
    };
    childrenReviewController.viewChildrenReview = function (req, res, next) {
        console.log("hi review user");
        childrenReviewServiceObject.viewChildrenReview(req, childrenReviewModel, Sequelize, res);
    };
    childrenReviewController.childReviewDates = function (req, res, next) {
        console.log("hi review user dates");
        childrenReviewServiceObject.childReviewDates(req, childrenReviewModel, Sequelize, res);
    };
    childrenReviewController.childReviewDatesMentor = function (req, res, next) {
        console.log("hi review user dates");
        childrenReviewServiceObject.childReviewDatesMentor(req, childrenReviewModel, Sequelize, res);
    };
    childrenReviewController.childreviewcheck = function (req, res, next) {
        console.log("hi review user dates");
        childrenReviewServiceObject.childreviewcheck(req, childrenReviewModel, Sequelize, res);
    };
    return childrenReviewController;
}