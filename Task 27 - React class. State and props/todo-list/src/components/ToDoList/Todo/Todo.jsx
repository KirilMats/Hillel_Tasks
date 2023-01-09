import c from './Todo.module.css';
import pencilIcon from '../../../images/pencil.svg';
import bucketIcon from '../../../images/bucket.svg';

const Todo = ({id, text, isChecked, priority, getTodoCheck, deleteTodo}) => {
    const selectedPriorityClass = `toDoItem_form_priority_${priority}`;
    const checkboxChangeHandler = () => {
        const checkboxValue = isChecked ? false : true;
        getTodoCheck(checkboxValue, id);
    }
    const deleteButtonHandler = () => {
        deleteTodo(id);
    }
    return (
            <div className={c.toDoItem}>
                <form className={c.toDoItem_form} action="#">
                    <label className={c.toDoItem_label}>
                        <input className={c.toDoItem_form_checkbox} type="checkbox" name="toDoItem-form__checkbox" onChange={checkboxChangeHandler} checked={isChecked} />
                        <div className={c.toDoItem_form_textPriority}>
                            <p className={`${c.toDoItem_form_text} ${isChecked ? c.completed : ''}`}>{text}</p>
                            <span className={`${c.toDoItem_form_priority} ${c[selectedPriorityClass]}`}>{priority}</span>
                        </div>
                        <div className={`${c.toDoItem_form_controls} ${c.controls}`}>
                            <button className={c.controls_edit} type="button"><img className={c.pencil_icon} src={pencilIcon} alt="" /></button>
                            <button className={c.controls_delete} onClick={deleteButtonHandler} type="button"><img className={c.bucket_icon} src={bucketIcon} alt="" /></button>
                        </div>
                    </label>
                </form>
            </div>
        )
}

export default Todo;