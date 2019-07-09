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
    if (err) throw err;
});

module.exports = connection;
