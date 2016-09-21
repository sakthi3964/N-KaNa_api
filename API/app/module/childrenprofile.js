module.exports = {
    ChildrenProfileDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('childrenprofiles', {
   
         id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            children_id: {
                type: Sequelize.INTEGER
            },
            full_name: {
                type: Sequelize.STRING
            },
             dob: {
                type: Sequelize.STRING
            },
             age: {
                type: Sequelize.INTEGER
            },
             gender: {
                type: Sequelize.STRING
            },
             mobile_no: {
                type: Sequelize.INTEGER
            },
             email_id: {
                type: Sequelize.STRING
            },
             center: {
                type: Sequelize.STRING
            },
             user_id: {
                type: Sequelize.INTEGER
            },
             password: {
                type: Sequelize.STRING
            },
             status: {
                type: Sequelize.INTEGER
            },
             active_ind: {
                type: Sequelize.INTEGER
            },
            pre_assessment_data: {
                type: Sequelize.STRING
            },
            updated_at: {
                type: Sequelize.DATE
            }
             


                  
             
        });
        return User;
    }
}
