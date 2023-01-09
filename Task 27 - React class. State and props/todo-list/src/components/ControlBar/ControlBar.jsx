import c from "./ControlBar.module.css";
import {Component, createRef} from "react";

class ControlBar extends Component{
    constructor(props) {
        super(props);
        this.addInput = createRef();
        this.state = {
            savePanel: {
                isDisabled: true
            },
            addInput: {
                isFocused: false
            },
            panelsCheckbox: {
                isChecked: false
            }
        }
    }
    handleAddInputChange = (event) => {
        const currentInputValue = event.target.value;
        this.keepSavePanelDisabled(currentInputValue);
        const {getTodoText} = this.props;
        getTodoText(currentInputValue);
    }
    //Keeping Save Panel disabled until the value is not empty
    keepSavePanelDisabled = (text) => {
        if (!text) {
            this.setState({
                savePanel: {
                    isDisabled: true
                }
            })
        } else {
            this.setState({
                savePanel: {
                    isDisabled: false
                }
            })
        }
    }
    handleInputFocus = (isFocused) => {
        this.setState({
            addInput: {
                isFocused: isFocused
            }
        }, () => {
            if(this.state.addInput.isFocused) {
                this.addInput.current.focus();
            } else {
                this.addInput.current.blur();
            }
        })
    }
    handlePanelsCheckboxChange = () => {
        this.setState({
            panelsCheckbox: {
                isChecked: true
            }
        })
    }
    setPanelsCheckbox = (isChecked) => {
        this.setState({
            panelsCheckbox: {
                isChecked: isChecked
            }
        }, ()=>this.handleInputFocus(false));
    }
    toggleAddNewTask = () => {
            const { getPanelsCheckbox } = this.props;
            getPanelsCheckbox(this.setPanelsCheckbox);
            this.handlePanelsCheckboxChange();
            this.keepSavePanelDisabled(this.props.text);
            this.handleInputFocus(true);
    }
    handlePriorityOptionChange = (type) => {
        const {getTodoPriority} = this.props;
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
        this.handleInputFocus(true);
    }
    render() {
        return (
            <>
                <input className={`${c.checkbox}`} type="checkbox" onChange={() => {}} checked={this.state.panelsCheckbox.isChecked} />
                <label onClick={this.toggleAddNewTask} className={`${c.label} ${c.label_add}`}>
                    <span className={`${c.button} ${c.button_plus}`}></span>
                    <h2 className={`${c.headline}`}>Add New Task</h2>
                </label>
                <label className={`${c.label} ${c.label_save} ${this.state.savePanel.isDisabled ? c.disabled : ''}`}>
                    <button className={`${c.button} ${c.button_checkmark} save`}></button>
                    <h2 className={`${c.headline} save`}>Save</h2>
                </label>
                <label className={`${c.label_input} input`}>
                    <div className="ControlBar_add_task">
                        <input ref={this.addInput} onChange={this.handleAddInputChange} value={this.props.text} className={`${c.input_add} input}`}
                               type="text" name="input" autoComplete="off" autoFocus placeholder="Enter a new task" />
                        <div className={`${c.priority} input`}>
                            <h3 className={`${c.priority_headline} input`}>Select priority:</h3>
                            <div className={`${c.priority_options} input`}>
                                <input onChange={ () => {this.handlePriorityOptionChange('low')}} className={`${c.priority_input}`}
                                       id="priority_low" type="radio" name="priority_input" checked={this.props.selectedPriority === 'low' ? true : ''} />
                                <label className={`${c.priority_option} input`}
                                       htmlFor="priority_low">Low</label>
                                <input onChange={ () => {this.handlePriorityOptionChange('medium')}} className={`${c.priority_input}`}
                                       id="priority_medium" type="radio" name="priority_input" checked={this.props.selectedPriority === 'medium' ? true : ''} />
                                <label className={`${c.priority_option} ${c.priority_option_medium} input`}
                                       htmlFor="priority_medium">Medium</label>
                                <input onChange={ () => {this.handlePriorityOptionChange('high')}} className={`${c.priority_input}`}
                                       id="priority_high" type="radio" name="priority_input" checked={this.props.selectedPriority === 'high' ? true : ''} />
                                <label className={`${c.priority_option} input`} htmlFor="priority_high">High</label>
                            </div>
                        </div>
                    </div>
                </label>
            </>
        )
    }
}

export default ControlBar;