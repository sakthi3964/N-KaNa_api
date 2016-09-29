module.exports = function (databaseBS, Sequelize) {
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var childrenProfileServiceObject = require('../service/childrenProfileService')(childrenProfileModel,databaseBS, Sequelize);
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
          res);
    }

    childrenProfileController.viewdata = function (req, res, next) {
            console.log("hi view children data");
            childrenProfileServiceObject.viewchildrendata(req,childrenProfileModel, Sequelize, res);
        };

    
    childrenProfileController.SelectChild = function (req, res, next) {
        console.log("hi ChildrenProfileDetial ");
        childrenProfileServiceObject.viewSelectChild(req, childrenProfileModel, Sequelize, res);
    }

    childrenProfileController.listchild = function (req, res, next) {
        console.log("hi listchild ");
        childrenProfileServiceObject.listchild(req, childrenProfileModel, Sequelize, res);
    }

    return childrenProfileController;
}