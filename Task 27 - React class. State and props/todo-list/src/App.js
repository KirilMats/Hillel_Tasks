import c from './App.module.css';
import ControlBar from "./components/ControlBar/ControlBar";
import ToDoList from "./components/ToDoList/ToDoList";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 0,
                    text: '123',
                    isChecked: true,
                    priority: 'low'
                },
                {
                    id: 1,
                    text: '243',
                    isChecked: false,
                    priority: 'low'
                }
            ],
            newTodo: {
                text: '',
                isChecked: false,
                priority: 'low'
            }
        }
        this.setPanelsCheckBox = undefined;
    }
    getPanelsCheckbox = (setPanelsCheckbox) => {
        this.setPanelsCheckBox = setPanelsCheckbox;
    }
    hideInput = (event) => {
        if (!event.target.className.includes('ControlBar') && !event.target.className.includes('Todo')) {
            this.setPanelsCheckBox(false);
        }
    }
    getTodoText = (text) => {
        this.setState({newTodo: {...this.state.newTodo, text: text}})
    }
    getTodoPriority = (priority) => {
        this.setState({newTodo: {...this.state.newTodo, priority: priority}})
    }
    resetNewTodo = () => {
        this.setState({newTodo: {
                text: '',
                isChecked: false,
                priority: 'low'
            }})
    }
    deleteTodo = (id) => {
        const updatedTodos = this.state.todos.filter(todo => {
            return todo.id !== id
        })
        this.setState({todos: [...updatedTodos]});
    }
    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.newTodo.text) {
            this.setState({
                todos: [...this.state.todos, {id: this.state.todos.length === 0 ? 0 : this.state.todos[this.state.todos.length - 1].id + 1, ...this.state.newTodo}]
            }, () => {
                this.resetNewTodo();
                this.setPanelsCheckBox(false);
            })
        }
    }
    getTodoCheck = (isChecked, id) => {
        const updatedTodos = this.state.todos.map((todo, i) => {
            if(i === id) {
                return{...todo, isChecked: isChecked}
            }
            return todo;
        })
        this.setState({todos: [...updatedTodos]});
    }
    render() {
        return (
            <div className={c.App} onClick={this.hideInput}>
                <div className={c.toDoList_wrapper}>
                    <form className={`${c.form} js--toDoList__form`} action="#" onSubmit={this.submitHandler}>
                        <fieldset className={c.fieldset}>
                            <legend className={c.legend}>To Do List</legend>
                            <ControlBar getPanelsCheckbox={this.getPanelsCheckbox} getTodoText={this.getTodoText} getTodoPriority={this.getTodoPriority} text={this.state.newTodo.text} selectedPriority={this.state.newTodo.priority} />
                        </fieldset>
                    </form>
                    <ToDoList todos={this.state.todos} getTodoCheck={this.getTodoCheck} deleteTodo={this.deleteTodo} />
                </div>
            </div>
        );
    }
}

export default App;
