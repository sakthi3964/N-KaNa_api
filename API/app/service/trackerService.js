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
        var volunteer_id = req.body.volunteer_id;
        console.log("hi");
        connection.findOne({
            where: {
                profile_id: volunteer_id
            }
        }).then(function (result) {
            var child_id = result.children_id;
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
                volunteer_id: volunteer_id,
                mentee_id:child_id
            }).then(function(results)
            {
                callBack(results);
            })

        }).catch(function(error){
                res.send(error);
            });


    };

    trackerService.ListTrackerDates = function (req, testmodel, Sequelize, res) {
        console.log("welcome to listing of tracker users");

        var volunteer_id = req.body.volunteer_id;
        console.log(req.body.volunteer_id);
        testmodel.findAll({ where: { volunteer_id: volunteer_id } }).then(function (results) {

            res.send(results);

        });

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