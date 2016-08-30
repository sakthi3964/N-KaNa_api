module.exports = function (databaseBS, Sequelize) {
    var regmodel = require('../module/test').UserDetial(databaseBS, Sequelize,"users");
    var test = require('../service/test')(regmodel);
    var testController = {};
    testController.registration = function(router) {
        router.post('/registration',function (req,res,next){
            console.log("Helo users");
            test.InsertData(req,regmodel,Sequelize,res);
        });
    }
    return testController;
}