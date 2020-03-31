const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DBHOST: process.env.DBHOST,
    DBUSER: process.env.DBUSER,
    DBPASSWORD: process.env.DBPASSWORD,
    DBPORT: process.env.DBPORT,
    DBNAME: process.env.DBNAME
};