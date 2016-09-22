module.exports = function (testmodel) {
    var loginservice = {};
    //insert data into tracker model   
    loginservice.viewlogin = function (req, login, profile, Sequelize, callBack) {
       console.log("welcome to listing of tracker users");
        var id=req.body.id;
        login.findAll({
            where: { id: 101}
        }).then(function (results) {
            profile.findAll({
                where: { id:101 }
            }).then(function (result) {
                var res = {};
                res.login = results;
                res.profile = result;
                console.log(res.profile);
                callBack(res);
            })
        }).catch(function (error) {
            callBack(error);
        });

    };
    return loginservice;
}
