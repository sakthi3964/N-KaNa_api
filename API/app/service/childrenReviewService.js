//insert child review form data into child review model
module.exports = function (testmodel) {
    var ChildrenReviewService = {};

    ChildrenReviewService.insertChildrenReview = function (req, childrenReviewModel, Sequelize, res) {
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
        return childrenReviewModel.create({
            time: time,
            care: care,
            behaviour: behaviour,
            confidentiality: confidentiality,
            mentorship: mentorship,
            environment: environment,
            feelings: feelings,
            willingness: willingness,
            learning: learning,
            feedback: feedback
        });

    };

     return ChildrenReviewService;
}

