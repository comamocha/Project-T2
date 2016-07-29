var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var Twitter = require('twitter');
var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cron = require('node-cron');
var exec = require('child_process').exec;
var spawn = require("child_process").spawn;


var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

app.use('/', express.static('DashboardClient'));
app.use('/dashboard', express.static('DashboardClient'));

app.listen(3000, function (req, res) {
	console.log('server is listening on 3000');
});

