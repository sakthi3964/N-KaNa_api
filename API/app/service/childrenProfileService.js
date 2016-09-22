module.exports = function (testmodel) {
    var childrenProfileService = {};

    childrenProfileService.InsertPreassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome preassess_data ");

        var preassess_data = req.body.pre;
        var time = req.body.time;

        testmodel.update({
            Pre_Assessment_Data: preassess_data,
            updated_at: time

        }, {
                where: {
                    ID: 1004
                }
            });

    };

    //children registration function

    childrenProfileService.childreg = function (req, testmodel, login, Sequelize, callBack) {
        console.log("welcome children registration");
        var name = req.body.name;

        var age = req.body.age;
        var gender = req.body.gender;
        var password = req.body.password;
        var dob = req.body.dob;
        var center = req.body.center;
        var user_id = req.body.user_id;
        console.log(req.body.user_id);
        var role = req.body.role;
        testmodel.create({
            full_name: name,
            age: age,
            gender: gender,
            password: password,
            dob: dob,
            user_id: user_id,
            role: role,
            center: center
        }).then(function (result) {
            login.create({
                user_id: result.id,
                email_id: user_id,
                role: role,
                password: password
            }).then(function (results) {
                var res = {};
                res.childrenProfileModel = results;
                res.login = result;
                callBack(res);
            })
        }).catch(function (error) {
            callBack(error);
        });

    };

    
    return childrenProfileService;
}