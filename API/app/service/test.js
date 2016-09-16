module.exports = function (testmodel) {
    var userService = {};
    // userService.InsertData = function (req, testmodel, Sequelize, res) {
    //     console.log("Welcome");
    //     var role = req.body.role;
    //     var name = req.body.name;
    //     var dob = req.body.dob;
    //     var age = req.body.age;
    //     var gender = req.body.gender;
    //     var course = req.body.course;
    //     var department = req.body.department;
    //     var institution = req.body.institution;
    //     var address = req.body.address;
    //     var country_code = req.body.country_code;
    //     var mobile_no = req.body.mobile_no;
    //     var phone = req.body.phone;
    //     var email_id = req.body.email_id;
    //     var password = req.body.password;
    //     var reference = req.body.reference;
    //     var commitment = req.body.commitment;
    //     var designation = req.body.designation;
    //     var organization = req.body.organization;
    //     var expertise = req.body.expertise;
    //     var experience = req.body.experience;
    //     var cv = req.body.cv;
    //     var photo = req.body.photo;
    //     var center = req.body.center;

    //     return testmodel.create({
    //         role: role,
    //         name: name,
    //         dob: dob,
    //         age: age,
    //         gender: gender,
    //         course: course,
    //         department: department,
    //         institution: institution,
    //         address: address,
    //         country_code: country_code,
    //         mobile_no: mobile_no,
    //         email_id: email_id,
    //         password: password,
    //         reference: reference,
    //         commitment: commitment,
    //         designation: designation,
    //         organization: organization,
    //         expertise: expertise,
    //         experience: experience,
    //         cv: cv,
    //         photo: photo,
    //         center: center,
    //         phone: phone

    //     }).then(function (result) {
    //             if (result == null) {
    //                 res.send("3");
    //                 res.send(result);
    //                 return false;
    //             }
    //         });
    // };
     userService.InsertProfile = function (req, profilemodel,profileinfomodel, Sequelize, callBack) {
        console.log("Welcome uddgsxyudchj");
        var role = req.body.role;
        var name = req.body.name;
        var dob = req.body.dob;
        var age = req.body.age;
        var gender = req.body.gender;
        var course = req.body.course;
        var area_of_expertise=req.body.area_of_expertise;
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
           // dob: dob,
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
            console.log(result.id);       
              profileinfomodel.belongsTo(profilemodel, { foreignKey: 'profile_id' });
                profileinfomodel.create({            
            profile_id:result.id,
            course: course,
            department: department,
            institution: institution,
            reference: reference,
            commitment: commitment,
            designation: designation,
            organization: organization,
            area_of_expertise: area_of_expertise,
            experience: experience,
            cv: cv,
            photo: photo,
            }).then(function (results) {
                console.log("suces inside");
                    var res = {};
                    res.profile = results;
                    res.profileinfo = result;
                    callBack(res);
                })
            //           console.log(result);
            // callBack(result);
  
            }).catch(function (error) {
                callBack(error);
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
   userService.ListTrackerDates = function (req, testmodel, Sequelize, res) {
            console.log("welcome to listing of tracker users");
            
            
            testmodel.findAll({ where: {volunteer_id: 35} }).then(function (results) {
                
                res.send(results);
           
            });                       
         
        },
        userService.ViewReviewDetail = function (req, testmodel, Sequelize, res) {
            console.log("welcome to listing of review details of tracker  of users");
            
            
            testmodel.findOne({ where: {date: req.body.date} }).then(function (results) {
                console.log(results);
                res.send(results);
           
            });                       
         
        },
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
       var review= req.body.review;
       var volunteer_id=req.body.volunteer_id;
      // var sample = JSON.stringify(review);
      console.log("hi");
      // console.log(review.education);
          return testmodel.create({
                date: date,
                location: location,
                agenda:agenda,
                outcome:outcome,
                keyAccomplishment:keyAccomplishment,
                keyLearning:keyLearning,
                newConnection:newConnection,
                menteeChallenges:menteeChallenges,
                mentorChallenges:mentorChallenges,
                volunteerChallenges:volunteerChallenges,
                review:review,
                volunteer_id:volunteer_id
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