import {updateTodo} from "../slice";

const editTodo = (e, resetNewTodo, setPanelsCheckbox, setSavePanel) => (dispatch, state) => {
    const {todos, newTodo} = state().todos;
    e.preventDefault();
    const updatedTodos = todos.map((todo) => {
        if(todo.id === newTodo.id) {
            return{...todo, text: newTodo.text, priority: newTodo.priority}
        }
        return todo;
    })
    dispatch(updateTodo(updatedTodos));
    resetNewTodo();
    setPanelsCheckbox(false);
    setSavePanel(true);
}

export default editTodo;