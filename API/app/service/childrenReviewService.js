//insert child review form data into child review model
module.exports = function (testmodel) {
    var ChildrenReviewService = {};

    ChildrenReviewService.insertChildrenReview = function (req, childrenReviewModel, profile, Sequelize, callBack) {
        console.log("welcome insert review");
        var children_id = req.body.id;
        var profile_id = req.body.profile_id;
        console.log(profile_id);
        var time = req.body.time;
        var review = req.body.reviews;
        profile.findAll({
            where: {
                id: profile_id
            }
        }).then(function (results) {
            console.log("helloslfjl;sdjlf" + results[0].role);
            var role = results[0].role;
            childrenReviewModel.create({
                children_id: children_id,
                profile_id: profile_id,
                role: role,
                review: review
                // care: care,
                // behaviour: behaviour,
                // confidentiality: confidentiality,
                // mentorship: mentorship,
                // environment: environment,
                // feelings: feelings,
                // willingness: willingness,
                // learning: learning,
                // feedback: feedback,
                // comment: comment
            }).then(function (result) {
                callBack(result);
            }).catch(function (error) {
                callBack(error);
            });
        });
    }
    ChildrenReviewService.viewChildrenReview = function (req, childrenReviewModel, Sequelize, res) {
        console.log(req.body.date);
        testmodel.findOne({ where: { created_at: req.body.date } })
            .then(function (results) {
                console.log(results);
                res.send(results);

            });
    }
    // ChildrenReviewService.viewChildrenReview = function (req, testmodel, Sequelize, res) {
    //     var children_id = req.body.id;
    //     console.log("sdj;kldsfa" + children_id);
    //     testmodel.findOne({
    //         order: [
    //             ['updated_at', 'DESC']
    //         ],
    //         where: {

    //             children_id: children_id,
    //         }
    //     }).then(function (results) {
    //         if (results == null) {
    //             res.send("1");
    //         }
    //         else {
    //             console.log(results);
    //             res.send(results);
    //         }

    //     })
    // }
    ChildrenReviewService.childReviewDates = function (req, testmodel, Sequelize, res) {
        var children_id = req.body.id;
        console.log(children_id);
        testmodel.findAll({
            where: {
                children_id: children_id,
                role: "volunteer"
            }
        }).then(function (results) {
            res.send(results);
        })

    }

    ChildrenReviewService.childReviewDatesMentor = function (req, testmodel, Sequelize, res) {
        var children_id = req.body.id;
        console.log(children_id);
        testmodel.findAll({
            where: {
                children_id: children_id,
                role: "mentor"
            }
        }).then(function (results) {
            res.send(results);
        })

    }
    ChildrenReviewService.childreviewcheck = function (req, testmodel, Sequelize, res) {
        var children_id = req.body.id;
        console.log(children_id);
        testmodel.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            where: {
                children_id: children_id
            }
        }).then(function (results) {
            console.log("fellowfeloowlfellowflelow"+results[0].created_at);
            var created_at = results[0].created_at;
            var dateObj = new Date(created_at);
            var cur = new Date();
            var diff = (cur - dateObj) / 1000;
            var diff1 = Math.abs(Math.floor(diff));
            var days = Math.floor(diff1 / (24 * 60 * 60));
            res.send('' + days);

        })

    }
    return ChildrenReviewService;
}

