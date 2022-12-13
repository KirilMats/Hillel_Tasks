'use strict';
document.addEventListener('DOMContentLoaded', function () {
    class FormElement {
        constructor(element, name, type, value) {
            this.element = element;
            this.name = name;
            this.type = type;
            this.value = value;
        }
        showName() {
            console.log(`Name: ${this.name}`);
        }
        getValue() {
            return this.value;
        }
        createElement() {
            const newElement = document.createElement(`${this.element}`);
            newElement.type = `${this.type}`;
            !!this.name ? newElement.name = `${this.name}` : null;
            !!this.value ? newElement.value = `${this.value}` : null;
            return newElement;
        }
    }
    class TextElement extends FormElement {
        constructor([...args], placeholder = '') {
            super(...args);
            this.placeholder = placeholder;
        }
        init() {
            const newTextEl = super.createElement();
            this.addPlaceholder(newTextEl);
            return newTextEl;
        }
        addPlaceholder(newTextEl) {
            !!this.placeholder ? newTextEl.placeholder = this.placeholder : null;
        }
    }
    class CheckboxElement extends FormElement {
        constructor([...args], isChecked = false) {
            super(...args);
            this.isChecked = isChecked;
        }
        init() {
            const newTextEl = super.createElement();
            this.toggleChecked(newTextEl);
            return newTextEl;
        }
        toggleChecked(newTextEl) {
            this.isChecked ? newTextEl.setAttribute('checked', '') : null;
        }
    }
    class ButtonElement extends FormElement {
        constructor([...args], text) {
            super(...args);
            this.buttonText = text;
        }
        init() {
            const newTextEl = super.createElement();
            this.addButtonText(newTextEl);
            return newTextEl;
        }
        addButtonText(newTextEl) {
            !!this.buttonText ? newTextEl.append(this.buttonText) : null;
        }
    }
    class FormValidation {
        constructor(_form) {
            this._form = _form;
            this.error = undefined;
        }
        init() {
            this._createFirstNameInput();
            this._createEmailInput();
            this._createPasswordInput('js--sign-up__label_password', {'data-password': 'Must contain min 8 chars (at least 1 capital letter, 1 digit and 1 special symbol).'});
            this._createPasswordInput('js--sign-up__label_password-confirm', {'data-password_confirm': 'Confirm password'});
            this._createConfirmCheckbox();
            this._createSubmitButton();
            this._onFormSubmit();
        }
        _createFirstNameInput() {
            const input = new TextElement(['input', 'firstName', 'text'], 'Alex').init();
            input.classList.add('sign-up__input', 'sign-up__input_name', 'js--sign-up__input_name');
            input.setAttribute('data-req', 'Please fill out the field.');
            input.setAttribute('data-name', 'Must contain only letters.');
            document.querySelector('.js--sign-up__label_name').appendChild(input);
        }
        _createEmailInput() {
            const input = new TextElement(['input', 'email', 'text'], 'alex.taylor@gmail.com').init();
            input.classList.add('sign-up__input', 'sign-up__input_email', 'js--sign-up__input_email');
            input.setAttribute('data-req', 'Please fill out the field.');
            input.setAttribute('data-email', 'Must match name@mail.com format.');
            document.querySelector('.js--sign-up__label_email').appendChild(input);
        }
        _createPasswordInput(appendTarget, dataAttr) {
            const input = new TextElement(['input', 'password', 'text'], '**********').init();
            input.classList.add('sign-up__input', 'sign-up__input_password', 'js--sign-up__input_password');
            input.setAttribute('data-req', 'Please fill out the field.');
            input.setAttribute('data-match', 'Passwords do not match.');
            input.setAttribute('data-min', '8');
            switch (Object.keys(dataAttr)[0]) {
                case 'data-password':
                    input.setAttribute(Object.keys(dataAttr)[0], `${dataAttr[Object.keys(dataAttr)[0]]}`);
                    break;
                case 'data-password_confirm':
                    input.setAttribute(Object.keys(dataAttr)[0], `${dataAttr[Object.keys(dataAttr)[0]]}`);
                    break;
            }
            document.querySelector(`.${appendTarget}`).appendChild(input);
        }
        _createConfirmCheckbox() {
            const input = new CheckboxElement(['input', 'confirmTerms', 'checkbox']).init();
            document.querySelector('.js--sign-up__label_confirm-terms').prepend(input);
        }
        _createSubmitButton() {
            const button = new ButtonElement(['button', 'submit', 'submit'], 'Sign Up').init();
            button.classList.add('sign-up__submit');
            document.querySelector('.js-sign-up__fieldset').appendChild(button);
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