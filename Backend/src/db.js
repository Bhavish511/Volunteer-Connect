const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('volunteerdb', 'root', 'Bhavish12345', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;