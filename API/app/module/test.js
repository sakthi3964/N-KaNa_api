module.exports = {
    UserDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('users', {
            role: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            name: {
                type: Sequelize.STRING,
                // validate: {
                //     len: {
                //         args: 3,
                //         msg: "Volunteer name should atleast contains 3 characters"
                //     }
                // }
            },

            dob: {
                type: Sequelize.DATE,
                // validate: {
                //     notEmpty: true
                // }

            },
            age: {
                type: Sequelize.INTEGER,
                // validate: {
                //     notEmpty: true
                // },

            },
            gender: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // },

            },
            course: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
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
            address: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            country_code: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            mobile_no: {
                type: Sequelize.INTEGER,
                // validate: {
                //     notEmpty: true,
                //     isNumeric: true
                // }
            },
            email_id: {
                type: Sequelize.STRING,
                // validate: {
                //     isEmail: true
                // }
            },
            password: {
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
            // expertise: {
            //     type: Sequelize.STRING,
            //     // validate: {
            //     //    // notEmpty: true
            //     // }

            // },
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
            },
            status: {
                type: Sequelize.INTEGER,
                // validate: {
                //     //notEmpty: true
                // }
            },
            active: {
                type: Sequelize.INTEGER,
                // validate: {
                //     //notEmpty: true
                // }
            }

        });
        return User;
    }
}
