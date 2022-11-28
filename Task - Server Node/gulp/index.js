const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const password = '123123qwe';

//Model
const TodosModel = require('./todos.model');

//Config
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
mongoose.connect(`mongodb+srv://test:${password}@cluster0.gxs0hyh.mongodb.net/?retryWrites=true&w=majority`, {}, () => {
    console.log('DB is running...');
})

//Start
app.listen(5001, () => {
    console.log("Server is running...");
});

//CRUD
app.get('/', (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
})
app.get('/todos', (req, res) => {
    TodosModel.find().then(response => res.send(response));
});
app.get('/todos/:id', (req, res) => {
    TodosModel.findById(req.params.id).then(response => res.send(response));
});
app.post('/todos', (req, res) => {
    const newTodo = new TodosModel(req.body);
    newTodo.save().then(response => res.send(response));
});
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    TodosModel.updateOne({_id: id}, body).then(response => res.send(response));
});
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodosModel.deleteOne({_id: id}).then(response => {
        if(response.deletedCount === 0) {
            res.status(404).send('Error. Item not found.');
        } else {
            res.send(response);
        }
    });
})
