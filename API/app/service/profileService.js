module.exports = function (testmodel) {
    var profileService = {};

    profileService.viewvolunteer = function (req, profile, profileinfo, Sequelize, res) {
        console.log("welcome to listing of tracker users");
        var id = 10001;
        // profile.findAll({
        //     where: { id: id}
        // }).then(function (results) {
        //     profileinfo.findAll({
        //         where: { profile_id: id }
        //     }).then(function (result) {
        //         var res = {};
        //         res.profile = results;
        //         res.profileinfo = result;
        //         console.log(res.profile);
        //         callBack(res);
        //     })
        // }).catch(function (error) {
        //     callBack(error);
        // });

        profile.belongsTo(profileinfo, { foreignKey: 'id' });
        profile.findAll({

            where: {
                id: id
            },
            include: [
                {
                    model: profileinfo
                }
            ]
        }).then(function (result) {
             res.send(result);
        });

    };
    profileService.listofvolunteer = function (req, testmodel, Sequelize, res) {
        console.log("welcome to view Volunteer");

        var role = 'volunteer';
        testmodel.findAll({ where: { role: role } }).then(function (results) {
            res.send(results);
        });

    };
    return profileService;
}