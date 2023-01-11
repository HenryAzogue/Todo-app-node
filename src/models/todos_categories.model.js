const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Categories = require('./categories.model');
const Todos = require('./todos.model');

const TodosCategories = db.define('todos_categories', {
  id: {
    primaryKey:    true,
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:     false,
    unique:        true
  },
  idTodo: {
    type:         DataTypes.INTEGER,
    allowNull:    false,
    field:        'id_todo',
    references:{
      model: Todos,
      key:   'id'
    }
  },
  idCategory: {
    type:         DataTypes.INTEGER,
    allowNull:    false,
    field:        'id_category',
    references: {
      model:  Categories,
      key:    'id'
    }
  }
},
{
  timestamps: false
});

module.exports = TodosCategories;