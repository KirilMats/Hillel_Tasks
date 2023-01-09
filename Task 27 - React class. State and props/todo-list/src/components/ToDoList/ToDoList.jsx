import c from './ToDoList.module.css';
import Todo from "./Todo/Todo";

function ToDoList(props) {
    const todos = props.todos.map(todo => <Todo key={todo.id} id={todo.id} text={todo.text} isChecked={todo.isChecked} priority={todo.priority} getTodoCheck={props.getTodoCheck} deleteTodo={props.deleteTodo} />);

    return (
        <div className={`${c.toDoList}`}>
            {todos}
        </div>
    )
}

export default ToDoList;