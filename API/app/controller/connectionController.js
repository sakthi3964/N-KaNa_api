module.exports = function (databaseBS, Sequelize) {
    var connectionModel = require('../module/connection').ConnectionDetial(databaseBS, Sequelize, "children_connections");
    
    var connectionServiceObject = require('../service/connectionService')(connectionModel);

    var connectionController = {};
        connectionController.InsertRequest = function (req, res, next) {
        console.log("controller");
        connectionServiceObject.insertConneection(
            req,
            connectionModel,
            Sequelize,
           res)
    };



return connectionController;
}