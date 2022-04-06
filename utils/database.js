const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'marnie', 'fyp', {
    host: 'localhost',
    dialect: 'mysql'
  });
