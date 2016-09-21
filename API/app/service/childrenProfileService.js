module.exports = function (testmodel) {
    var childrenProfileService = {};

        childrenProfileService.InsertPreassess = function (req, testmodel, Sequelize, res) {
        console.log("welcome preassess_data ");

        var preassess_data = req.body.pre;
        var time = req.body.time;

        testmodel.update({
            Pre_Assessment_Data: preassess_data,
            updated_at: time

        }, {
                where: {
                    ID: 1
                }
            });

    };

//children registration function

        childrenProfileService.childreg = function (req, testmodel, Sequelize, res) {
            console.log("welcome children registration");
            var name = req.body.name;
            var age = req.body.age;
            var gender=req.body.gender;
            var password=req.body.password;
            var dob=req.body.dob;
            var center=req.body.center;
            var email_id=req.body.email_id;
            console.log(req.body);


            console.log("hi");
            return testmodel.create({
               full_name:name,
               age:age,
               gender:gender,
               password:password,
               dob:dob,
               email_id:email_id,
               center:center

            });

        };

    return childrenProfileService;
}