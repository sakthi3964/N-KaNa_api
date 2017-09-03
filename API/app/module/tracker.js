//trackers table description
module.exports = {
    TrackerDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('trackers', {
           id:{
               type:Sequelize.INTEGER,
               primaryKey:true
           },
           date:{
                type: Sequelize.INTEGER
            },
            role:{
                type: Sequelize.STRING
            },
            location:{
                type: Sequelize.STRING
            },
            agenda:{
                type: Sequelize.STRING
            },
            outcome:{
                type: Sequelize.STRING
            },
            newConnection:{
                type: Sequelize.STRING
            },
            keyAccomplishment:{
                type: Sequelize.STRING
            },
            keyLearning:{
                type: Sequelize.STRING
            },
             menteeChallenges:{
                type: Sequelize.STRING
            },
             mentorChallenges:{
                type: Sequelize.STRING
            },
             volunteerChallenges:{
                type: Sequelize.STRING
            },
             mentee_id:{
                type: Sequelize.INTEGER
            },
             profile_id:{
                type: Sequelize.INTEGER
            },
            review:{
                type: Sequelize.STRING
            },
            created_at:{
                type: Sequelize.STRING
            }
            
             });
        return User;
    }
}
