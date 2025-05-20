const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Volunteer = sequelize.define('volunteer', {
  volunteerid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  NumProject: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  skills: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userid: {  // <--- ADD THIS PART
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // table name (lowercase usually if you didn't force it to Users)
      key: 'userid'
    }
  }
}, {
  timestamps: false
});

module.exports = Volunteer;
