'use strict';
function ToDo ({_input, _list}) {
    this._savePanel = document.querySelector('.js--toDoList-form__label_save');
    this._addPanel = document.querySelector('.toDoList-form__label_add');
    this._panelsCheckbox = document.querySelector('.js--toDoList-form__checkbox');
    this._priorityOptions = document.querySelectorAll('.js--priority__input');
    const [_savePanel, _addPanel, _panelsCheckbox, _priorityOptions] = [this._savePanel, this._addPanel, this._panelsCheckbox, this._priorityOptions];

    this._init = function () {
        this._onSubmit();
        this._keepSavePanelDisabled();
        this._toggleAddNewTask();
        this._hideInput();
        this._keepInputFocused();
    }

    this._onSubmit = function () {
        document.querySelector('.js--toDoList__form').addEventListener('submit', (event) => {
            event.preventDefault();
            this._addToDo();
        })
    }

    this._addToDo = function () {
        const value = _input.value;
        if (value) {
            const selectedPriority = this._getSelectedPriority();
            const toDo = this._getTodo(value, selectedPriority);
            _list.insertAdjacentHTML('afterbegin', toDo);
            this._onCompleteCheckboxChange();
            this._onDeleteButtonClick();
            this._resetPriority();
            this._disableSavePanel();
            _panelsCheckbox.checked = '';
        }
        _input.value = '';
    }

    this._getTodo = function (toDoText, selectedPriority) {
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

    this._onCompleteCheckboxChange = () => {
        document.querySelector('.js--toDoItem-form__checkbox').addEventListener('change', this._completeToDo);
    }

    this._completeToDo = (event) => {
        const toDoCheckbox = event.target;
        const toDoText = event.target.nextElementSibling.firstElementChild;
        const toDoItem = event.target.parentNode.parentNode.parentNode;
        toDoText.classList.toggle('completed');

        toDoCheckbox.checked
            ? _list.appendChild(toDoItem)
            : _list.insertBefore(toDoItem, _list.firstElementChild);
    }

    this._onDeleteButtonClick = () => {
        document.querySelector('.controls__delete').addEventListener('click', this._deleteToDo);
    }

    this._deleteToDo = function () {
        const toDo  = this.closest('.toDoList__toDoItem');
        toDo.remove();
    }

    this._disableSavePanel = function () {
        _savePanel.classList.add('disabled');
    }

    //Keeping Save Panel disabled until the value is not empty
    this._keepSavePanelDisabled = function () {
        _input.addEventListener('input', () => {
            if (_input.value === '') {
                _savePanel.classList.add('disabled');
            } else {
                _savePanel.classList.remove('disabled');
            }
        })
    }

    this._makeInputFocused = function () {
        _input.focus();
    }

    this._toggleAddNewTask = function () {
        _addPanel.addEventListener('click', (event) => {
            _panelsCheckbox.checked = 'true';
            this._makeInputFocused();
        })
    }

    this._hideInput = function () {
        document.querySelector('.container').addEventListener('click', (event) => {
            if (event.target.parentElement !== _addPanel && !event.target.className.includes('input') && !event.target.className.includes('save')) {
                _panelsCheckbox.checked = '';
            }
        })
    }

    this._getSelectedPriority = function () {
        let selectedPriority;
        _priorityOptions.forEach(function (option) {
            if (option.checked) {
                selectedPriority = option.nextElementSibling.textContent;
            }
        })
        return selectedPriority;
    }

    this._resetPriority = function () {
        _priorityOptions[0].checked = 'true';
    }

    this._keepInputFocused = function () {
        _priorityOptions.forEach( option => {
            option.addEventListener('change', () => {
                this._makeInputFocused();
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const toDo = new ToDo({
        _input: document.querySelector('.js--toDoList-form__input_add'),
        _list: document.querySelector('.js--toDoList')
    });
    toDo._init();
})