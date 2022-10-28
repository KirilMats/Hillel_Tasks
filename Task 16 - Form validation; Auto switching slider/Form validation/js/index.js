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
        _onFormSubmit() {
            this._form.addEventListener('submit', (e) => {
                e.preventDefault();
                this._inputValidationHandler();
            })
        }
        _createError(errorMessage) {
            this.error = document.createElement('span');
            this.error.classList.add('error-message');
            this.error.innerHTML = errorMessage;
        }
        _addErrorMessage(errorMessage, _appendTarget) {
            this._createError(errorMessage);
            _appendTarget.appendChild(this.error);
        }
        _removeErrorMessage(_appendTarget) {
            _appendTarget.lastElementChild.remove();
        }
        _onInputError(_appendTarget) {
            _appendTarget.classList.toggle('error-input');
        }
        _addError(errorMessage, _input, _appendTarget) {
            if(!_input.nextElementSibling) {
                this._addErrorMessage(errorMessage, _appendTarget);
                this._onInputError(_appendTarget);
            }
        }
        _removeError(_input, _appendTarget) {
            if(_input.nextElementSibling) {
                this._removeErrorMessage(_appendTarget);
                this._onInputError(_appendTarget);
            }
        }
        _inputValidationHandler() {
            Array.from(this._form.elements).forEach(el => {
                switch (true) {
                    case Boolean(el.dataset.name):
                        this._inputValidation({
                            errorMessage: el.dataset.name,
                            reg: /^[A-Za-z\s'-]*$/,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_name')
                        });
                        break;
                    case Boolean(el.dataset.email):
                        this._inputValidation({
                            errorMessage: el.dataset.email,
                            reg: /^([a-zA-Z\d_\-\.]+)@([a-zA-Z\d_\-\.]+)\.([a-zA-Z]{2,5})$/,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_email')
                        });
                        break;
                    case Boolean(el.dataset.password):
                        const pattern = '(?=.*[A-Z])(?=.*\\d)(?=.*[~`!@#$%^&*()_\\-+={\\[}\\]|\\\\:;"\'<,>.?\\/])[a-zA-Z\\d~`!@#$%^&*()_\\-+={\\[}\\]|\\\\:;"\'<,>.?\\/]';
                        const reg = new RegExp(pattern + `{${el.dataset.min},}`, 'g');
                        this._inputValidation({
                            errorMessage: el.dataset.password,
                            reg: reg,
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_password')
                        });
                        break;
                    case Boolean(el.dataset.password_confirm):
                        this._inputValidation({
                            _input: el,
                            _appendTarget: el.closest('.js--sign-up__label_password')
                        });
                        break;
                }
            });
        }
        _inputValidation({errorMessage, reg, _input, _appendTarget}) {
            //Check if not empty
            console.log(!_input.value);
            if(!_input.value) {
                this._removeError(_input, _appendTarget);
                this._addError(_input.dataset.req, _input, _appendTarget);
            } else {
                this._removeError(_input, _appendTarget);
                //Check if pass regEx
                if (!_input.value.match(reg)) {
                    this._addError(errorMessage, _input, _appendTarget);
                } else {
                    this._removeError(_input, _appendTarget);
                    //Check if passwords match
                    if (_input.dataset.password_confirm) {
                        this._confirmPasswordValidation(_input, _appendTarget);
                    }
                }
            }
        }
        _confirmPasswordValidation(_input, _appendTarget) {
           const passwords = document.querySelectorAll('[data-match]');
           const errorMessage = _input.dataset.match;
           if(passwords[0].value !== passwords[1].value) {
               this._addError(errorMessage, _input, _appendTarget);
           } else {
               this._removeError(_input, _appendTarget);
           }
        }
    }
    const formValidation = new FormValidation(document.querySelector('.js--sign-up__form'));
    formValidation.init();
})