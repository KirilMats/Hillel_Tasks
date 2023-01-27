import {deleteAllTodos} from "../slice";

const deleteTodos = () => (dispatch, state) => {
    const {todos} = state().todos;
    if(todos.length !== 0) {
        dispatch(deleteAllTodos([]));
    }
}

export default  deleteTodos;