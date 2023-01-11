//importaciones
const express    = require('express');
const db         = require('./utils/database');
const initModels = require('./models/init.model');
const Users      = require('./models/users.model');
const Todos      = require('./models/todos.model');

const app = express();
app.use(express.json());

const PORT = 8000;

db.authenticate()
.then(()=>console.log('autenticacion exitosa'))
.catch((error) => console.log(error));

//ejecutar la funcion 
initModels();
db.sync({ force: false })
  .then(()=> console.log('Base de datos sincronizada'))
  .catch((error) => console.log(error));

app.get('/', (req, res)=>{
  res.status(200).json({message: "Bienvenido al servidor"});
});

//----------------------USERS--------------------------------
app.get('/users', async (req, res)=>{
  try {
    const result = await Users.findAll();
    res.status(200).json(result);
  
  } catch (error) {
    console.log(error);
  }
})
//obtener un usuario sabiendo su id
app.get('/users/:id', async (req, res)=> {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
  }
});
//obtener un usuario por username
app.get('/users/username/:username', async (req, res)=> {
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: {username} });//select * from users where  username= laura
    res.status(200).json(result);
    
  } catch (error) {
    console.log(error);
  }
});

//crear un usuario
app.post('/users', async (req, res) => {
  try {
    const user   = req.body;
    const result = await Users.create(user);
    res.status(201).json(result);
    
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
}); 

//actualizar un usuario
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Users.update(field, {
      where: { id }
    });
    res.status(200).json(result);

  } catch (error) {
    res.status(400).json(error.message);
  }
});

//eliminar un usuario => id
app.delete('/users/:id', async (req, res) =>{
  try {
    const { id } = req.params;
    const result = await Users.destroy({
      where: {id}
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

//----------------------TODOS--------------------------------
//Obtener todas las tareas
app.get('/todos', async (req, res) => {
  try {
    const result = await Todos.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
})

//Obtener una tarea por su id
app.get('/todos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
})

//Crear un nuevo todo
app.post('/todos', async (req, res) => {
  try {
    const todo = req.body;
    const result = await Todos.create(todo);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
})

//Actualizar un todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { is_complete } = req.params;
    const field   = req.body;
    const result  = await Todos.update(field, {
      where: { is_complete }
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

//Eliminar una tarea
app.delete('/todos', async (req, res)=>{
  try {
    const { id } = req.params;
    const result = await Todos.destroy({
      where:  { id }
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
