module.exports = function (testmodel) {
    var connectionService = {};
    connectionService.insertConneection = function (req, testmodel, Sequelize, res) {
        console.log("welcome to service");
        var children_id = req.body.children_id;

        var role = req.body.role;
        console.log(role);
        var profile_id = req.body.volunteer_id;
        console.log(profile_id);


        testmodel.create({
            children_id: children_id,
            role: role,
            profile_id: profile_id,
            flag: 0
        }).then(function (results) {

            res.send(results);

        });

    };

    connectionService.volunteerhomeselectchildicon = function (req, testmodel, Sequelize, res) {
        testmodel.count({
            where: {
                profile_id: 10001,
            }
        }).then(function (results) {
            console.log(results);
            if (results >= 1) {

                res.send("0");
            }
            else {
                res.send("1");
            }
        })
    }

    connectionService.viewchild = function (req, connectionModel, childrenProfileModel, Sequelize, res) {
        var id = 10001;
        connectionModel.belongsTo(childrenProfileModel, { foreignKey: 'children_id' });
        connectionModel.findAll({
            where: {
                profile_id: id
            },

            include: [
                {
                    model: childrenProfileModel
                },
            ]
        }).then(function (result) {
            res.send(result);
        });
    };

    connectionService.viewchildvolunteer = function (req, connectionModel, profile, profileinfo, Sequelize, res) {
        var id = req.body.id;
        connectionModel.belongsTo(profile, { foreignKey: 'profile_id' });
        profile.belongsTo(profileinfo, { foreignKey: 'id' });
        connectionModel.findAll({
            where: {
                children_id: id
            },

            include: [
                {
                    model: profile,

                    include: [
                        {
                            model: profileinfo
                        },

                    ]
                },

            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    return connectionService;
}
