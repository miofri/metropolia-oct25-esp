const mkrRouters = require('express').Router();
const { convertRaw, saveTemperature } = require('../helpers/helpers');
const connectDB = require('./mongoClient');
const mgClient = require('./mongoClient');
const { MongoClient, ServerApiVersion } = require('mongodb');

mkrRouters.get('/mkr-test', async (req, res, next) => {
	try {
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

mkrRouters.post('/data', async (req, res, next) => {
	try {
		console.log('receiving', req.body);
		const tempData = await saveTemperature(req.body); //sends data to saveTemp function
		res.json(tempData);
	} catch (error) {
		next(error);
	}
});

module.exports = mkrRouters;
