module.exports = function (databaseBS, Sequelize) {

    var validationObj = {};
    validationObj.validation = function (req, model, Sequelize, callBack) {
        console.log("validation");
        console.log(req.body);

        model.findAll({
            where: { user_id: req.body.user_id }
        }).then(function (result) {
            console.log(result);
            if (result == "") {
                console.log("ab");
                var strin={};
                strin.msg="0";
                strin.req=req.body;

                callBack(strin);

            }

            else {
                console.log("present");
                   var strin={};
                strin.msg="1";
                strin.req=req.body;

                callBack(strin);
            }


        });
    };
    return validationObj;
}