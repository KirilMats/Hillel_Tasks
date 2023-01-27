import {setTodos} from "../slice";

const addTodo = (e, resetNewTodo, setPanelsCheckbox, setSavePanel, isSavePanelDisabled, keepSavePanelDisabled) => (dispatch, state) => {
    const {todos, newTodo} = state().todos;
    e.preventDefault();
    if(newTodo.text && !isSavePanelDisabled) {
        dispatch(setTodos([...todos, {id: crypto.randomUUID(), ...newTodo}]));
        resetNewTodo();
        setPanelsCheckbox(false);
        setSavePanel(true);
    } else {
        keepSavePanelDisabled('');
    }
}

export default addTodo;