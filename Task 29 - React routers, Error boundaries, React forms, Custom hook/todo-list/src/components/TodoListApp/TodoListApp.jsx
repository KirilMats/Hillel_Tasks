import c from './TodoListApp.module.css';
import ToDoList from "../ToDoList/ToDoList";
import {useEffect, useState} from "react";
import {useRef} from "react";

const App = (props) => {
    const [todos, setTodos] = useState([
        {
            id: crypto.randomUUID(),
            text: '123',
            isChecked: true,
            priority: 'low'
        },
        {
            id: crypto.randomUUID(),
            text: '243',
            isChecked: false,
            priority: 'medium'
        }
    ]);
    const [newTodo, setNewTodo] = useState({
        text: '',
        isChecked: false,
        priority: 'low'
    });

    const addInputRef = useRef();
    const [savePanel, setSavePanel] = useState({isDisabled: true});
    const [error, setError] = useState({error: ''})
    const [addInput, setAddInput] = useState({isFocused: false});
    const [panelsCheckbox, setPanelsCheckbox] = useState({isChecked: false});

    const hideInput = (event) => {
        if (!event.target.className.includes('js--controlPanel') && !event.target.className.includes('Todo_')) {
            setPanelsCheckbox({isChecked: false});
        }
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
        if(newTodo.text && !savePanel.isDisabled) {
            setTodos([...todos, {id: crypto.randomUUID(), ...newTodo}]);
            resetNewTodo();
            setPanelsCheckbox({isChecked: false});
        } else {
            keepSavePanelDisabled('');
        }
    }
    const getTodoCheck = (isChecked, id) => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === id) {
                return{...todo, isChecked: isChecked}
            }
            return todo;
        })
        setTodos( [...updatedTodos]);
    }
    const handleAddInputChange = (event) => {
        const currentInputValue = event.target.value;
        setNewTodo({...newTodo, text: currentInputValue});
        keepSavePanelDisabled(currentInputValue);
    }
    //Keeping Save Panel disabled until the value is not empty
    const keepSavePanelDisabled = (text) => {
        if (!text) {
            setSavePanel({isDisabled: true})
            setError({error: 'No text detected'})
        } else {
            setSavePanel({isDisabled: false})
            validateAddInput(text);
        }
    }
    const validateAddInput = (text) => {
        if (text.length < 5) {
            setSavePanel({isDisabled: true})
            setError({error: 'Task text should have more then 5 chars'})
        } else {
            setSavePanel({isDisabled: false})
            setError({error: ''})
        }
    }
    const handleInputFocus = (isFocused) => {
        setAddInput({
            isFocused: isFocused
        });
    }
    useEffect(() => {
        if(addInput.isFocused) {
            addInputRef.current.focus();
        } else {
            addInputRef.current.blur();
        }
    })
    const handlePanelsCheckbox = () => {
        setPanelsCheckbox({
            isChecked: !panelsCheckbox.isChecked
        });
    }
    const toggleAddNewTask = () => {
        handlePanelsCheckbox();
        handleInputFocus(true);
    }
    const handlePriorityOptionChange = (type) => {
        switch (type) {
            case 'low':
                setNewTodo({...newTodo, priority: 'low'});
                break;
            case 'medium':
                setNewTodo({...newTodo, priority: 'medium'});
                break;
            case 'high':
                setNewTodo({...newTodo, priority: 'high'});
                break;
            default:
                setNewTodo({...newTodo, priority: 'low'});
                break;
        }
        handleInputFocus(true);
    }
    return (
        <div className={c.App} onClick={hideInput}>
            <div className={c.toDoList_wrapper}>
                <form className={`${c.form} js--toDoList__form`} action="#" onSubmit={submitHandler}>
                    <fieldset className={c.fieldset}>
                        <legend className={c.legend}>To Do List</legend>
                        <input className={`${c.checkbox} js--controlPanel`} type="checkbox" onChange={handlePanelsCheckbox} checked={panelsCheckbox.isChecked} />
                        <label onClick={toggleAddNewTask} className={`${c.label} ${c.label_add} js--controlPanel`}>
                            <span className={`${c.button} ${c.button_plus} js--controlPanel`}></span>
                            <h2 className={`${c.headline} js--controlPanel`}>Add New Task</h2>
                        </label>
                        <label className={`${c.label} ${c.label_save} js--controlPanel ${savePanel.isDisabled ? c.disabled : ''}`}>
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
                        {error ? <span style={{'color': 'red', 'fontSize': '12px', 'margin': '10px 0 0 10px'}}>{error.error}</span> : ''}
                    </fieldset>
                </form>
                <ToDoList todos={todos} getTodoCheck={getTodoCheck} deleteTodo={deleteTodo} />
            </div>
        </div>
    );
}

export default App;
