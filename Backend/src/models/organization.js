const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Organization = sequelize.define('organization', {
  organizationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  NumProject: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userid: {    // <--- ADD THIS PART
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // your User table (Sequelize default lowercase plural)
      key: 'userid'
    }
  }
}, {
  timestamps: false
});

module.exports = Organization;
