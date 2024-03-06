const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // The path to where you've set up your Sequelize instance

const User = sequelize.define('User', {
  // Define schema
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  // Model options
  tableName: 'users',
  timestamps: true,  // Enable automatic createdAt and updatedAt timestamps
});

module.exports = User;
