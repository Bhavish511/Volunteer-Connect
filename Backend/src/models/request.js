const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const request = sequelize.define('request', {
    request_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  request_title: {
    type: DataTypes.STRING,
  },
  request_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending','accepted','rejected'),
    allowNull: false,
  },
  request_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = request;
