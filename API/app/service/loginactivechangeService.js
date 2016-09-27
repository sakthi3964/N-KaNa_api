module.exports = function (testmodel) {
    var loginservice = {};
    //insert data into tracker model   
    loginservice.viewlogin = function (req, login, profile, childrenProfileModel, Sequelize, res) {
        // console.log("welcome to listing of tracker users");
        // var id = req.body.id;
        // login.findAll({
        // }).then(function (results) {
        //     profile.findAll({
        //     }).then(function (result) {
        //         var res = {};
        //         res.login = results;
        //         res.profile = result;
        //         console.log(res.profile);
        //         callBack(res);
        //     })
        // }).catch(function (error) {
        //     callBack(error);
        // });
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
    return loginservice;
}
