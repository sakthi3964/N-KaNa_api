module.exports = function (databaseBS, Sequelize) {

    var validationObj = {};
    validationObj.validation = function (req, model, profile, Sequelize, callBack) {
        console.log("validation");
        console.log(req.body);
        model.findAll({
            where: { user_id: req.body.user_id }
        }).then(function (result) {
            profile.findAll({
                where: { email_id: req.body.user_id }
            }).then(function (result1) {
                console.log(result1);
                if (result == "") {
                    console.log("ab");
                    var strin = {};
                    strin.msg = "0";
                    strin.req = req.body;

                    callBack(strin);

                }

                else {
                    console.log("present");
                    var strin = {};
                    strin.msg = "1";
                    strin.req = req.body;

                    callBack(strin);
                }


            })
        });
    };

   
   validationObj.memvalidation = function (req, model, childrenProfileModel, Sequelize, callBack) {
       model.findAll
           ({
               where: {
                   email_id: req.body.email_id

               }
           }).then(function (result) {
               model.findAll({
                   where: { mobile_no: req.body.mobile_no }

               }).then(function (result1) {
                   childrenProfileModel.findAll({
                       where: { user_id: req.body.email_id }

                   }).then(function (result2) {
                       if (result != "" || result1 != "" || result2 != "") {
                           console.log("ab");
                           var strin = {};
                           if (result != "" || result2 != "") {
                               strin.emailidpresent = "1";
                           }
                           if (result1 != "") {
                               strin.mobilenopresent = "1";
                           }

                           strin.msg = "1";
                           strin.req = req.body;

                           callBack(strin);

                       }

                       else {
                           console.log("presentmember details ");
                           var strin = {};
                           strin.msg = "0";
                           strin.req = req.body;

                           callBack(strin);
                       }

                   })
               })


           });
   };
   return validationObj;
}

