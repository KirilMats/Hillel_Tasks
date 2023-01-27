import c from './TodoListApp.module.css';
import ToDoList from "../ToDoList/ToDoList";
import {useEffect, useState} from "react";
import {useRef} from "react";
import {setNewTodo, setTodos} from "../../../business/redux/reducers/todo/slice";
import {todosSelector} from "../../../business/redux/reducers/todo/selector";
import {useDispatch, useSelector} from "react-redux";
import addTodo from "../../../business/redux/reducers/todo/thunks/addTodo";
import editTodo from "../../../business/redux/reducers/todo/thunks/editTodo";
import deleteTodos from "../../../business/redux/reducers/todo/thunks/deleteAllTodos";


const App = (props) => {
    const addInputRef = useRef();
    const [isSavePanelDisabled, setSavePanel] = useState(true);
    const [error, setError] = useState('');
    const [isAddInputFocused, setAddInput] = useState(false);
    const [isPanelsCheckboxChecked, setPanelsCheckbox] = useState(false);
    const todos = useSelector(todosSelector.todos);
    const newTodo = useSelector(todosSelector.newTodo);
    const dispatch = useDispatch();

    const hideInput = (event) => {
        if (!event.target.className.includes('js--controlPanel') && !event.target.className.includes('Todo_')) {
            setPanelsCheckbox(false);
        }
    }
    const resetNewTodo = () => {
        dispatch(setNewTodo({
            text: '',
            isChecked: false,
            priority: 'low'
        }));
    }
    const editTodoHandler = (id) => {
        const todo = todos.find(todo => {
            return todo.id === id
        })
        dispatch(setNewTodo({...newTodo, text: todo.text, priority: todo.priority, id: todo.id}));
        toggleAddNewTask();
    }
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => {
            return todo.id !== id
        })
        dispatch(setTodos(updatedTodos));
    }
    const submitHandler = (e) => {
        if(newTodo.id) {
            dispatch(editTodo(e, resetNewTodo, setPanelsCheckbox, setSavePanel));
        } else {
            dispatch(addTodo(e, resetNewTodo, setPanelsCheckbox, setSavePanel, isSavePanelDisabled, keepSavePanelDisabled));
        }
    }
    const getTodoCheck = (isChecked, id) => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === id) {
                return{...todo, isChecked: isChecked}
            }
            return todo;
        })
        dispatch(setTodos( [...updatedTodos]));
    }
    const handleAddInputChange = (event) => {
        const currentInputValue = event.target.value;
        dispatch(setNewTodo({...newTodo, text: currentInputValue}));
        keepSavePanelDisabled(currentInputValue);
    }
    //Keeping Save Panel disabled until the value is not empty
    const keepSavePanelDisabled = (text) => {
        if (!text) {
            setSavePanel(true)
            setError('No text detected')
        } else {
            setSavePanel(false)
            validateAddInput(text);
        }
    }
    const validateAddInput = (text) => {
        if (text.length < 5) {
            setSavePanel(true)
            setError('Task text should have more then 5 chars')
        } else {
            setSavePanel(false)
            setError('')
        }
    }
    const handleInputFocus = (isFocused) => {
        setAddInput(isFocused);
    }
    useEffect(() => {
        if(isAddInputFocused) {
            addInputRef.current.focus();
        } else {
            addInputRef.current.blur();
        }
    })
    const handlePanelsCheckbox = () => {
        setPanelsCheckbox(!isPanelsCheckboxChecked);
    }
    const toggleAddNewTask = () => {
        handlePanelsCheckbox();
        handleInputFocus(true);
    }
    const handlePriorityOptionChange = (type) => {
        switch (type) {
            case 'low':
                dispatch(setNewTodo({...newTodo, priority: 'low'}));
                break;
            case 'medium':
                dispatch(setNewTodo({...newTodo, priority: 'medium'}));
                break;
            case 'high':
                dispatch(setNewTodo({...newTodo, priority: 'high'}));
                break;
            default:
                setNewTodo({...newTodo, priority: 'low'});
                break;
        }
        handleInputFocus(true);
    }
    const deleteAllTodosHandler = () => {
        dispatch(deleteTodos());
    }
    return (
        <div className={c.App} onClick={hideInput}>
            <div className={c.toDoList_wrapper}>
                <form className={`${c.form} js--toDoList__form`} action="Task 31 - Redux/todo-list/src/ui/components/TodoListApp/TodoListApp#" onSubmit={submitHandler}>
                    <fieldset className={c.fieldset}>
                        <legend className={c.legend}>To Do List</legend>
                        <input className={`${c.checkbox} js--controlPanel`} type="checkbox" onChange={handlePanelsCheckbox} checked={isPanelsCheckboxChecked} />
                        <label onClick={toggleAddNewTask} className={`${c.label} ${c.label_add} js--controlPanel`}>
                            <span className={`${c.button} ${c.button_plus} js--controlPanel`}></span>
                            <h2 className={`${c.headline} js--controlPanel`}>Add New Task</h2>
                        </label>
                        <label className={`${c.label} ${c.label_save} js--controlPanel ${isSavePanelDisabled ? c.disabled : ''}`}>
                            <button className={`${c.button} ${c.button_checkmark} js--controlPanel save`}></button>
                            <h2 className={`${c.headline} js--controlPanel save`}>Save</h2>
                        </label>
                        <label className={`${c.label_input} js--controlPanel input`}>
                            <div className="ControlBar_add_task js--controlPanel">
                                <input ref={addInputRef} onChange={handleAddInputChange} value={newTodo.text} className={`${c.input_add} input} js--controlPanel`}
                                       type="text" name="input" autoComplete="off" autoFocus placeholder="Enter a new task" />
                                <div className={`${c.priority} js--controlPanel input`}>
                                    <h3 className={`${c.priority_headline} js--controlPanel input`}>Select priority:</h3>
                                    <div className={`${c.priority_options} js--controlPanel input`}>
                                        <input onChange={ () => {handlePriorityOptionChange('low')}} className={`${c.priority_input} js--controlPanel`}
                                               id="priority_low" type="radio" name="priority_input" checked={newTodo.priority === 'low' ? true : ''} />
                                        <label className={`${c.priority_option} js--controlPanel input`}
                                               htmlFor="priority_low">Low</label>
                                        <input onChange={ () => {handlePriorityOptionChange('medium')}} className={`${c.priority_input} js--controlPanel`}
                                               id="priority_medium" type="radio" name="priority_input" checked={newTodo.priority === 'medium' ? true : ''} />
                                        <label className={`${c.priority_option} ${c.priority_option_medium} js--controlPanel input`}
                                               htmlFor="priority_medium">Medium</label>
                                        <input onChange={ () => {handlePriorityOptionChange('high')}} className={`${c.priority_input} js--controlPanel`}
                                               id="priority_high" type="radio" name="priority_input" checked={newTodo.priority === 'high' ? true : ''} />
                                        <label className={`${c.priority_option} js--controlPanel input`} htmlFor="priority_high">High</label>
                                    </div>
                                </div>
                            </div>
                        </label>
                        {error ? <span style={{'color': 'red', 'fontSize': '12px', 'margin': '10px 0 0 10px'}}>{error}</span> : ''}
                    </fieldset>
                </form>
                <ToDoList todos={todos} getTodoCheck={getTodoCheck} deleteTodo={deleteTodo} editTodoHandler={editTodoHandler} />
                <div style={{position: 'absolute', bottom: 0, marginBottom: '30px'}}>Tasks in Todo list: <span style={{fontWeight: '500', fontSize: '20px', color: '#E53170'}}>{todos.length}</span></div>
                <button className={c.deleteAllTodos_btn} onClick={deleteAllTodosHandler} disabled={todos.length === 0}>Clear the list</button>
            </div>
        </div>
    );
}

export default App;
