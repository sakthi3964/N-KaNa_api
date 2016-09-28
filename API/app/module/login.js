// users table description
module.exports = {
    UserDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('logins', {
            role: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            email_id: {
                type: Sequelize.STRING,
                //     validate: {
                //         isEmail: true
                //     }
            },
            password: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            active: {
                type: Sequelize.INTEGER
            }


        });
        return User;
    }
}
