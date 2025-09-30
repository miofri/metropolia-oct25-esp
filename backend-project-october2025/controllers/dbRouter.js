const { MongoClient, ServerApiVersion } = require('mongodb');
const connectDB = require('./mongoClient');
const dbRouters = require('express').Router();

dbRouters.get('/db-data', async (req, res, next) => {
	try {
		const db = await connectDB();
		const historicalTemperature = await db
			.collection('hist_temp')
			.find({})
			.sort({ date: -1 })
			.limit(10)
			.toArray();
		res.send(historicalTemperature);
	} catch (error) {
		next(error);
	}
});

dbRouters.delete('/db-data', async (req, res, next) => {
	const db = await connectDB();
	const deleteCollection = await db.collection('hist_temp').deleteMany({});
	res.send(200);
});

module.exports = dbRouters;
