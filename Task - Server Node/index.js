const express = require('express');
const app = express();
const cors = require('cors');

//Config
app.use(cors());
app.use(express.json());

//Start
app.listen(5001, () => {
    console.log("Running...");
});

//CRUD
let todos = [
    {
        text: 'Task 1',
        checked: false,
        priority: 'Medium',
        id: 1
    },
    {
        text: 'Task 2',
        checked: true,
        priority: 'Low',
        id: 2
    },
    {
        text: 'Task 3',
        checked: false,
        priority: 'High',
        id: 3
    },
    {
        text: 'Task 4',
        checked: true,
        priority: 'Medium',
        id: 4
    },
    {
        text: 'Task 5',
        checked: false,
        priority: 'High',
        id: 5
    },
]

app.get('/todos', (req, res) => {
   res.send(todos);
});

app.post('/todos', (req, res) => {
    todos.push(req.body);
    res.send(todos);
});

app.put('/todos/:id', (req, res) => {
    // const newTodo = {
    //     ...req.body,
    //     id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    // }
    const id = +req.params.id;
    const body = req.body;
    const updatedTodo = { ...body, id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) }
    todos = todos.map(todo => todo.id === id ? {...todo, ...updatedTodo} : todo);
    res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
    const id = +req.params.id;
    if(id) {
        todos = todos.filter(todo => todo.id !== id);
        res.send(todos);
    } else {
        res.status(404);
        res.send('Error');
    }
})
