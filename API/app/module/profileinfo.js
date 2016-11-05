//profileinfos table description
module.exports = {
    UserDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('profileinfos', {

            work_type: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            course: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            profile_id: {
                type: Sequelize.STRING
            },
            department: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            institution: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            reference: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },

            commitment: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },

            designation: {
                type: Sequelize.STRING,
                // validate: {
                //     //notEmpty: true
                // }

            },
            organization: {
                type: Sequelize.STRING,
                // validate: {
                //     //notEmpty: true
                // }

            },
            area_of_expertise: {
                type: Sequelize.STRING,
                // validate: {
                //    // notEmpty: true
                // }

            },
            experience: {
                type: Sequelize.STRING,
                // validate: {
                //     //notEmpty: true
                // }
            },
            cv: {
                type: Sequelize.STRING,
                // validate: {
                //    // notEmpty: true
                // }
            },

            photo: {
                type: Sequelize.STRING,
                // validate: {
                //     //notEmpty: true
                // }
            }

        });
        return User;
    }
}
