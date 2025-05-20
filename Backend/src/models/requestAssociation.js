const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Volunteer = require('./volunteer');
const Organization = require('./organization');
const Request = require('./request');

const requestassociation = sequelize.define('RequestAssociation', {
  associationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Volunteer,
      key: 'volunteerid'   // Volunteer table primary key
    }
  },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Organization,
      key: 'organizationid'   // Organization table primary key
    }
  },
  request_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Request,
      key: 'request_id'   // Now it matches the correct key in the Request table
    }
  }
}, {
  timestamps: false
});

// Associations
requestassociation.belongsTo(Volunteer, { foreignKey: 'volunteerId', onDelete: 'CASCADE' });
requestassociation.belongsTo(Organization, { foreignKey: 'organizationId', onDelete: 'CASCADE' });
requestassociation.belongsTo(Request, { foreignKey: 'request_Id', onDelete: 'CASCADE' });

module.exports = requestassociation;
