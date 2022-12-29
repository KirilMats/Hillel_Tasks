import c from "./AddSkill.module.css";

const AddSkill = ({addSkill}) => {
    const submitHandle = (e) => {
        e.preventDefault();
        addSkill(e.target.elements[0].value);
        e.target.elements[0].value = '';
    }
    return (
        <div className={c.addSkill}>
            <form className={c.form} action="" onSubmit={(e) => {submitHandle(e)}}>
                <input className={c.add_input} name="newSkill" type="text" placeholder="Add new skill" />
            </form>
        </div>
    )
}

export default AddSkill;