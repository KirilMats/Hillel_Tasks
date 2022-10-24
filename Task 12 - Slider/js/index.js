'use strict';
function Slider({_list, _prevButton, _nextButton}) {
    this._listLength = _list.children.length;
    this._listItems = Array.from(_list.children);
    const [_listItems, _listLength] = [this._listItems, this._listLength];

    this._init = function () {
        this._switchSlide(_nextButton);
        this._switchSlide(_prevButton);
    }

    this._disableButton = function () {
        if(_listItems[_listLength-1].className.includes('shown')) {
            _nextButton.classList.add('disabled');
            _nextButton.setAttribute('disabled', '');
        } else {
            _nextButton.classList.remove('disabled');
            _nextButton.removeAttribute('disabled');
        }
        if(_listItems[0].className.includes('shown')) {
            _prevButton.classList.add('disabled');
            _prevButton.setAttribute('disabled', '');
        } else {
            _prevButton.classList.remove('disabled');
            _prevButton.removeAttribute('disabled');
        }
    }

    this._switchSlide = function (button) {
        button.addEventListener('click', () => {
            if(button === _nextButton) {
                _listItems.every(el => {
                    if(el !== _listItems[_listLength - 1] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.nextElementSibling.classList.add('shown');
                        if(el.nextElementSibling) {
                            if(el.previousElementSibling) {
                                el.previousElementSibling.classList.remove('beforeShown');
                            }
                            el.classList.add('beforeShown');
                        }
                        this._disableButton();
                        return false
                    }
                    return true
                })
            }
            if(button === _prevButton) {
                _listItems.every(el => {
                    if(el !== _listItems[0] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.previousElementSibling.classList.add('shown');
                        if(el.previousElementSibling.previousElementSibling) {
                            el.previousElementSibling.classList.remove('beforeShown');
                            el.previousElementSibling.previousElementSibling.classList.add('beforeShown');
                        } else {
                            el.previousElementSibling.classList.remove('beforeShown');
                        }
                        this._disableButton();
                        return false
                    }
                    return true
                })
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = new Slider({
        _list: document.querySelector('.js--slider__list'),
        _prevButton: document.querySelector('.js--slider__previous'),
        _nextButton: document.querySelector('.js--slider__next')
    });
    slider._init();
})