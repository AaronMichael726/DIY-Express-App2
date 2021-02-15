const Sequelize = require('sequelize')

// create db or sequelize connection
module.exports = new Sequelize('gigs', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5, 
        min: 0,
        acquire: 3000, 
        idle: 1000
    }
})