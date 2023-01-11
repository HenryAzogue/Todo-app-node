const Users = require('./users.model');
const Todos = require('./todos.model');
const Categories = require('./categories.model');
const TodosCategories = require('./todos_categories.model');

const initModels = () =>{

  Todos.belongsTo(Users, {as: 'author', foreignKey: 'user_id'});
  Users.hasMany(Todos, {as: 'task', foreignKey:'user_id'}); 

  TodosCategories.belongsTo(Todos, {as: 'task', foreignKey:'id_todo'});
  Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'id_todo'});

  TodosCategories.belongsTo(Categories, {as:'category', foreignKey: 'id_category'});
  Categories.hasMany(TodosCategories,{as:'task', foreignKey: 'id_category'});


};

module.exports = initModels;