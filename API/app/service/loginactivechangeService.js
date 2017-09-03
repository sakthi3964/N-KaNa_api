var verification = require('../emailVerification/mailverification');
module.exports = function (testmodel) {
    var loginservice = {};
    //insert data into tracker model   
    loginservice.viewlogin = function (req, login, profile, childrenProfileModel, Sequelize, res) {
        login.belongsTo(profile, { foreignKey: 'user_id' });
        login.belongsTo(childrenProfileModel, { foreignKey: 'user_id' });
        login.findAll({
            include: [
                {
                    model: profile
                },
                {
                    model: childrenProfileModel
                },
            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    loginservice.viewlogindetails = function (req, login, Sequelize, res) {
        var user_id = req.body.id;
        login.findAll({
            where: {
                user_id: user_id
            }
        }).then(function (result) {
            res.send(result);
        });
    };
    loginservice.activechange = function (req, login, Sequelize, res) {
        console.log("welcome preassess_data");
        var id = req.body.id;
        var active = req.body.active;
        var time = req.body.time;
        login.findAll({
            where: {
                user_id: id
            }
        }).then(function (profile_find) {
            login.update({
                active: active,
                updated_at: time

            }, {
                    where: {
                        user_id: id
                    }
                }).then(function (result) {

                     var mailOptions = {
                        to: profile_find[0].email_id,
                        subject: "Active Change",
                        text: "Your active value Has been changed By Admin"
                    }
                    verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            // console.log(error);
                            res.end("error");
                        } else {
                        }
                    });
                    res.send(result);
                });
        })
    };

    return loginservice;
}
