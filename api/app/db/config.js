const mysql = require('mysql');
const env = require('dotenv').config();

//local mysql db connection
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect(function(err) {
	if(!err) {
		console.log("Database is connected ... nn");
	} else {
		console.log("Error connecting database ... cc");
		console.log(err.stack);
	}
});

module.exports = connection;
