const mysql = require('mysql');
const config = require('../configurations');
const util = require('util');

const db = mysql.createConnection({
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    port: config.DBPORT,
    database: config.DBNAME,
});

module.exports = {
    query: (sql) => {
        return util.promisify(db.query).call(db, sql);
    },
    escape: (params) => {
        return db.escape(params);
    }
}
