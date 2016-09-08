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
        var mobile_no = req.body.mobile_no;
        var phone = req.body.phone;
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
        var center = req.body.center;

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
            mobile_no: mobile_no,
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
            center: center,
            phone: phone

        }).then(function (result) {
                if (result == null) {
                    res.send("3");
                    res.send(result);
                    return false;
                }
            });
    };
     userService.InsertReview = function (req,testmodel,Sequelize,res) {
      console.log("welcome insert review");
       var time = req.body.time;
       var care = req.body.care;
       var behaviour = req.body.behaviour;
       var confidentiality = req.body.confidentiality;
       var mentorship = req.body.mentorship;
       var environment = req.body.environment;
       var feelings = req.body.feelings;
       var willingness = req.body.willingness;
       var learning = req.body.learning;
       var feedback = req.body.feedback;
          return testmodel.create({
                time: time,
                care: care,
                behaviour:behaviour,
                confidentiality:confidentiality,
                mentorship:mentorship,
                environment:environment,
                feelings:feelings,
                willingness:willingness,
                learning:learning,
                feedback:feedback
            });

  };
  userService.InsertTracker = function (req,testmodel,Sequelize,res) {
      console.log("welcome insert tracker");
       var date = req.body.date;
       var location = req.body.location;
       var agenda = req.body.agenda;
       var outcome = req.body.outcome;
       var keyAccomplishment = req.body.keyAccomplishment;
       var keyLearning = req.body.keyLearning;
       var newConnection = req.body.newConnection;
       var menteeChallenges = req.body.menteeChallenges;
       var mentorChallenges = req.body.mentorChallenges;
       var volunteerChallenges = req.body.volunteerChallenges ;
          return testmodel.create({
                time: time,
                care: care,
                behaviour:behaviour,
                confidentiality:confidentiality,
                mentorship:mentorship,
                environment:environment,
                feelings:feelings,
                willingness:willingness,
                learning:learning,
                feedback:feedback
            });

  };
    userService.validateUserDetial = function (req, testmodel, Sequelize, res) {
        console.log("welcome to Loginpage validation");
        var email_id = req.body.email_id
        var child_id = req.body.child_id;
        var password = req.body.password;
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
                    status: 1,
                    active: 1
                }
            }).then(function (result) {
                if (result == null) {
                    res.send("3");
                    return false;
                }
                else {
                    res.send(result);
                }
            });
        }
    };
    return userService;
}