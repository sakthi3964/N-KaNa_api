var multer = require("multer");
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
            status: 2,
            pre_assessment_data: preassess_data,
            updated_at: time

        }, {
                where: {
                    id: id
                }
            });

    };
    childrenProfileService.childreg = function (req, testmodel, login, Sequelize, res) {
        console.log("welcome children registration");

        console.log(req.body);
        helperObject.validation(req, testmodel, Sequelize, function (result) {
            console.log(result);
            if (result.msg == '0') {
                var name = result.req.name;
                var age = result.req.age;
                var gender = result.req.gender;
                var password = result.req.password;
                var dob = result.req.dob;
                var center = result.req.center;
                var user_id = result.req.user_id;
                var role = result.req.role;
                var photos = result.req.photos;
                testmodel.create({
                    full_name: name,
                    age: age,
                    gender: gender,
                    password: password,
                    dob: dob,
                    user_id: user_id,
                    role: role,
                    center: center,
                    photos: photos,
                    active_ind: 1
                }).then(function (result) {
                    login.create({
                        status: 2,
                        active: 1,
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
    childrenProfileService.childphoto = function (req, testmodel, Sequelize, res) {
        var imgfilename = null;
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb, res) {
                cb(null, './uploads/children/photos')
            },
            filename: function (req, file, cb, res) {
                var datetimestamp = Date.now();
                imgfilename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
                cb(null, imgfilename)
            }
        });
        var upload = multer({ //multer settings
            storage: storage
        }).single('file');
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            // res.json({ error_code: 0, err_desc: imgfilename });
            console.log(imgfilename);
            res.send(imgfilename);
        })
    }
    childrenProfileService.listchild = function (req, testmodel, Sequelize, res) {
        console.log("welcome to view Children");
        testmodel.findAll({

        }).then(function (results) {
            res.send(results);
        });

    };
    
    childrenProfileService.approve_preassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome to view and select a child");

        return testmodel.findAll({
            where: {
                status: 2,
                active_ind: 1,
                connection_status: 0
            }
        }).then(function (results) {

            console.log(results);
            res.send(results);

        });
    };
    childrenProfileService.accept_preassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome accept_preassess of child");
        var id = req.body.id;
        testmodel.update({
            status: 1
             },
             {
            where: {
               id : id
            }

        });
    };

     childrenProfileService.deny_preassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome accept_preassess of child");
        var id = req.body.id;
        testmodel.update({
            status: 0,
            pre_assessment_data: ""
             },
             {
            where: {
               id : id
            }

        });
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
    childrenProfileService.viewchildrendata = function (req, testmodel, Sequelize, res) {
        console.log("welcome to listing of tracker users");
        var id = req.body.id;

        testmodel.findOne({
            where: { id: id }
        }).then(function (result) {
            res.send(result);
            console.log(result);
            //   console.log(result.full_name);
        });

    };
    childrenProfileService.childrenhome = function (req, testmodel, Sequelize, res) {
        var id = req.body.id;
        testmodel.findOne({
            where: {
                id: id
            }
        }).then(function (result) {
            if (result.pre_assessment_data == "") {
                res.send("0");
            }
            else {
                res.send("1");
            }
            console.log(result);
            //   console.log(result.full_name);
        });

    };
    return childrenProfileService;
}