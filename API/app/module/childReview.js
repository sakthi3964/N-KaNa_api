module.exports = {
    ChildReviewDetial: function (sequelize, Sequelize, modelName) {
        var User = sequelize.define('reviews', {
           id:{
               type:Sequelize.INTEGER,
               primaryKey:true
           },
          
            time:{
                type: Sequelize.INTEGER
            },
             care:{
                type: Sequelize.INTEGER
            },
             behaviour:{
                type: Sequelize.INTEGER
            },
             confidentiality:{
                type: Sequelize.INTEGER
            },
             mentorship:{
                type: Sequelize.INTEGER
            },
             environment:{
                type: Sequelize.INTEGER
            },
             feelings:{
                type: Sequelize.INTEGER
            },
             willingness:{
                type: Sequelize.INTEGER
            },
             learning:{
                type: Sequelize.INTEGER
            },
             feedback:{
                type: Sequelize.INTEGER
            }
            
             
        });
        return User;
    }
}
