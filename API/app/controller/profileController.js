module.exports = function (databaseBS, Sequelize) {
    var profileinfo = require('../module/profileinfo').UserDetial(databaseBS, Sequelize, "profileinfos");
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
    var profileServiceObject = require('../service/profileService')(profileinfo);

    var profileController = {};

    profileController.viewVolunteer = function (req, res, next) {
        console.log("View volunteer profile");
        profileServiceObject.viewvolunteer(
            req,
            profile,
            profileinfo,
            Sequelize,
            function (results) {
                console.log(results);
                res.send(results);
            });
    };




return profileController;
}