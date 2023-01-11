const db = require('../utils/database');

const { DataTypes } = require('sequelize');

const Users = db.define('users', {
  id: {
    primaryKey:    true,
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:     false
  },
  username: {
    type:         DataTypes.STRING(15),
    alowwNull:    false,
    unique:       true 
  },
  email: {
    type:         DataTypes.STRING(30),
    allowNull:    false,
    unique:       true,
    validate: { 
      isEmail:    true 
    }
  },
  password: {
    type:         DataTypes.STRING(12),
    allowNull:    false
  }
});

module.exports = Users;