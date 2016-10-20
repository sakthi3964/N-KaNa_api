module.exports = function (testmodel) {
    var trackerService = {};
    //insert data into tracker model   
    trackerService.InsertTracker = function (req, testmodel, connection, Sequelize, callBack) {
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
        var volunteerChallenges = req.body.volunteerChallenges;
        var review = req.body.review;
        var profile_id = req.body.id;
        console.log("profile_id" + profile_id);
        console.log("hi");
        connection.findOne({
            where: {
                profile_id: profile_id
            }
        }).then(function (result) {
            console.log(result);
            var child_id = result.children_id;
            var role = result.role;
            console.log(role);
            testmodel.create({
                date: date,
                location: location,
                agenda: agenda,
                outcome: outcome,
                keyAccomplishment: keyAccomplishment,
                keyLearning: keyLearning,
                newConnection: newConnection,
                menteeChallenges: menteeChallenges,
                mentorChallenges: mentorChallenges,
                volunteerChallenges: volunteerChallenges,
                review: review,
                profile_id: profile_id,
                mentee_id: child_id,
                role: role
            }).then(function (results) {
                callBack(results);
            })

        }).catch(function (error) {
            callBack(error);
        });


    };

  trackerService.ListTrackerDates = function (req, testmodel, Sequelize, res) {
        console.log("welcome to listing of tracker users");

        var id = req.body.id;
        console.log(";dfjlsk" + id);
        testmodel.findAll({
            where: {
                $or: [{ mentee_id: id }, { profile_id: id }],
                $not: {
                    location: "Nil"
                }
            }
        }).then(function (results) {
            console.log(results);
            res.send(results);

        });

    };

    trackerService.mentorgraphDates = function (req, testmodel, Sequelize, res) {
        console.log("welcome to listing of tracker users");

        var id = req.body.id;
        console.log(";dfjlsk" + id);
        testmodel.findAll({
            where: {
                profile_id: id,
                role: "mentor"
            }
        }).then(function (results) {
            console.log(results);
            res.send(results);

        });

    };
    trackerService.adminmentorgraphDates = function (req, testmodel, Sequelize, res) {
        var mentee_id = req.body.id;
        console.log(mentee_id)
        testmodel.findAll({
            where:{
                mentee_id:mentee_id,
                role: "mentor"
            }
        }).then(function (results){
            res.send(results);
        })
        
      }
    trackerService.ListTrackerDatesmentorid = function (req, testmodel, connectionControllerModel, Sequelize, res) {
        var profile_id = req.body.id;
        console.log(profile_id);
        console.log("welcome to listing of tracker users");
        connectionControllerModel.findOne({
            where: {
                profile_id: profile_id
            }
        }).then(function (results) {
            var mentee_id = results.children_id;
            var role = results.role;
            console.log("hhhlsdf;al;dsfkldlfskajls;djfkl;ds" + mentee_id);
            console.log("hiiiiijlkjkl;;" + mentee_id);
            testmodel.findAll({
                where:
                {
                    mentee_id: mentee_id,
                    $not: {
                        role: role
                    }
                }
            }).then(function (results) {
                res.send(results);

            });
        })
    };
    trackerService.reviewGraph = function (req, trackerModel, Sequelize, res) {

        console.log("welcome to listing of review details of tracker  of users");

        trackerModel.findOne({ where: { date: req.body.date } })
            .then(function (results) {
                console.log(results);
                res.send(results);

            });

    }

    return trackerService;
}