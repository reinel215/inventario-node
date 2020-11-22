require('dotenv').config();



const config = {
    dev : process.env.NODE_ENV !== 'production',
    port : process.env.PORT || 8080,
    dbUser : process.env.DBUSER,
    dbHost : process.env.DBHOST,
    dbName : process.env.DBNAME,
    dbPort : process.env.DBPORT,
    dbPassword : process.env.DBPASSWORD
}


module.exports = { config };