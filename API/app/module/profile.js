// profiles table description
module.exports = {
    UserDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('profiles', {
            role: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.STRING,
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
            address_line1: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            address_line2: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            city: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            state: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            country: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            postal_code: {
                type: Sequelize.STRING,
                // validate: {
                //     notEmpty: true
                // }
            },
            code: {
                type: Sequelize.INTEGER,
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
            phone: {
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
            // status: {
            //     type: Sequelize.INTEGER,
            //     // validate: {
            //     //     //notEmpty: true
            //     // }
            // },
            // active: {
            //     type: Sequelize.INTEGER,
            //     // validate: {
            //     //     //notEmpty: true
            //     // }
            // },
            connection_status: {
                type: Sequelize.INTEGER,
                // validate: {
                //     //notEmpty: true
                // }
            },
            approvedstatus: {
                type: Sequelize.INTEGER,
                // validate: {
                //     //notEmpty: true
                // }
            },
            updated_at: {
                type: Sequelize.STRING
            },
            verification_status: {
                type: Sequelize.INTEGER,
            },
            encrypted_email: {
                type: Sequelize.STRING,
            }
        });
        return User;
    }
}
