const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

const mkrRouters = require('./controllers/mkrRouter');
const dbRouters = require('./controllers/dbRouter');

// app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use('/api/mkr-routers', mkrRouters);
app.use('/api/mkr-data', dbRouters);

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

app.use((error, req, res, next) => {
	console.error('🚨 Error:', error);
	res.status(500).json({
		error: 'Internal server error',
		message: error.message,
	});
});

module.exports = app;
