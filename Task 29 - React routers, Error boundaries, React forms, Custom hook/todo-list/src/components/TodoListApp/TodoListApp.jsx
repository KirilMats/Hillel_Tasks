import c from './TodoList.module.css';
import ControlBar from "../ControlBar/ControlBar";
import ToDoList from "../ToDoList/ToDoList";
import {useEffect, useState} from "react";

const App = (props) => {
    const [todos, setTodos] = useState([
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
    ]);
    const [newTodo, setNewTodo] = useState({
        text: '',
        isChecked: false,
        priority: 'low'
    });
    const [panelsCheckbox, setPanelsCheckbox] = useState({toggle: null});
    const [savePanel, setSavePanel] = useState({isDisabled: false});

    const getPanelsCheckbox = (toggle) => {
        setPanelsCheckbox({toggle: toggle});
    }
    const getSavePanel = (savePanel) => {
        setSavePanel({isDisabled: savePanel.isDisabled});
        console.log(savePanel);
    }
    const hideInput = (event) => {
        if (!event.target.className.includes('ControlBar') && !event.target.className.includes('Todo_')) {
            panelsCheckbox.toggle(false);
        }
    }
    const getTodoText = (text) => {
        setNewTodo({...newTodo, text: text});
    }
    const getTodoPriority = (priority) => {
        setNewTodo({...newTodo, priority: priority});
    }
    const resetNewTodo = () => {
        setNewTodo({
            text: '',
            isChecked: false,
            priority: 'low'
        });
    }
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => {
            return todo.id !== id
        })
        setTodos([...updatedTodos]);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(savePanel.isDisabled);
        if(newTodo.text && !savePanel.isDisabled) {
            setTodos([...todos, {id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1, ...newTodo}]);
            resetNewTodo();
            panelsCheckbox.toggle(false);
        }
    }
    const getTodoCheck = (isChecked, id) => {
        const updatedTodos = todos.map((todo, i) => {
            if(i === id) {
                return{...todo, isChecked: isChecked}
            }
            return todo;
        })
        setTodos( [...updatedTodos]);
    }
    return (
        <div className={c.App} onClick={hideInput}>
            <div className={c.toDoList_wrapper}>
                <form className={`${c.form} js--toDoList__form`} action="#" onSubmit={submitHandler}>
                    <fieldset className={c.fieldset}>
                        <legend className={c.legend}>To Do List</legend>
                        <ControlBar getPanelsCheckbox={getPanelsCheckbox} getSavePanel={getSavePanel} getTodoText={getTodoText} getTodoPriority={getTodoPriority} text={newTodo.text} selectedPriority={newTodo.priority} />
                    </fieldset>
                </form>
                <ToDoList todos={todos} getTodoCheck={getTodoCheck} deleteTodo={deleteTodo} />
            </div>
        </div>
    );
}

export default App;
