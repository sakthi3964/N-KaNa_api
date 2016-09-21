module.exports = function (databaseBS, Sequelize) {
    var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
    var profileinfo = require('../module/profileinfo').UserDetial(databaseBS, Sequelize, "profileinfos");    
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
var registrationServiceObject = require('../service/registrationService')(profileinfo);    
        var registrationController = {};

 registrationController.Registration = function (router) {
        router.post('/registration', function (req, res, next) {
            console.log("Helo users");
            registrationServiceObject.InsertProfile(req, profile, profileinfo, login, Sequelize, function (results) {
                    res.send(results);  });
        });
    }
      return registrationController;
}