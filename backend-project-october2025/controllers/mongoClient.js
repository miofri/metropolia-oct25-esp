const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// simple mongodb connection - creates a mongodb client then connect to db.

const mongoClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db;

// connect to the 'mkr1010_historical' where data from mkr1010 is saved.
const connectDB = async () => {
	if (!db) {
		await mongoClient.connect();
		db = mongoClient.db('mkr1010_historical');
		console.log('✅ Connected to MongoDB Atlas');
	}
	return db;
};

module.exports = connectDB;
