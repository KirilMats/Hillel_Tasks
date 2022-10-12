'use strict';
function CardForm({_nameInput, _numberInput, _dateInput, _cvvInput, _nameOutput, _numberOutput, _dateOutput, _cvvOutput, _form}) {
    this._init = function () {
        this._onSubmit();
        this._showCardBack();
        this._hideCardBack();
        this._setCardValue(_nameInput, _nameOutput);
        this._setCardValue(_cvvInput, _cvvOutput);
        this._numberInputHandler(_numberInput, _numberOutput);
        this._numberInputHandler(_cvvInput, _cvvOutput);
        this._dateInputHandler();
    }

    this._setCardValue = function(input, output) {
        input.addEventListener('input', () => {
            output.innerHTML = input.value;
        })
    }

    this._onSubmit = function () {
        _form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log(`Card Holder is: ${_nameOutput.innerHTML}, \nCard number is: ${_numberOutput.innerHTML}, \nExpiration date is: ${_dateOutput.innerHTML}, \nCVV is: ${_cvvOutput.innerHTML}`);
        })
    }

    this._showCardBack = function () {
        _cvvInput.addEventListener('focus', () => {
            document.querySelector('.js--card').classList.add('visible');
        })
    }

    this._hideCardBack = function() {
        _cvvInput.addEventListener('blur', () => {
            document.querySelector('.js--card').classList.remove('visible');
        })
    }

    this._createErrorMessage = function(errorMessage) {
        const error = document.createElement('div');
        const errorIcon = document.createElement('img');
        errorIcon.src = './src/images/error_icon.svg';
        errorIcon.alt = '';
        error.classList.add('input__error-message');
        error.innerHTML = errorMessage;
        error.prepend(errorIcon);
        return error;
    }

    this._addErrorMessage = function(errorMessage, input) {
        const error = this._createErrorMessage(errorMessage, input);
        input.parentNode.appendChild(error);
    }

    this._addErrorBorder = function (input) {
        input.classList.add('input__error-border');
    }

    this._removeErrorBorder = function (input) {
        input.classList.remove('input__error-border');
    }

    this._removeErrorMessage = function(input) {
        input.nextSibling.remove();
    }

    this._insertSpace = function(number) {
        let newNumber = number;
        if(number.length === 16 && !number.includes(' ')) {
            newNumber = newNumber.match(/.{1,4}/g).join(' ');
        }
        return newNumber;
    }

    this._numberInputHandler = function(input, output) {
        input.addEventListener('input', () => {
            if(!/^(?=.*\d)[\d ]+$/.test(input.value)) {
                input.value = input.value.slice(0, input.value.length-1);
                if(!input.nextSibling) {
                    this._addErrorMessage('Should be a number', input);
                    this._addErrorBorder(input);
                }
            } else {
                if(input.nextSibling) {
                    this._removeErrorMessage(input);
                    this._removeErrorBorder(input);
                }
                let valueWithSpaces = this._insertSpace(input.value);
                input.value = valueWithSpaces;
                this._setCardValue(input, output);
            }
        })
        input.addEventListener('blur', () => {
            if(input.nextSibling) {
                this._removeErrorMessage(input);
                this._removeErrorBorder(input);
            }
        })
    }

    this._dateInputHandler = function () {
        _dateInput.addEventListener('focus', () => {
            _dateInput.type = 'month';
        })
        _dateInput.addEventListener('change', () => {
            let year = _dateInput.value.slice(2,4);
            let month = _dateInput.value.slice(5,7);
            _dateOutput.innerHTML = month + '/' + year;
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cardForm = new CardForm({
        _nameInput: document.querySelector('.js--full-name__input'),
        _numberInput: document.querySelector('.js--card-number__input'),
        _dateInput: document.querySelector('.js--card-date__input'),
        _cvvInput: document.querySelector('.js--card-cvv__input'),
        _nameOutput: document.querySelector('.js--card__name'),
        _numberOutput: document.querySelector('.js--card__number'),
        _dateOutput: document.querySelector('.js--card__date'),
        _cvvOutput: document.querySelector('.js--card-back__cvv'),
        _form: document.querySelector('.js--card__form')
    });
    cardForm._init();
})
