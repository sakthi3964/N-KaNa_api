module.exports = function (databaseBS, Sequelize) {
    var connectionModel = require('../module/connection').ConnectionDetial(databaseBS, Sequelize, "children_connections");
    var childrenProfileModel = require('../module/childrenprofile').ChildrenProfileDetial(databaseBS, Sequelize, "childrenprofiles");
    var profileinfo = require('../module/profileinfo').UserDetial(databaseBS, Sequelize, "profileinfos");
    var profile = require('../module/profile').UserDetial(databaseBS, Sequelize, "profiles");
    var connectionServiceObject = require('../service/connectionService')(connectionModel);

    var connectionController = {};
    connectionController.InsertRequest = function (req, res, next) {
        console.log("controller");

        connectionServiceObject.insertConneection(
            req,
            connectionModel,
            childrenProfileModel,
            Sequelize,
            function (results) {
                res.send(results);
            });
    };
    connectionController.InsertMentorRequest = function (req, res, next) {
        connectionServiceObject.insertMentorConnection(
            req,
            connectionModel,
            Sequelize,
            function (results) {
                res.send(results);
            });
    };
    connectionController.volunteerhomeselectchild = function (req, res, next) {
        connectionServiceObject.volunteerhomeselectchildicon(
            req,
            connectionModel,
            Sequelize,
            function (results) {
                res.send(results);
            });
    };
    connectionController.viewchild = function (req, res, next) {
        connectionServiceObject.viewchild(
            req,
            connectionModel,
            childrenProfileModel,
            Sequelize,
            res);
    };
    connectionController.viewvolunteermentorprofile = function (req, res, next) {
        connectionServiceObject.viewvolunteermentorprofile(
            req,
            connectionModel,
            profile,
            profileinfo,
            Sequelize,
            res);
    };
    connectionController.viewchildvolunteer = function (req, res, next) {
        connectionServiceObject.viewchildvolunteer(
            req,
            connectionModel,
            profile,
            profileinfo,
            Sequelize,
            res);
    };
    connectionController.childvolunteermentor = function (req, res, next) {
        console.log("controller");

        connectionServiceObject.childvolunteermentor(
            req,
            connectionModel,
            Sequelize,
            res);
    };

    connectionController.viewadmintracker = function (req, res, next) {
        connectionServiceObject.viewadmintracker(
            req,
            connectionModel,
            profile,
            profileinfo,
            childrenProfileModel,
            Sequelize,
            function (results) {
                res.send(results);
            });
    };
    connectionController.connectionapproval = function (req, res, next) {
        connectionServiceObject.connectionapproval(
            req,
            childrenProfileModel,
            connectionModel,
            profile,
            profileinfo,
            Sequelize,
            function (results) {
                res.send(results);
            }
        )
    };
    connectionController.changeapproval = function (req, res, next) {
        connectionServiceObject.changeapproval(
            req,
            connectionModel,
            Sequelize,
            res);
    };
    connectionController.volunteerhomeviewmentor = function (req, res, next) {
        connectionServiceObject.volunteerhomeviewmentor(
            req,
            connectionModel,
            Sequelize,
            function (results) {
                res.send(results);
            });
    };
    return connectionController;
}