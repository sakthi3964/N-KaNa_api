module.exports = function (testmodel) {
    var profileService = {};

    profileService.viewvolunteer = function (req, profile, profileinfo, Sequelize, res) {
        console.log("welcome to listing of tracker users");
        var id = req.body.id;
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
            console.log("hellllllllllllooooooo" + result + "helllllllllllllllloooooooooo");

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
    profileService.viewmentor = function (req, profile, profileinfo, Sequelize, res) {
        console.log("welcome to listing of tracker users");
        var id = req.body.id;
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
            console.log("hellllllllllllooooooo" + result + "helllllllllllllllloooooooooo");
            res.send(result);
        });

    };

    profileService.listofmentor = function (req, testmodel, Sequelize, res) {
        console.log("welcome to view Volunteer");

        var role = 'mentor';
        testmodel.findAll({ where: { role: role } }).then(function (results) {
            res.send(results);
        });

    };
    return profileService;
}