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
            email_id: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            }

        });
        return User;
    }
}
