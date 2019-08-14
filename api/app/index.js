// import packages
// make bluebird default Promise
// Promise = require('bluebird'); // eslint-disable-line no-global-assign
const debug = require('debug')('server:debug');
const { port, nodeEnv } = require('./config/vars');
const app = require('./config/express');
// const mysql = require('./config/db');
const sequelize = require('./config/seq');

// open mysql connection
// mysql.connect();
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

// START THE SERVER
// =============================================================================
const listen = app.listen( port,()=>{
	debug(`server is running on port ${port} and in ${nodeEnv} mode`);
	console.log(`server is running on port ${port} and in ${nodeEnv} mode`);
});

module.exports= app;
module.exports.port=listen.address().port;
