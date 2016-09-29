var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(cors())

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/', routes)

app.use('/', express.static('DashboardClient'))

app.use('/dashboard', express.static('DashboardClient'))

.listen(process.env.PORT || 5000, function (req, res) {
	console.log('server is listening on 4000');
});

