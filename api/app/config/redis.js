const redis = require('redis');
require('dotenv').config();

//redis setup
// connect to Redis
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient(REDIS_URL);

client.on('connect', () => {
	console.log(`connected to redis`);
});
client.on('error', err => {
	console.log(`Error: ${err}`);
});

module.exports = client;
