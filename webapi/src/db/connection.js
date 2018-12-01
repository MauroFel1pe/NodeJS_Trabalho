const mysql = require("mysql");

module.exports = function () {
    return function () {
        return mysql.createConnection({
            "host" : process.env.host,
            "user" : process.env.user,
            "password" : process.env.password,
            "database" : process.env.database
        });
    }
};