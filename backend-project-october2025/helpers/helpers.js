const connectDB = require('../controllers/mongoClient');
const TemperatureTemplate = require('../models/temperatureModel');

// basically just converting the req.body into tempData that has the structure of TemperatureTemplate and adding date
const convertRaw = (data) => {
	const tempData = { ...TemperatureTemplate };
	tempData.date = new Date();
	tempData.humidity = data.humidity;
	tempData.temperature = data.temperature;
	console.log(tempData);
	return tempData;
};

// connect to db, use the func above, then sending it to the db
const saveTemperature = async (tempData) => {
	const db = await connectDB();
	const convertedTempData = convertRaw(tempData);
	const result = await db.collection('hist_temp').insertOne(convertedTempData);

	return result;
};

module.exports = { convertRaw, saveTemperature };
