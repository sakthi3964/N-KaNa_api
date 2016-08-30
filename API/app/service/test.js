module.exports = function (testmodel) {
    var userService = {};
    userService.InsertData = function (req, testmodel, Sequelize, res) {
        console.log("Welcome");
        var role = req.body.role;
        var name = req.body.name;
        var dob = req.body.dob;
        var age = req.body.age;
        var gender = req.body.gender;
        var course = req.body.course;
        var department = req.body.department;
        var institution = req.body.institution;
        var address = req.body.address;
        var country_code = req.body.country_code;
        var mobile_number = req.body.mobile_number;
        var email_id = req.body.email_id;
        var password = req.body.password;
        var reference = req.body.reference;
        var commitment = req.body.commitment;
        var designation = req.body.designation;
        var organization = req.body.organization;
        var expertise = req.body.expertise;
        var experience = req.body.experience;
        var cv = req.body.cv;
        var photo = req.body.photo;
        var status = req.body.status;
        var active = req.body.active;

        return testmodel.create({
            role: role,
            name: name,
            dob: dob,
            age: age,
            gender: gender,
            course: course,
            department: department,
            institution: institution,
            address: address,
            country_code: country_code,
            mobile_number: mobile_number,
            email_id: email_id,
            password: password,
            reference: reference,
            commitment: commitment,
            designation: designation,
            organization: organization,
            expertise: expertise,
            experience: experience,
            cv: cv,
            photo: photo,
            status: status,
            active: active

        });
    };
    return userService;
}