module.exports = function (testmodel) {
    var connectionService = {};
connectionService.insertConneection = function (req, testmodel, Sequelize, res) {
        console.log("welcome to service");
        var children_id=req.body.children_id;
        var role=req.body.role;
        var profile_id=req.body.volunteer_id;


        testmodel.create({children_id:children_id,
                          role:role,
                          profile_id:profile_id,
                        flag:0    } ).then(function (results) {

            res.send(results);

        });

    };


  return connectionService;
}
