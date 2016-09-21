module.exports = function (databaseBS, Sequelize) {
    var trackerModel = require('../module/tracker').TrackerDetial(databaseBS, Sequelize, "trackers");
    var trackerServiceObject = require('../service/trackerService')(trackerModel);

    var trackerController = {};
         // Tracker object to call service using functon call "InsertTracker"
      trackerController.Tracker = function (req, res, next) {
            console.log("hi tracker user");
            trackerServiceObject.InsertTracker(req, trackerModel, Sequelize, res);
        };

        trackerController.ListDates = function (req, res, next) {
            console.log("hi tracker user");
            trackerServiceObject.ListTrackerDates(req, trackerModel, Sequelize, res);
    }
    
     trackerController.ReviewGraph = function (req, res, next) {
            console.log("hi review of tracker user");
            trackerServiceObject.reviewGraph(req, trackerModel, Sequelize, res);
        };


     return trackerController;
}