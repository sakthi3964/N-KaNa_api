module.exports = function (testmodel) {
    var loginservice = {};
    //insert data into tracker model   
    loginservice.viewlogin = function (req, login, profile, childrenProfileModel, Sequelize, res) {
        login.belongsTo(profile, { foreignKey: 'user_id' });
        login.belongsTo(childrenProfileModel, { foreignKey: 'user_id' });
        login.findAll({
            include: [
                {
                    model: profile
                },
                {
                    model: childrenProfileModel
                },
            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    loginservice.activechange = function (req, login, Sequelize, res) {
        console.log("welcome preassess_data ");
        var id = req.body.id;
        var active = req.body.active;
        var time = req.body.time;
       // console.log(time);
        login.update({
            active: active,
            updated_at:time

        }, {
                where: {
                    user_id: id
                }
            }).then(function (result) {
                res.send(result);
            });

    };

    return loginservice;
}
