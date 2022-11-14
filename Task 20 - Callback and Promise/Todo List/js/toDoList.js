'use strict';
class ToDo {
    constructor({_input, _list, _form, _savePanel, _addPanel, _panelsCheckbox, _priorityOptions}) {
        this._input = _input;
        this._list = _list;
        this._form = _form;
        this._savePanel = _savePanel;
        this._addPanel = _addPanel;
        this._panelsCheckbox = _panelsCheckbox;
        this._priorityOptions = _priorityOptions;
    }

    init() {
        this._onSubmit();
        this._keepSavePanelDisabled();
        this._toggleAddNewTask();
        this._hideInput();
        this._keepInputFocused();
        this._loadFromServer();
    }

    _loadFromServer() {
        fetch("http://localhost:3000/todos", {
            method: "GET"
        }).then(res => res.json()).then(todos => {
            console.log(todos);
            todos.forEach(todo => {
                this._addToDo(todo.text);
                if(todo.checked) {
                    // this._completeToDo();
                }
            })
        });

    }

    _onSubmit() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._addToDo();
        })
    }

    _addToDo(todoText) {
        const value = this._input.value || todoText;
        if (value) {
            const selectedPriority = this._getSelectedPriority();
            const toDo = this._createTodo(value, selectedPriority);
            this._list.insertAdjacentHTML('afterbegin', toDo);
            this._onCompleteCheckboxChange();
            this._onDeleteButtonClick();
            this._resetPriority();
            this._disableSavePanel();
            this._panelsCheckbox.checked = '';
        }
        this._input.value = '';
    }

    _createTodo(toDoText, selectedPriority) {
        return (`
            <div class="toDoList__toDoItem toDoItem">
                <form class="toDoItem__form toDoItem-form" action="#">
                    <label class="toDoItem-form__label" >
                        <input class="toDoItem-form__checkbox js--toDoItem-form__checkbox" type="checkbox" name="toDoItem-form__checkbox">
                        <div class="toDoItem-form__text-priority">
                            <p class="toDoItem-form__text">${toDoText}</p>
                            <span class="toDoItem-form__priority toDoItem-form__priority_${selectedPriority.toLowerCase()}">${selectedPriority}</span>
                        </div>
                        <div class="toDoItem-form__controls controls">
                            <button class="controls__edit" type="button"><img class="pencil-icon" src="./src/images/pencil.svg" alt=""></button>
                            <button class="controls__delete" type="button"><img class="bucket-icon" src="./src/images/bucket.svg" alt=""></button>
                        </div>
                    </label>
                </form>
            </div>
        `)
    }

    _onCompleteCheckboxChange() {
        document.querySelector('.js--toDoItem-form__checkbox').addEventListener('change', (e) => {this._completeToDo(e.target)});
    }

    _completeToDo(checkbox) {
        const toDoCheckbox = checkbox;
        const toDoText = checkbox.nextElementSibling.firstElementChild;
        const toDoItem = checkbox.closest('.toDoItem');
        toDoText.classList.toggle('completed');

        toDoCheckbox.checked
            ? this._list.appendChild(toDoItem)
            : this._list.insertBefore(toDoItem, this._list.firstElementChild);
    }

    _onDeleteButtonClick = () => {
        document.querySelector('.controls__delete').addEventListener('click', this._deleteToDo);
    }

    _deleteToDo = function () {
        const toDo  = this.closest('.toDoList__toDoItem');
        toDo.remove();
    }

    _disableSavePanel = function () {
        this._savePanel.classList.add('disabled');
    }

    //Keeping Save Panel disabled until the value is not empty
    _keepSavePanelDisabled() {
        this._input.addEventListener('input', () => {
            if (this._input.value === '') {
                this._savePanel.classList.add('disabled');
            } else {
                this._savePanel.classList.remove('disabled');
            }
        })
    }

    _makeInputFocused() {
        this._input.focus();
    }

    _toggleAddNewTask() {
        this._addPanel.addEventListener('click', (event) => {
            this._panelsCheckbox.checked = 'true';
            this._makeInputFocused();
        })
    }

    _hideInput() {
        document.querySelector('.container').addEventListener('click', (event) => {
            if (event.target.parentElement !== this._addPanel && !event.target.className.includes('input') && !event.target.className.includes('save')) {
                this._panelsCheckbox.checked = '';
            }
        })
    }

    _getSelectedPriority() {
        let selectedPriority;
        this._priorityOptions.forEach(function (option) {
            if (option.checked) {
                selectedPriority = option.nextElementSibling.textContent;
            }
        })
        return selectedPriority;
    }

    _resetPriority() {
        this._priorityOptions[0].checked = 'true';
    }

    _keepInputFocused() {
        this._priorityOptions.forEach( option => {
            option.addEventListener('change', () => {
                this._makeInputFocused();
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const toDo = new ToDo({
        _input: document.querySelector('.js--toDoList-form__input_add'),
        _list: document.querySelector('.js--toDoList'),
        _form: document.querySelector('.js--toDoList__form'),
        _savePanel: document.querySelector('.js--toDoList-form__label_save'),
        _addPanel: document.querySelector('.toDoList-form__label_add'),
        _panelsCheckbox: document.querySelector('.js--toDoList-form__checkbox'),
        _priorityOptions: document.querySelectorAll('.js--priority__input')
    });
    toDo.init();
})