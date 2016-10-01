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
            Sequelize,
            res);
    };
    connectionController.volunteerhomeselectchild = function (req, res, next) {
        connectionServiceObject.volunteerhomeselectchildicon(
            req,
            connectionModel,
            Sequelize,
            res);
    };
    connectionController.viewchild = function (req, res, next) {
        connectionServiceObject.viewchild(
            req,
            connectionModel,
            childrenProfileModel,
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

    return connectionController;
}