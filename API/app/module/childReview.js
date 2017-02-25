// reviews table description
module.exports = {
    ChildReviewDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('reviews', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            children_id: {
                type: Sequelize.INTEGER,
            },
            profile_id: {
                 type: Sequelize.INTEGER,
            },
            role: {
                type: Sequelize.STRING
            },
            review: {
                type: Sequelize.INTEGER
            },
            created_at: {
                type: Sequelize.INTEGER
            },
            updated_at: {
                type: Sequelize.INTEGER
            }

        });
        return User;
    }
}
