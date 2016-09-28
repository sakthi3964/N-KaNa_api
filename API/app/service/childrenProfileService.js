module.exports = function (testmodel, databaseBS, Sequelize) {
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var helperObject = require('../helper/custom')(databaseBS, Sequelize);

    var childrenProfileService = {};

    childrenProfileService.InsertPreassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome preassess_data ");

        var preassess_data = req.body.pre;
        var id = req.body.id;
        console.log(preassess_data);

        var time = req.body.time;
        console.log(time);

        testmodel.update({
            // full_name:"sakthimurugan",
            pre_assessment_data: preassess_data,
            updated_at: time

        }, {
                where: {
                    id: id
                }
            });

    };

    //children registration function

    // childrenProfileService.childreg = function (req, testmodel, login, Sequelize, callBack) {
    //     console.log("welcome children registration");
    //     console.log(req.body);
    //     var name = req.body.name;

    //     var age = req.body.age;
    //     var gender = req.body.gender;
    //     var password = req.body.password;
    //     var dob = req.body.dob;
    //     var center = req.body.center;
    //     var user_id = req.body.user_id;
    //     console.log(req.body.user_id);
    //     var role = req.body.role;

    // testmodel.create({
    //     full_name: name,
    //     age: age,
    //     gender: gender,
    //     password: password,
    //     dob: dob,
    //     user_id: user_id,
    //     role: role,
    //     center: center
    // }).then(function (result) {
    //     login.create({
    //         user_id: result.id,
    //         email_id: user_id,
    //         role: role,
    //         password: password
    //     }).then(function (results) {
    //         var res = {};
    //         res.childrenProfileModel = results;
    //         res.login = result;
    //         callBack(res);
    //     })
    // }).catch(function (error) {
    //     callBack(error);
    // });

    // };
    childrenProfileService.childreg = function (req, testmodel, login, Sequelize, res) {
        console.log("welcome children registration");

        console.log(req.body);
        helperObject.validation(req, testmodel, Sequelize, function (result) {
            console.log(result);
            // console.log("req    :::"+req.body);

            if (result.msg == '0') {
                ///console.log("if successs  ::::::::::::")
                var name = result.req.name;
                var age = result.req.age;
                var gender = result.req.gender;
                var password = result.req.password;
                var dob = result.req.dob;
                var center = result.req.center;
                var user_id = result.req.user_id;
                var role = result.req.role;
                // testmodel.create({
                //     full_name: name,
                //     age: age,
                //     gender: gender,
                //     password: password,
                //     dob: dob,
                //     user_id: user_id,
                //     center: center

                // }).then(function (results) {
                //     console.log("success insertion");
                //     res.send(results);
                //    // console.log(results);
                // });
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
                    console.log("fdssssssssssssssssssssssssssssssssssssssssssssssss"+result.id);
                    login.create({
                        user_id: result.id,
                        email_id: result.user_id,
                        role: role,
                        password: password
                    }).then(function (results) {
                        var res1 = {};
                        res1.childrenProfileModel = result;
                        res1.login = results;
                        res.send(res1);
                    })
                }).catch(function (error) {
                    res.send(error);
                });

            }
            else {
                var error = {};
                error.message = "email id already exists";
                res.send(error);
            }

        })



    };



    childrenProfileService.viewSelectChild = function (req, testmodel, Sequelize, res) {
        console.log("welcome to view and select a child");

        return testmodel.findAll({
            where: {
                status: 1,
                active_ind: 1,
                connection_status: 0
            }
        }).then(function (results) {

            console.log(results);
            res.send(results);

        });


    };
    childrenProfileService.viewchildrendata = function (req, view, Sequelize, res) {
        console.log("welcome to listing of tracker users");
        var id = req.body.id;

        view.findOne({
            where: { id: id }
        }).then(function (result) {
            res.send(result);
            console.log(result);
            //   console.log(result.full_name);
        });

    };



    return childrenProfileService;
}