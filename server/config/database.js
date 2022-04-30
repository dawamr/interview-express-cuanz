const mysql = require("mysql");
const config = require('./config');

var connection = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
});

module.exports = connection;