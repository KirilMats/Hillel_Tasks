import c from "./ControlBar.module.css";
import {useEffect, useRef, useState} from "react";

const ControlBar = (props) => {
    const addInputRef = useRef();
    const [savePanel, setSavePanel] = useState({isDisabled: true});
    const [addInput, setAddInput] = useState({isFocused: false});
    const [panelsCheckbox, setPanelsCheckbox] = useState({isChecked: false});

    const handleAddInputChange = (event) => {
        const currentInputValue = event.target.value;
        keepSavePanelDisabled(currentInputValue);
        const {getTodoText} = props;
        getTodoText(currentInputValue);
    }
    //Keeping Save Panel disabled until the value is not empty
    const keepSavePanelDisabled = (text) => {
        if (!text) {
            setSavePanel({isDisabled: true})
        } else {
            setSavePanel({isDisabled: false})
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
    const handlePanelsCheckboxChange = () => {
        setPanelsCheckbox({
            isChecked: true
        });
    }
    function changePanelsCheckbox(isChecked) {
        setPanelsCheckbox({
            isChecked: isChecked
        });
        handleInputFocus(false);
    }
    const toggleAddNewTask = () => {
        const { getPanelsCheckbox } = props;
        getPanelsCheckbox(changePanelsCheckbox);
        handlePanelsCheckboxChange();
        keepSavePanelDisabled(props.text);
        handleInputFocus(true);
    }
    const handlePriorityOptionChange = (type) => {
        const {getTodoPriority} = props;
        switch(type) {
            case 'low':
                getTodoPriority('low');
                break;
            case 'medium':
                getTodoPriority('medium');
                break;
            case 'high':
                getTodoPriority('high');
        }
        handleInputFocus(true);
    }
    return (
        <>
            <input className={`${c.checkbox}`} type="checkbox" onChange={() => {}} checked={panelsCheckbox.isChecked} />
            <label onClick={toggleAddNewTask} className={`${c.label} ${c.label_add}`}>
                <span className={`${c.button} ${c.button_plus}`}></span>
                <h2 className={`${c.headline}`}>Add New Task</h2>
            </label>
            <label className={`${c.label} ${c.label_save} ${savePanel.isDisabled ? c.disabled : ''}`}>
                <button className={`${c.button} ${c.button_checkmark} save`}></button>
                <h2 className={`${c.headline} save`}>Save</h2>
            </label>
            <label className={`${c.label_input} input`}>
                <div className="ControlBar_add_task">
                    <input ref={addInputRef} onChange={handleAddInputChange} value={props.text} className={`${c.input_add} input}`}
                           type="text" name="input" autoComplete="off" autoFocus placeholder="Enter a new task" />
                    <div className={`${c.priority} input`}>
                        <h3 className={`${c.priority_headline} input`}>Select priority:</h3>
                        <div className={`${c.priority_options} input`}>
                            <input onChange={ () => {handlePriorityOptionChange('low')}} className={`${c.priority_input}`}
                                   id="priority_low" type="radio" name="priority_input" checked={props.selectedPriority === 'low' ? true : ''} />
                            <label className={`${c.priority_option} input`}
                                   htmlFor="priority_low">Low</label>
                            <input onChange={ () => {handlePriorityOptionChange('medium')}} className={`${c.priority_input}`}
                                   id="priority_medium" type="radio" name="priority_input" checked={props.selectedPriority === 'medium' ? true : ''} />
                            <label className={`${c.priority_option} ${c.priority_option_medium} input`}
                                   htmlFor="priority_medium">Medium</label>
                            <input onChange={ () => {handlePriorityOptionChange('high')}} className={`${c.priority_input}`}
                                   id="priority_high" type="radio" name="priority_input" checked={props.selectedPriority === 'high' ? true : ''} />
                            <label className={`${c.priority_option} input`} htmlFor="priority_high">High</label>
                        </div>
                    </div>
                </div>
            </label>
        </>
    )
}

export default ControlBar;