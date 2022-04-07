require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('./db.config');
const db = require('../models')(config.DB);

mysql
  .createConnection({
    user: config.USER,
    password: config.PASSWORD,
    host: config.HOST,
    port: config.port || 3306,
  })
  .then((connection) => {
    console.log('Migrating DB MODEL...');
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB};`).then(() => {
      db.sequelize
        .sync({ force: true })
        .then(async () => {
          console.log('DONE...');
          process.exit(0);
        })
        .catch((err) => {
          console.log('SEQUELIZE ERROR', err);
          process.exit(0);
        });
    });
  })
  .catch((err) => console.log('DB CONNECTION ISSUES', err));
