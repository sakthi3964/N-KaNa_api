var express = require("express"),
app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var routers = require('./app/router/router');
var modules = require('./app/module/test');
var Sequelize = require('sequelize'),
   dbConfig = require('./app/config/config');
app.use(cors());
app.options('*', cors());
 var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());

app.use(expressSession({secret:'somesecrettokenhere'}));

var router = express.Router();
app.use(express.static(__dirname + '/'));
app.use('/', router);
var databaseBS = new Sequelize(dbConfig.ConnectionString, dbConfig.settings);
routers(databaseBS, Sequelize).apiRouters(router);
app.listen(3006, function () {
   // Console will print the message
   console.log('Example app listening on port 3006!');
});