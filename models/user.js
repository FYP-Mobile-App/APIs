const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
