const env = require('dotenv').config();

module.exports = {
	nodeEnv: process.env.MODE,
	port: process.env.PORT || 8000
};
