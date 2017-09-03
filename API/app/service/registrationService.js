var multer = require("multer");
var md5 = require('md5');
var verification = require('../emailVerification/mailverification');
module.exports = function (profile, testmodel, databaseBS, Sequelize) {
    var helperObject = require('../helper/custom')(databaseBS, Sequelize);

    var registrationService = {};
    //valiation of the login page using users table
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
                    password: hashed_password,
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
                    console.log(result.user_id);
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
        profile.findAll({
            where: {
                id: profileId
            }

        }).then(function (profile_find) {


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
                    var mailOptions = {
                        to: profile_find[0].email_id,
                        subject: "Deny Connection",
                        text: "Your Registration Has been Denied By Admin"
                    }
                    verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            // console.log(error);
                            res.end("error");
                        } else {
                        }
                    });

                    res.send("1");
                });
        })

    };
    registrationService.changeStatusService = function (req, profile, testmodel, Sequelize, res) {
        var id = req.body.id;
        var profileId = req.body.profileId;
        profile.findAll({
            where: {
                id: profileId
            }
        }).then(function (profile_find) {
            testmodel.update({
                status: 1

            }, {
                    where: {
                        id: id
                    }
                }).then(function (result) {
                    profile.update({

                        approvedstatus: 1
                    },
                        {
                            where: {
                                id: profileId
                            }
                        })


                }).then(function (results) {
                    var mailOptions = {
                        to: profile_find[0].email_id,
                        subject: "Approval Connection",
                        text: "Your Registration Has been Approved By Admin"
                    }
                    verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            // console.log(error);
                            res.end("error");
                        } else {
                        }
                    });

                    res.send("1");
                });


        })


    };
    //insert data from volunteer registration page to profile and profile info model
    // registrationService.InsertProfile = function (req, profilemodel, profileinfomodel, login, Sequelize, callBack) {
    //     var role = req.body.role;
    //     var name = req.body.name;
    //     var dob = req.body.dob;
    //     var age = req.body.age;
    //     var gender = req.body.gender;
    //     var course = req.body.course;
    //     var area_of_expertise = req.body.area_of_expertise;
    //     var department = req.body.department;
    //     var institution = req.body.institution;
    //     var address_line1 = req.body.address_line1;
    //     var address_line2 = req.body.address_line2;
    //     var code = req.body.code;
    //     var state = req.body.state;
    //     var city = req.body.city;
    //     var postal_code = req.body.postal_code;
    //     var address = req.body.address;
    //     var country = req.body.country;
    //     var mobile_no = req.body.mobile_no;
    //     var phone = req.body.phone;
    //     var email_id = req.body.email_id;
    //     var password = req.body.password;
    //     var work_type = req.body.work_type;
    //     var reference = req.body.reference;
    //     var commitment = req.body.commitment;
    //     var designation = req.body.designation;
    //     var organization = req.body.organization;
    //     var expertise = req.body.expertise;
    //     var experience = req.body.experience;
    //     var cv = req.body.cv;
    //     var photo = req.body.photo;
    //     var center = req.body.center;

    //     profilemodel.create({
    //         role: role,
    //         name: name,
    //         dob: dob,
    //         age: age,
    //         gender: gender,
    //         address_line1: address_line1,
    //         address_line2: address_line2,
    //         code: code,
    //         state: state,
    //         city: city,
    //         postal_code: postal_code,
    //         country: country,
    //         mobile_no: mobile_no,
    //         email_id: email_id,
    //         password: password,
    //         phone: phone

    //     }).then(function (result) {
    //         console.log("sucses");
    //         profileinfomodel.create({
    //             profile_id: result.id,
    //             course: course,
    //             work_type: work_type,
    //             department: department,
    //             institution: institution,
    //             reference: reference,
    //             commitment: commitment,
    //             designation: designation,
    //             organization: organization,
    //             area_of_expertise: area_of_expertise,
    //             experience: experience,
    //             connection_status: 0,
    //             cv: cv,
    //             photo: photo
    //         }).then(function (results) {
    //             login.create({
    //                 active: 1,
    //                 user_id: results.profile_id,
    //                 email_id: email_id,
    //                 role: role,
    //                 password: password
    //             }).then(function (ress) {
    //                 var res = {};
    //                 res.profile = results;
    //                 res.profileinfo = result;
    //                 res.login = ress;
    //                 // var nodemailer = require('nodemailer');
    //                 // var xoauth2 = require('xoauth2');
    //                 // generator.on('token', function (token) {
    //                 //     console.log('New token for %s: %s', token.user, token.accessToken);
    //                 // });
    //                 // var transporter = nodemailer.createTransport({
    //                 //     service: 'gmail',
    //                 //     auth: {
    //                 //         xoauth2: xoauth2.createXOAuth2Generator({
    //                 //             user: 'sm120538@gmail.com',
    //                 //             clientId: '389770165777-5b5h7p2lg330ep7e0qnvg173ghcake4l.apps.googleusercontent.com',
    //                 //             clientSecret: 'DA8Iz4aPPHdKCx8Dq6wGz8ES',
    //                 //             refreshToken: '1/nXO8cySjsxVp9oGlSLPFgieaH4QyM2l2V1EnLGo-Qpg',
    //                 //             accessToken: 'ya29.Ci-2A_19jXIjwql3pPpC7gq6T-rM3UJIfArQ39EbjnaVOkVJzkpQdrFwVgm1G4AzhA'
    //                 //         })
    //                 //     }
    //                 // });
    //                 callBack(res);
    //             })
    //         })
    //     }).catch(function (error) {
    //         callBack(error);
    //     });

    // };
    registrationService.InsertProfile = function (req, profilemodel, profileinfomodel, childrenProfileModel, login, Sequelize, callBack) {

        helperObject.memvalidation(req, profile, childrenProfileModel, Sequelize, function (result) {

            console.log(result);
            if (result.msg == '0') {
                var role = result.req.role;
                var name = result.req.name;
                var dob = result.req.dob;
                var age = result.req.age;
                var gender = result.req.gender;
                var course = result.req.course;
                var area_of_expertise = result.req.area_of_expertise;
                var department = result.req.department;
                var institution = result.req.institution;
                var address_line1 = result.req.address_line1;
                var address_line2 = result.req.address_line2;
                var code = result.req.code;
                var state = result.req.state;
                var city = result.req.city;
                var postal_code = result.req.postal_code;
                var address = result.req.address;
                var country = result.req.country;
                var mobile_no = result.req.mobile_no;
                var phone = result.req.phone;
                var email_id = result.req.email_id;
                var temp_emailid1 = md5(email_id);
                var temp_emailid2 = md5(temp_emailid1);
                var encrypted_email = md5(temp_emailid2);
                var password = result.req.password;
                var hashed = md5(password);
                var work_type = result.req.work_type;
                var reference = result.req.reference;
                var commitment = result.req.commitment;
                var designation = result.req.designation;
                var organization = result.req.organization;
                var expertise = result.req.expertise;
                var experience = result.req.experience;
                var off_address = result.req.off_address
                var cv = result.req.cv;
                var photo = result.req.photo;
                var center = result.req.center;

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
                    encrypted_email: encrypted_email,
                    password: hashed,
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
                        off_address: off_address,
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
                            encrypted_email: encrypted_email,
                            role: role,
                            password: hashed
                        }).then(function (ress) {
                            console.log("suces inside");
                            var res = {};
                            res.profile = results;
                            res.profileinfo = result;
                            res.login = ress;

                            var mailOptions = {
                                to: email_id,
                                subject: "Verification mail",
                                text: "Please click this link To Verify http://nkanaapi-sakthi3964.rhcloud.com/app/emailVerification/view/verification.html?id=" + encrypted_email
                            }
                            verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    // console.log("Message sent: " + response.message);
                                    // res.end("Mail has been sent please open and check it");
                                    callBack(res);
                                }
                            });
                        })
                    })
                }).catch(function (error) {
                    callBack(error);
                });


            }

            else {
                var error = {};
                error.message = 1;
                callBack(result);
            }

        })

    };
    registrationService.addfiles = function (req, testmodel, Sequelize, res) {
        var imgfilename = [];
        var i = 0;
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb, res) {
                var fileformat = file.originalname.split('.')[file.originalname.split('.').length - 1]

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
    registrationService.userVerification = function (req, profile, ProfileInfo, login, Sequelize, res) {
        var encrypted_email = req.body.id;
        profile.update({
            verification_status: 1

        },
            {
                where: {
                    encrypted_email: encrypted_email
                }
            }).then(function (result1) {
                login.update({
                    verification_status: 1

                }, {
                        where: {
                            encrypted_email: encrypted_email
                        }
                    }).then(function (result) {
                        res.send("Email Verified SuccessFull");
                    })

            });

    }
    // update Password mailId and dob checked starts
    registrationService.forgotPassword = function (req, profile, ProfileInfo, login, Sequelize, res) {
        var email_id = req.body.email;
        var mobile_no = req.body.mobileNo;
        profile.findAll({
            where: {
                email_id: email_id,
                mobile_no: mobile_no
            }
        }).then(function (findResult) {
            if (findResult.length != 0) {
                var mailOptions = {
                    to: findResult[0].email_id,
                    subject: "Forgot Password",
                    text: "Please click this link To Reset the passwoed http://nkanaapi-sakthi3964.rhcloud.com/app/forgotPassword/view/forgotPassword.html?id=" + findResult[0].encrypted_email
                }
                verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        // console.log(error);
                        res.end("error");
                    } else {
                        console.log("Message sent: " + response.message);
                        // res.end("Mail has been sent please open and check it");

                    }
                });

            }
            else {
                res.send("Email id or mobile no mismatched");
            }


        })
    }
    // update Password mailId and dob checked ends
    // update password start
    registrationService.changePassword = function (req, profile, login, Sequelize, res) {
        var id = req.body.id;
        var password = md5(req.body.password);

        profile.update({
            password: password
        }, {
                where: {
                    encrypted_email: id
                }
            }).then(function (result) {
                login.update({
                    password: password
                }, {
                        where: {
                            encrypted_email: id
                        }
                    })
            }).then(function (loginResults) {
                res.send("1");
            })
    }
    // update Password end
    // contact_us start
    registrationService.contactUs = function (req, profile, Sequelize, res) {
        console.log("hi");
        var to = req.body.issues;
        var other_comments = req.body.other_comments;
        var subject = req.body.subject;
        var userId = req.body.userId;
        profile.findOne({
            where: {
                id: userId
            }
        }).then(function (result) {
            var mailOptions = {
                to: to,
                subject: subject,
                text: other_comments
            }
            verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    // console.log(error);
                    res.end("error");
                } else {
                    console.log("Message sent: " + response.message);
                    // res.end("Mail has been sent please open and check it");

                }
            });
            res.send("success");

        })

    }
    // contact_us end
    return registrationService;
}