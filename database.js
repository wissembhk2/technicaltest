const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('aleia', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'  // Tell Sequelize to use the PostgreSQL dialect
});

module.exports = sequelize;