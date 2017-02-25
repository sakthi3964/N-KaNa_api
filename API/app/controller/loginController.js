module.exports = function (databaseBS, Sequelize) {
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var loginactivechangeServiceObject = require('../service/loginactivechangeService')(login);

    var loginController = {};
    loginController.loginactivechange = function (req, res, next) {
        console.log("hi preassess user");
        loginactivechangeServiceObject.viewlogin(
            req,
            login,
            profile,
            childrenProfileModel,
            Sequelize,
            res);
    }; 
    loginController.activechange = function (req, res, next) {
        console.log("hi preassess user");
        loginactivechangeServiceObject.activechange(req, login, Sequelize, res);
    };
    loginController.viewlogindetails = function (req, res, next) {
        console.log("hi preassess user");
        loginactivechangeServiceObject.viewlogindetails(req, login, Sequelize, res);
    };
    return loginController;
}