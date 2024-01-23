const dotenv = require('dotenv')

dotenv.config()
module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_USER
}  = process.env

