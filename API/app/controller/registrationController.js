module.exports = function (databaseBS, Sequelize) {
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
    var profileinfo = require('../module/profileinfo').UserDetial(databaseBS, Sequelize, "profileinfos");    
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
var registrationServiceObject = require('../service/registrationService')(profileinfo);    
        var registrationController = {};

 registrationController.Registration = function (req, res, next) {
            console.log("Helo users");
            registrationServiceObject.InsertProfile(req, profile, profileinfo, login, Sequelize, function (results) {
                    res.send(results);  });
        };
    

     // ValidateUser object to call service using functon call "validateUserDetial"
    registrationController.ValidateUser = function (req, res, next) {
            console.log("Entering into validate user");
            registrationServiceObject.validateUserCredential(
                req,
                login,
                Sequelize,
                res);
        };
    
      return registrationController;
}