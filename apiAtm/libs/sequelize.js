const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setup  = require('./../db/models')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log("URL", URI)
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});
setup(sequelize)

sequelize.sync();

module.exports = sequelize;