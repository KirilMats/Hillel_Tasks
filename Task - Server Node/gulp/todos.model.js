const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodosSchema = Schema({
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'Low'
    }
});

const TodosModel = mongoose.model('Todos', TodosSchema);

module.exports = TodosModel;