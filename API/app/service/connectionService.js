var verification = require('../emailVerification/mailverification');
module.exports = function (testmodel) {
    var connectionService = {};
    connectionService.deniedvolunteernextchild = function (req, testmodel, childrenProfileModel, Sequelize, callBack) {
        var children_id = req.body.children_id;
        var role = req.body.role;
        var profile_id = req.body.volunteer_id;
        var approve_status = req.body.approve_status;
        testmodel.create({
            children_id: children_id,
            role: role,
            profile_id: profile_id,
            flag: 0,
            approve_status: 0
        }).then(function (results) {
            childrenProfileModel.update({
                connection_status: 1
            }, {
                    where: {
                        id: results.children_id
                    }
                }).then(function (result) {
                    var res = {};
                    res.testmodel = results;
                    res.childrenProfileModel = result;
                    callBack(res);
                })

        }).catch(function (error) {
            callBack(error);
        });

    };

    connectionService.insertConneection = function (req, testmodel, childrenProfileModel, Sequelize, callBack) {
        var children_id = req.body.children_id;
        var role = req.body.role;
        var profile_id = req.body.volunteer_id;
        var time = req.body.time;
        testmodel.count({
            where: {
                profile_id: profile_id,
            }
        }).then(function (result1) {
            if (result1 >= 1) {
                var res = "1"
                callBack(res);
            }
            else {
                testmodel.create({
                    children_id: children_id,
                    role: role,
                    profile_id: profile_id,
                    flag: 0
                }).then(function (results) {
                    childrenProfileModel.update({
                        connection_status: 1,
                        updated_at: time
                    }, {
                            where: {
                                id: results.children_id
                            }
                        }).then(function (result) {
                            var res = {};
                            res.testmodel = results;
                            res.testmodel = result1;
                            res.childrenProfileModel = result;
                            callBack(res);
                        })
                })
            }

        }).catch(function (error) {
            callBack(error);
        });

    };
    connectionService.mentorApproval = function (req, connectionModel, childrenProfileModel, profile, Sequelize, callBack) {
        var profileId = req.body.profileId;
        var operation = req.body.operation;
        var allDetails = {};
        if (operation == "details") {
            connectionModel.findOne({
                where: {
                    profile_id: profileId,
                    approve_status: 0
                }
            }).then(function (result) {
                console.log("cccc", result.children_id);
                allDetails.childrenId = result.children_id;
                connectionModel.findOne({
                    where: {
                        children_id: result.children_id,
                        role: "volunteer"
                    }
                }).then(function (results) {

                    allDetails.volunteerId = results.profile_id;
                    childrenProfileModel.findOne({
                        where: {
                            id: allDetails.childrenId,
                            mentor_approval: 0,

                        }
                    }).then(function (resultss) {
                        allDetails.childrenResult = resultss;
                        callBack(allDetails);
                    })

                })
            })

        }
        if (operation == "accept") {
            connectionModel.findOne({
                where: {
                    profile_id: profileId

                }
            }).then(function (result) {
                childrenProfileModel.update({
                    mentor_approval: 1
                }, {
                        where: {
                            id: result.children_id
                        }
                    })
            })
        }

    }
    connectionService.insertMentorConnection = function (req, connectionModel, Sequelize, callBack) {
        var volunteer_id = req.body.volunteerid;
        var profile_id = req.body.profile_id;
        var time = req.body.time;
        connectionModel.count({
            where: {
                profile_id: profile_id,
            }
        }).then(function (result1) {
            if (result1 >= 1) {
                var res = "1"
                callBack(res);
            }
            else {
                connectionModel.findOne({
                    where: {
                        profile_id: volunteer_id
                    }
                }).then(function (results) {
                    connectionModel.create({
                        children_id: results.children_id,
                        role: 2,
                        profile_id: profile_id,
                        flag: 0
                    }).then(function (result) {
                        callBack(result);
                    })
                })
            }
        }).catch(function (error) {
            callBack(error);
        });

    };
    connectionService.volunteerhomeselectchildicon = function (req, testmodel, Sequelize, callBack) {
        var profile_id = req.body.id;
        testmodel.count({
            where: {
                profile_id: profile_id,
            }
        }).then(function (results) {
            console.log(results);
            if (results >= 1) {

                callBack("0");
            }
            else {
                callBack("1");
            }
        })
    }

    connectionService.denydetails = function (req, connectionModel, Sequelize, res) {
        var id = req.body.id;
        console.log("sfdkjldsjf;lkdsjkl;f");
        connectionModel.findOne({
            order: [
                ['id', 'DESC']
            ],
            where: {
                profile_id: id
            }


        }).then(function (result) {
            res.send(result);
        });
    };
    connectionService.viewchild = function (req, connectionModel, childrenProfileModel, Sequelize, res) {
        var id = req.body.id;
        connectionModel.belongsTo(childrenProfileModel, { foreignKey: 'children_id' });
        connectionModel.findAll({
            where: {
                profile_id: id,
                approve_status: 1

            },

            include: [
                {
                    model: childrenProfileModel
                },
            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    connectionService.viewvolunteermentorprofile = function (req, connectionModel, profile, profileinfo, Sequelize, res) {
        var id = req.body.id;
        connectionModel.belongsTo(profile, { foreignKey: 'profile_id' });
        profile.belongsTo(profileinfo, { foreignKey: 'id' });
        connectionModel.findAll({
            where: {
                profile_id: id,
                approve_status: 1
            }
        }).then(function (result) {
            // console.log("sdffffffffffffffffffffffffffffffffffffffffffffffffffff"+result[0].children_id);
            if ((result[0] != null) || (result == null)) {
                var role1 = result[0].role;
                if (role1 == "volunteer") {
                    var role = "mentor";
                }
                else {
                    var role = "volunteer";
                }
                connectionModel.findAll({
                    where: {
                        children_id: result[0].children_id,
                        role: role
                    },
                    include: [
                        {
                            model: profile,

                            include: [
                                {
                                    model: profileinfo
                                },

                            ]
                        },

                    ]
                }).then(function (results) {
                    res.send(results);
                })
            }
            else {
                res.send("Data Not Found");
            }
        });
    };

    connectionService.viewchildvolunteer = function (req, connectionModel, profile, profileinfo, Sequelize, res) {
        var id = req.body.id;
        connectionModel.belongsTo(profile, { foreignKey: 'profile_id' });
        profile.belongsTo(profileinfo, { foreignKey: 'id' });
        connectionModel.findAll({
            where: {
                children_id: id,
                approve_status: 1 //approve_status
            },

            include: [
                {
                    model: profile,

                    include: [
                        {
                            model: profileinfo
                        },

                    ]
                },

            ]
        }).then(function (result) {
            res.send(result);
        });
    };
    connectionService.childvolunteermentor = function (req, testmodel, Sequelize, res) {
        var children_id = req.body.id;
        testmodel.findAll({
            where: {
                children_id: children_id,
            }
        }).then(function (results) {
            console.log(results);
            res.send(results);
        })
    }
    connectionService.connectionapproval = function (req, childrenProfileModel, connectionModel, profile, profileinfo, Sequelize, callBack) {

        connectionModel.belongsTo(childrenProfileModel, { foreignKey: 'children_id' });
        connectionModel.belongsTo(profile, { foreignKey: 'profile_id' });
        profile.belongsTo(profileinfo, { foreignKey: 'id' });
        var connectionOperation = req.body.connectionOperation;
        if (connectionOperation == "volunteer") {
            connectionModel.findAll({
                where: {
                    approve_status: 0,
                    role: "volunteer",
                    flag: 0
                },

                include: [
                    {
                        model: childrenProfileModel
                    },
                    {
                        model: profile,
                        include: [
                            {
                                model: profileinfo
                            }
                        ]
                    }
                ]
            }).then(function (results) {
                console.log("helllllllllllo" + results);
                callBack(results);
            })
        }
        if (connectionOperation == "mentor") {
            connectionModel.findAll({
                where: {
                    approve_status: 0,
                    role: "mentor"
                },

                include: [
                    {
                        model: childrenProfileModel,
                        where: {
                            mentor_approval: 1
                        }
                    },
                    {
                        model: profile,
                        include: [
                            {
                                model: profileinfo
                            }
                        ]
                    }
                ]
            }).then(function (results) {
                callBack(results);
            })
        }

    }


    connectionService.changeapproval = function (req, connectionModel, profile, Sequelize, res) {
        var id = req.body.id;
        var profile_id = req.body.profile_id;
        console.log("hjjjjjjjjjjjjjjjjjjj" + profile_id);
        var status = req.body.status;
        var time = req.body.time;
        // if (status == true) {
        profile.findAll({
            where: {
                id: profile_id
            }
        }).then(function (profile_find) {
            connectionModel.update({
                approve_status: 1,
                updated_at: time
            },
                {
                    where: {
                        id: id
                    }

                }).then(function (result) {
                    // console.log("sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddz" + result);
                    profile.update({
                        connection_status: 1,
                        updated_at: time
                    },
                        {
                            where: {
                                id: profile_id
                            }
                        }).then(function (results) {
                            var mailOptions = {
                                to: profile_find[0].email_id,
                                subject: "Children Connection Approved",
                                text: "The child you are requested has been Approved by admin"
                            }
                            verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                                if (error) {
                                    // console.log(error);
                                    res.end("error");
                                }
                                else {
                                }
                            });
                            res.send(results);
                        });
                })
        });
        // }
        // else {
        //     connectionModel.update({
        //         flag: 1
        //     },
        //         {
        //             where: {
        //                 id: id
        //             }
        //         }).then(function (result) {
        //             res.send(result);
        //         })
        // }
    }

    connectionService.denyapprovalconnection = function (req, connectionModel, profile, Sequelize, res) {
        var id = req.body.id;
        var profile_id = req.body.profile_id;
        console.log("hjjjjjjjjjjjjjjjjjjj" + profile_id);
        var status = req.body.status;
        var time = req.body.time;
        var childrenid = req.body.childrenprofileid;
        profile.findAll({
            where: {
                id: profile_id
            }
        }).then(function (profile_find) {
            connectionModel.update({
                approve_status: 2,
                updated_at: time
            },
                {
                    where: {
                        id: id
                    }

                }).then(function (result) {
                    // console.log("sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddz" + result);
                    profile.update({
                        connection_status: 0,
                        updated_at: time
                    },
                        {
                            where: {
                                id: childrenid
                            }
                        }).then(function (results) {
                            var mailOptions = {
                                to: profile_find[0].email_id,
                                subject: "Children Connection Denied",
                                text: "The child you are requested has been approved by Denied"
                            }
                            verification.smtpTransport.sendMail(mailOptions, function (error, response) {
                                if (error) {
                                    // console.log(error);
                                    res.end("error");
                                }
                                else {
                                }
                            });
                            res.send(results);
                        });
                });
        });

    }
    connectionService.viewadmintracker = function (req, connectionModel, profile, profileinfo, childrenProfileModel, Sequelize, callBack) {

        childrenProfileModel.hasMany(connectionModel, { foreignKey: 'children_id' });
        connectionModel.belongsTo(profile, { foreignKey: 'profile_id' });
        profile.belongsTo(profileinfo, { foreignKey: 'id' });

        // connectionModel.belongsTo(childrenProfileModel, { foreignKey: 'children_id' });
        childrenProfileModel.findAll({
            include: [
                {
                    model: connectionModel,
                    where: {
                        approve_status: 1,
                        // active_ind: 1
                    },
                    include: [
                        {
                            model: profile,
                            include: [
                                {
                                    model: profileinfo
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(function (result) {
            callBack(result);
        })
    }

    connectionService.volunteerhomeviewmentor = function (req, testmodel, Sequelize, callBack) {
        var id = req.body.id;
        testmodel.findAll({
            where: {
                profile_id: id,
                approve_status: 1
            }
        }).then(function (result) {

            if (result[0] == undefined) {
                callBack("3");
            }
            else {
                var id = result[0].children_id;
                console.log("aaaaaaaaaaaaaaaaaaa" + id);
                testmodel.count({
                    where: {
                        children_id: id,
                        role: "mentor"
                    }
                }).then(function (results) {
                    console.log(results);
                    if (results >= 1) {
                        callBack("0");
                    }
                    else {
                        callBack("1");
                    }
                })
            }

        })

    }


    return connectionService;
}
