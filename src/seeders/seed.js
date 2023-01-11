const db = require('../utils/database');
const Users = require('../models/users.model'); 
const Todos = require('../models/todos.model');
const Categories = require('../models/categories.model');
const TodosCategories = require('../models/todos_categories.model');



const users = [
  {username: 'Henry', email: 'henry@gmail.com', password:'123456'},
  {username: 'Laura', email: 'laura@gmail.com', password:'12sd236'},
  {username: 'Kiernan', email: 'kiernan@gmail.com', password:'1dswr456'}
];

const todos = [
  {title: 'fotos', description: 'capturar foros del picnick', idUser: 1},
  {title: 'conducir', description: 'ir de paseo a la casa de campo', idUser: 2},
  {title: 'modelo', description: 'llevar prendas extras', idUser: 3},
  {title: 'molestar', idUser: 2},
  {title: 'besar', description: 'besos apacionados con el fotografo', idUser: 3},
];

const todosCategories = [
  {idTodo: 1, idCategory:3},
  {idTodo: 2, idCategory:4},
  {idTodo: 3, idCategory:5},
  {idTodo: 4, idCategory:2},
  {idTodo: 5, idCategory:1}
];

const category = [
  {name: 'romance'},
  {name: 'romance'},
  {name: 'recuerdos'},
  {name: 'tiempo de escapada'},
  {name: 'recuerdos'}
];


//sincronizar la DB
db.sync({force: true})
  .then(()=>{
    console.log("Iniciando con el evento picnic");
    users.forEach((user) => Users.create(user));

    setTimeout(()=>{
      todos.forEach((todo) => Todos.create(todo));
    },100)

    setTimeout(()=>{
      category.forEach((category) => Categories.create(category));
    },300)

    setTimeout(()=>{
      todosCategories.forEach((todo_category) => todosCategories.create(todo_category));
    },500)
  })

  .catch((error) => console.log(error));