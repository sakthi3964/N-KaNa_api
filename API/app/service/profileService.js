 module.exports = function (testmodel) {
    var profileService = {};

 profileService.viewvolunteer = function (req, profile, profileinfo, Sequelize, callBack) {
        console.log("welcome to listing of tracker users");

        profile.findAll({
            where: { id: 101 }
        }).then(function (results) {
            profileinfo.findAll({
            }).then(function (result) {
                var res = {};
                res.profile = results;
                res.profileinfo = result;
                console.log(res.profile);
                callBack(res);
            })
        }).catch(function (error) {
            callBack(error);
        });

    };
      return profileService;
}