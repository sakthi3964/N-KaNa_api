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
    profileService.listofvolunteer = function (req, testmodel, profileinfo, Sequelize, res) {
        console.log("welcome to view Volunteer");

        var role = 'volunteer';
        testmodel.belongsTo(profileinfo, { foreignKey: 'id' });
        testmodel.findAll({
            where: {
                role: role
            },
            include: [
                {
                    model: profileinfo
                }
            ]
        }).then(function (results) {
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

    profileService.listofmentor = function (req, testmodel, profileinfo, Sequelize, res) {
        console.log("welcome to view Volunteer");

        var role = 'mentor';
        testmodel.belongsTo(profileinfo, { foreignKey: 'id' });
        testmodel.findAll({
            where: {
                role: role,
                connection_status: 0,
                approvedstatus: 1

            },
            include: [
                {
                    model: profileinfo,
                }
            ]
        }).then(function (results) {
            res.send(results);
        });

    };
    profileService.editreturn = function (req, testmodel, profileinfo, Sequelize, res) {
        // console.log("hi");
        testmodel.belongsTo(profileinfo, { foreignKey: 'id' });

        var id = req.body.id;
        testmodel.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: profileinfo,
                }
            ]
        }).then(function (results) {
            res.send(results);
        });
    };

    profileService.editupdate = function (req, testmodel, profileinfo, login, Sequelize, callBack) {
        var role = req.body.role;
        var id= req.body.id;
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

        testmodel.update({
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
        }, {
                where: {
                    id: id
                }

            }).then(function (result) {
                console.log("sucses");
                profileinfo.update({
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
                },
                    {
                        where: {
                            id: id
                        }
                    }).then(function (results) {
                        login.update({
                            active: 1,
                            user_id: results.profile_id,
                            email_id: email_id,
                            role: role,
                            password: password
                        },
                            {
                                where: {
                                    user_id: results.profile_id
                                }
                            }).then(function (ress) {
                                console.log("suces inside");
                                var res = {};
                                res.profile = results;
                                res.profileinfo = result;
                                res.login = ress;
                                callBack(res);
                            })
                    })
            }).catch(function (error) {
                callBack(error);
            });
    };

    return profileService;
}