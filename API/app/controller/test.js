// module.exports = function (databaseBS, Sequelize) {
//     var login = require('../module/login').UserDetial(databaseBS, Sequelize, "logins");
//     var test = require('../service/test')(login);
//     var childReviewModel = require('../module/childReview').ChildReviewDetial(databaseBS, Sequelize, "reviews");
//     var test1 = require('../service/test')(childReviewModel);
//     // var trackerModel = require('../module/tracker').TrackerDetial(databaseBS, Sequelize, "trackers");
//     // var test2 = require('../service/test')(trackerModel); 
//     var profileinfo = require('../module/profileinfo').UserDetial(databaseBS, Sequelize, "profileinfos");
//     var test3 = require('../service/test')(profileinfo);
//     var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
//     var test4 = require('../service/test')(profile);
    

//     var testController = {};

//      // registration object to call service using functon call "InsertProfile"
//       testController.registration = function (router) {
//         router.post('/registration', function (req, res, next) {
//             console.log("Helo users");
//             test4.InsertProfile(req, profile, profileinfo, login, Sequelize, function (results) {
//                     res.send(results);  });
//         });
//     }
//     // ChildReview object to call service using functon call "InsertReview"
//       testController.ChildReview = function (router) {
//         router.post('/review', function (req, res, next) {
//             console.log("hi review user");
//             test1.InsertReview(req, childReviewModel, Sequelize, res);
//         });
//     }
//      // Tracker object to call service using functon call "InsertTracker"
//     //   testController.Tracker = function (router) {
//     //     router.post('/tracker', function (req, res, next) {
//     //         console.log("hi tracker user");
//     //         test2.InsertTracker(req, trackerModel, Sequelize, res);
//     //     });
//     // }
//     // ListDates object to call service using functon call "ListTrackerDates"
//     testController.ListDates = function (req, res, next) {
//             console.log("hi tracker user");
//             test2.ListTrackerDates(req, trackerModel, Sequelize, res);
//     }
//     // ReviewDetail object to call service using functon call "ViewReviewDetail"
//     testController.ReviewGraph = function (req, res, next) {
//             console.log("hi review of tracker user");
//             test2.ViewReviewDetail(req, trackerModel, Sequelize, res);
//         });
//     }
//   // ValidateUser object to call service using functon call "validateUserDetial"
//     testController.ValidateUser = function (router) {
//         router.post('/validateuser', function (req, res, next) {
//             console.log("Entering into validate user");
//             test.validateUserDetial(
//                 req,
//                 login,
//                 Sequelize,
//                 res);
//         });
//     }
//     return testController;
// }