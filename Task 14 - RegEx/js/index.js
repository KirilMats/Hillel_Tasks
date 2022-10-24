'use strict';
document.addEventListener('DOMContentLoaded', function () {
    class FormValidation {
        constructor(_form) {
            this._form = _form;
            this.error = undefined;
        }
        init() {
            this._onFormSubmit();
        }
        _createError(errorMessage) {
            this.error = document.createElement('span');
            this.error.classList.add('error-message');
            this.error.innerHTML = errorMessage;
        }
        _addError(errorMessage, _appendTarget) {
            this._createError(errorMessage);
            _appendTarget.appendChild(this.error);
        }
        _removeError(_appendTarget) {
            _appendTarget.lastElementChild.remove();
        }
        _errorInput(_appendTarget) {
            _appendTarget.classList.toggle('error-input');
        }
        _onFormSubmit() {
            this._form.addEventListener('submit', (e) => {
                e.preventDefault();
                Array.from(this._form.elements).forEach(el => {
                    if(el.dataset.password) {
                        this._inputValidation({
                            errorMessage: el.dataset.password,
                            reg: /(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?\/])[a-zA-Z\d~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?\/]{8,}/g,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_password')
                        });
                    }
                    if(el.dataset.name) {
                        this._inputValidation({
                            errorMessage: el.dataset.name,
                            reg: /^[A-Za-z\s'-]*$/,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_name')
                        });
                    }
                    if(el.dataset.email) {
                        this._inputValidation({
                            errorMessage: el.dataset.email,
                            reg: /^([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5})$/,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_email')
                        });
                    }
                });
            })
        }
        _inputValidation({errorMessage, reg, _input, _appendTarget}) {
            if(!_input.value.match(reg)) {
                if(!_input.nextElementSibling) {
                    this._addError(errorMessage, _appendTarget);
                    this._errorInput(_appendTarget);
                }
            }
            else {
                if(_input.nextElementSibling) {
                    this._removeError(_appendTarget);
                    this._errorInput(_appendTarget);
                }
            }
        }
    }
    const formValidation = new FormValidation(document.querySelector('.js--sign-up__form'));
    formValidation.init();
})