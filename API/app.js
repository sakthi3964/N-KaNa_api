// const http         = require('http'),
//       fs           = require('fs'),
//       path         = require('path'),
//       contentTypes = require('./utils/content-types'),
//       sysInfo      = require('./utils/sys-info'),
//       env          = process.env;

// let server = http.createServer(function (req, res) {
//   let url = req.url;
//   if (url == '/') {
//     url += 'index.html';
//   }

//   // IMPORTANT: Your application HAS to respond to GET /health with status 200
//   //            for OpenShift health monitoring

//   if (url == '/health') {
//     res.writeHead(200);
//     res.end();
//   } else if (url == '/info/gen' || url == '/info/poll') {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Cache-Control', 'no-cache, no-store');
//     res.end(JSON.stringify(sysInfo[url.slice(6)]()));
//   } else {
//     fs.readFile('./static' + url, function (err, data) {
//       if (err) {
//         res.writeHead(404);
//         res.end('Not found');
//       } else {
//         let ext = path.extname(url).slice(1);
//         res.setHeader('Content-Type', contentTypes[ext]);
//         if (ext === 'html') {
//           res.setHeader('Cache-Control', 'no-cache, no-store');
//         }
//         res.end(data);
//       }
//     });
//   }
// });

// server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
//   console.log(`Application worker ${process.pid} started...`);
// });


var express = require("express"),
app = express();
var server = require('http').Server(app);
var cors = require('cors');
var bodyParser = require('body-parser');
var routers = require('./app/router/router');
//var modules = require('./app/module/test');
var Sequelize = require('sequelize'),
   dbConfig = require('./app/config/config');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());
var router = express.Router();
app.use(express.static(__dirname + '/'));
app.use('/', router);
var databaseBS = new Sequelize(dbConfig.ConnectionString, dbConfig.settings);
routers(databaseBS, Sequelize).apiRouters(router);
// app.listen(process.env.NODE_IP, function () {
//    // Console will print the message
//    console.log('Example app listening on port !' + process.env.NODE_IP);
// });

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '2500';
server.listen(port, ip);

app.get('/', function (req, res) {
  res.send('nkana api')
})
