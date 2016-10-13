//insert child review form data into child review model
module.exports = function (testmodel) {
    var ChildrenReviewService = {};

    ChildrenReviewService.insertChildrenReview = function (req, childrenReviewModel, Sequelize, callBack) {
        console.log("welcome insert review");
        var children_id = req.body.id;
        var profile_id = req.body.role;
        var time = req.body.time;
        var review = req.body.reviews;
        // var care = req.body.care;
        // var behaviour = req.body.behaviour;
        // var confidentiality = req.body.confidentiality;
        // var mentorship = req.body.mentorship;
        // var environment = req.body.environment;
        // var feelings = req.body.feelings;
        // var willingness = req.body.willingness;
        // var learning = req.body.learning;
        // var feedback = req.body.feedback;
        // var comment = req.body.comment;
        childrenReviewModel.create({
            children_id: children_id,
            profile_id: profile_id,
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
        }).then(function (results) {
            callBack(results);
        }).catch(function (error) {
            callBack(error);
        });
    };
    ChildrenReviewService.viewChildrenReview = function (req, testmodel, Sequelize, res) {
        var children_id = req.body.id;
        testmodel.findOne({
            order: [
                ['updated_at', 'DESC']
            ],
            where: {
                children_id: children_id,
            }
        }).then(function (results) {
            if (results == null) {
                res.send("1");
            }
            else {
                console.log(results);
                res.send(results);
            }

        })
    }
    return ChildrenReviewService;
}

