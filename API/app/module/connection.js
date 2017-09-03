module.exports = {
    ConnectionDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('children_connections', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            children_id: {
                type: Sequelize.INTEGER
            },
            profile_id: {
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.STRING
            },
            flag: {
                type: Sequelize.INTEGER
            },
            active_ind: {
                type: Sequelize.INTEGER
            },
            approve_status: {
                type: Sequelize.INTEGER
            },
            updated_at:{
                type:Sequelize.STRING
            }

        });
        return User;
    }
}
