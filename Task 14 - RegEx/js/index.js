'use strict';
document.addEventListener('DOMContentLoaded', function () {
    class Error {
        constructor(_appendTarget, errorMessage) {
            this._appendTarget = _appendTarget;
            this.errorMessage = errorMessage;
            this.error = undefined;
        }
        _createError() {
            this.error = document.createElement('span');
            this.error.classList.add('error-message');
            this.error.innerHTML = this.errorMessage;
        }
        addError() {
            this._createError();
            this._appendTarget.appendChild(this.error);
        }
        removeError() {
            this._appendTarget.lastElementChild.remove();
        }
    }

    function errorInput(_appendTarget) {
        _appendTarget.classList.toggle('error-input');
    }

    function errorHandler(_input, _appendTarget, errorMessage, reg) {
        const error = new Error(_appendTarget, errorMessage);
        if(!_input.value.match(reg)) {
            if(!_input.nextElementSibling) {
                error.addError();
                errorInput(_appendTarget);
            }
        }
        else {
            if(_input.nextElementSibling) {
                error.removeError();
                errorInput(_appendTarget);
            }
        }
    }

    const onFormSubmit = function (_form) {
        _form.addEventListener('submit', (e) => {
            e.preventDefault();
            inputValidation({
                type: 'PASSWORD',
                reg: /(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?\/])[a-zA-Z\d~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?\/]{8,}/g,
                _input: document.querySelector('.js--sign-up__input_password'),
                _appendTarget: document.querySelector('.js--sign-up__label_password')
            });
            inputValidation({
                type: 'NAME',
                reg: /^[A-Za-z\s'-]*$/,
                _input: document.querySelector('.js--sign-up__input_f-name'),
                _appendTarget: document.querySelector('.js--sign-up__label_f-name')
            });
            inputValidation({
                type: 'NAME',
                reg:  /^[A-Za-z\s'-]*$/,
                _input: document.querySelector('.js--sign-up__input_l-name'),
                _appendTarget: document.querySelector('.js--sign-up__label_l-name')
            });
        })
    }
    onFormSubmit(document.querySelector('.js--sign-up__form'));

    const inputValidation = function ({type, reg, _input, _appendTarget}) {
        const [PASSWORD, NAME] = ['PASSWORD', 'NAME'];
        switch (type) {
            case PASSWORD:
                errorHandler(_input, _appendTarget, 'Must contain min 8 chars (at least 1 capital letter, 1 digit and 1 special symbol).', reg);
                break;
            case NAME:
                errorHandler(_input, _appendTarget, 'Must contain only letters.', reg);
                break;
        }
    }
})