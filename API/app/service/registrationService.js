var multer = require("multer");
var md5 = require('md5');
// const nodemailer = require("@nodemailer/pro");

module.exports = function (testmodel) {
    var registrationService = {};
    //valiation of the login page using users table
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'sm120538@gmail.com',
    //         pass: 'class.forname();'
    //     }
    // });
    registrationService.validateUserCredential = function (req, testmodel, Sequelize, res) {

        console.log("welcome to Loginpage validation");
        var email_id = req.body.email_id;
        var password = req.body.password;
        var hashed_password = md5(password);
        if (!email_id) {
            res.send("1");
            return false;
        }
        else if (!password) {
            res.send("2");
            return false;
        }
        else {
            return testmodel.findOne({
                where: {
                    email_id: email_id,
                    password: password,
                    // status: 1,
                    // active: 1
                }
            }).then(function (result) {
                // console.log("haiafhaiahai" + result.status);
                if (result == null) {
                    res.send("3");
                    return false;
                }
                // else if (result.status == 0){
                //     res.send("4");
                // }
                else {
                    res.send(result);
                }
            });
        }
    };
    registrationService.viewDataToApprove = function (req, LoginModel, ProfileModel, ProfileInfoModel, Sequelize, res) {
        console.log("welcome to serrvice too llist the voluunteerrs to approve");
        LoginModel.belongsTo(ProfileModel, { foreignKey: 'user_id' });
        //   approveProfileInfoModel.belongsTo(approveProfileModel,{foreignKey:'profile_id'});
        LoginModel.belongsTo(ProfileInfoModel, { foreignKey: 'user_id' });
        LoginModel.findAll({

            where: {
                status: 0,
                $not: {
                    role: "children"
                }

            },
            include: [
                {
                    model: ProfileModel,

                    // include: [

                    //     {
                    //         model: ProfileInfoModel
                    //     }
                    // ]
                },
                {
                    model: ProfileInfoModel
                }
            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    registrationService.denyloginstatus = function (req, profile, testmodel, Sequelize, res) {
        console.log("welcome change status api service ");

        var id = req.body.id;
        var profileId = req.body.profileId;
        console.log(profileId);
        testmodel.update({
            status: 2

        }, {
                where: {
                    id: id
                }
            }).then(function (result) {
                console.log("sivasankari" + id);
                profile.update({

                    approvedstatus: 2
                },
                    {
                        where: {
                            id: profileId
                        }
                    })


            }).then(function (results) {

                res.send("1");
            });

    };
    registrationService.changeStatusService = function (req, profile, testmodel, Sequelize, res) {
        console.log("welcome change status api service ");

        var id = req.body.id;
        var profileId = req.body.profileId;
        console.log(profileId);
        testmodel.update({
            status: 1

        }, {
                where: {
                    id: id
                }
            }).then(function (result) {
                console.log("sivasankari" + id);
                profile.update({

                    approvedstatus: 1
                },
                    {
                        where: {
                            id: profileId
                        }
                    })


            }).then(function (results) {

                res.send("1");
            });

    };
    //insert data from volunteer registration page to profile and profile info model
    registrationService.InsertProfile = function (req, profilemodel, profileinfomodel, login, Sequelize, callBack) {
        // let mailOptions = {
        //     from: '"sakthi 👻" <sm120538@gmail.com>', // sender address
        //     to: 'sakthi3964@gmail.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world ?', // plain text body
        //     html: '<b>Hello world ?</b>' // html body
        // };
        var role = req.body.role;
        var name = req.body.name;
        var dob = req.body.dob;
        var age = req.body.age;
        var gender = req.body.gender;
        var course = req.body.course;
        var area_of_expertise = req.body.area_of_expertise;
        var department = req.body.department;
        var institution = req.body.institution;
        var address_line1 = req.body.address_line1;
        var address_line2 = req.body.address_line2;
        var code = req.body.code;
        var state = req.body.state;
        var city = req.body.city;
        var postal_code = req.body.postal_code;
        var address = req.body.address;
        var country = req.body.country;
        var mobile_no = req.body.mobile_no;
        var phone = req.body.phone;
        var email_id = req.body.email_id;
        var password = req.body.password;
        var work_type = req.body.work_type;
        var reference = req.body.reference;
        var commitment = req.body.commitment;
        var designation = req.body.designation;
        var organization = req.body.organization;
        var expertise = req.body.expertise;
        var experience = req.body.experience;
        var cv = req.body.cv;
        var photo = req.body.photo;
        var center = req.body.center;

        profilemodel.create({
            role: role,
            name: name,
            dob: dob,
            age: age,
            gender: gender,
            address_line1: address_line1,
            address_line2: address_line2,
            code: code,
            state: state,
            city: city,
            postal_code: postal_code,
            country: country,
            mobile_no: mobile_no,
            email_id: email_id,
            password: password,
            phone: phone

        }).then(function (result) {
            console.log("sucses");
            profileinfomodel.create({
                profile_id: result.id,
                course: course,
                work_type: work_type,
                department: department,
                institution: institution,
                reference: reference,
                commitment: commitment,
                designation: designation,
                organization: organization,
                area_of_expertise: area_of_expertise,
                experience: experience,
                connection_status: 0,
                cv: cv,
                photo: photo
            }).then(function (results) {
                login.create({
                    active: 1,
                    user_id: results.profile_id,
                    email_id: email_id,
                    role: role,
                    password: password
                }).then(function (ress) {
                    console.log("suces inside");
                    var res = {};
                    res.profile = results;
                    res.profileinfo = result;
                    res.login = ress;
                    // transporter.sendMail(mailOptions, function (error, info) {
                    //     if (error) {
                    //         return console.log(error);
                    //     }
                    //     console.log('Message %s sent: %s', info.messageId, info.response);
                    // });
                    callBack(res);
                })
            })
        }).catch(function (error) {
            callBack(error);
        });
    };
    registrationService.addfiles = function (req, testmodel, Sequelize, res) {
        var imgfilename = [];
        var i = 0;
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb, res) {
                var fileformat = file.originalname.split('.')[file.originalname.split('.').length - 1]
                console.log(fileformat);
                if (req.body.role == "mentor") {
                    if ((fileformat == "jpg") || (fileformat == "jpeg") || (fileformat == "JPG") || (fileformat == "JPEG") || (fileformat == "png") || (fileformat == "Png") || (fileformat == "PNG")) {
                        cb(null, './uploads/mentor/photo')
                    }
                    else if ((fileformat == "pdf") || (fileformat == "PDF")) {
                        cb(null, './uploads/mentor/cv')
                    }

                }
                else if (req.body.role == "volunteer") {
                    if ((fileformat == "jpg") || (fileformat == "jpeg") || (fileformat == "JPG") || (fileformat == "JPEG") || (fileformat == "png") || (fileformat == "Png") || (fileformat == "PNG")) {
                        cb(null, './uploads/volunteer/photo')
                    }
                    else if ((fileformat == "pdf") || (fileformat == "PDF")) {
                        cb(null, './uploads/volunteer/cv')
                    }
                }
                else if (req.body.role == "children") {
                    if ((fileformat == "jpg") || (fileformat == "jpeg") || (fileformat == "JPG") || (fileformat == "JPEG") || (fileformat == "png") || (fileformat == "Png") || (fileformat == "PNG")) {
                        cb(null, './uploads/children/photo')
                    }
                }

            },
            filename: function (req, file, cb, res) {
                if ((file.originalname.split('.')[file.originalname.split('.').length - 1]) != "jpg") {
                    // res.json({ error_code: 1, err_desc: err });
                    // return;
                    console.log("not supportable format");
                }

                var datetimestamp = Date.now();
                imgfilename[i] = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
                cb(null, imgfilename[i])
                i = i + 1;


            }
        });
        var upload = multer({ //multer settings
            storage: storage
        }).array('photo', 2);
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            var data = {
                "cv": imgfilename[0],
                "photo": imgfilename[1]
            };
            console.log(data);
            res.send(data);
        })
    }
    return registrationService;
}