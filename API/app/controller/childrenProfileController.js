module.exports = function (databaseBS, Sequelize) {
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var childrenProfileServiceObject = require('../service/childrenProfileService')(childrenProfileModel, databaseBS, Sequelize);
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
    // var test = require('../service/childrenProfileService')(login);
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
    var childrenProfileController = {};

    childrenProfileController.Preassess = function (req, res, next) {
        childrenProfileServiceObject.InsertPreassess(req, childrenProfileModel, Sequelize, res);
    };

    childrenProfileController.childregistration = function (req, res, next) {
        console.log("hi ChildrenProfileDetial ");
        childrenProfileServiceObject.childreg(
            req,
            childrenProfileModel,
            profile,
            login,
            Sequelize,
            res);
    }
    childrenProfileController.childrenhome = function (req, res, next) {
        console.log("hi ChildrenProfileDetial ");
        childrenProfileServiceObject.childrenhome(
            req,
            childrenProfileModel,
            Sequelize,
            res);
    }
    childrenProfileController.viewdata = function (req, res, next) {
        console.log("hi view children data");
        childrenProfileServiceObject.viewchildrendata(req, childrenProfileModel, Sequelize, res);
    };
    childrenProfileController.approve_preassess = function (req, res, next) {
        console.log("hi approve_preassess ");
        childrenProfileServiceObject.approve_preassess(req, childrenProfileModel, Sequelize, res);
    };
    childrenProfileController.accept_preassess = function (req, res, next) {
        console.log("hi accept_preassess ");
        childrenProfileServiceObject.accept_preassess(req, childrenProfileModel, Sequelize, res);
    }
    childrenProfileController.deny_preassess = function (req, res, next) {
        console.log("hi deny_preassess ");
        childrenProfileServiceObject.deny_preassess(req, childrenProfileModel, Sequelize, res);
    }

    childrenProfileController.SelectChild = function (req, res, next) {
        console.log("hi ChildrenProfileDetial ");
        childrenProfileServiceObject.viewSelectChild(req, childrenProfileModel, Sequelize, res);
    }

    childrenProfileController.listchild = function (req, res, next) {
        console.log("hi listchild ");
        childrenProfileServiceObject.listchild(req, childrenProfileModel, Sequelize, res);
    }
    childrenProfileController.childphoto = function (req, res, next) {
        console.log("hello");
        childrenProfileServiceObject.childphoto(
            req,
            childrenProfileModel,
            Sequelize,
            res);
    };
    return childrenProfileController;
}