module.exports = function (databaseBS, Sequelize) {
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
    var loginactivechangeServiceObject = require('../service/loginactivechangeService')(login);

    var loginController = {};
   loginController.loginactivechange = function (req, res, next) {
        console.log("hi preassess user");
        loginactivechangeServiceObject.viewlogin(
            req,
            login, 
            profile, 
            Sequelize, 
            function (results) {
                console.log(results);
                res.send(results);
            });
    };
    return loginController;
}