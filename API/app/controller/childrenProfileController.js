module.exports = function (databaseBS, Sequelize) {
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var childrenProfileServiceObject = require('../service/childrenProfileService')(childrenProfileModel);
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
   // var test = require('../service/childrenProfileService')(login);

    var childrenProfileController = {};

    childrenProfileController.Preassess = function (req, res, next) {
        console.log("hi preassess user");
        childrenProfileServiceObject.InsertPreassess(req, childrenProfileModel, Sequelize, res);
    };

    childrenProfileController.childregistration = function (req, res, next) {
        console.log("hi ChildrenProfileDetial ");
        childrenProfileServiceObject.childreg(
            req,
            childrenProfileModel,
            login,
            Sequelize,
            function (results) {
                res.send(results);
            });
    }

    return childrenProfileController;
}