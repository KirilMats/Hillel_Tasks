'use strict';
class Slider {
    constructor({_list, _prevButton, _nextButton, _markers}) {
        this._prevButton = _prevButton;
        this._nextButton = _nextButton;
        this._markers = _markers;
        this._listLength = _list.children.length;
        this._listItems = Array.from(_list.children);
    }
    init() {
        this._switchSlide(this._nextButton);
        this._switchSlide(this._prevButton);
        this._addInitialClasses();
        this._addMarkers();
        this._addInitialScroll();
    }
    _disableButton(button) {
        button.classList.add('disabled');
        button.setAttribute('disabled', '');
    }
    _enableButton(button) {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    }
    _toggleButton() {
        if(this._listItems[this._listLength-1].className.includes('shown')) {
            this._disableButton(this._nextButton);
        } else {
            this._enableButton(this._nextButton);
        }
        if(this._listItems[0].className.includes('shown')) {
            this._disableButton(this._prevButton);
        } else {
            this._enableButton(this._prevButton);
        }
    }
    _addInitialClasses() {
        const middleSlide = this._listItems[Math.floor(this._listItems.length/2)];
        middleSlide.classList.add('shown');
        middleSlide.previousElementSibling.classList.add('beforeShown');
    }
    _switchSlide(button) {
        button.addEventListener('click', () => {
            this._listItems.every((el, index) => {
                const currentMarker = document.querySelectorAll('.marker')[this._listItems.indexOf(el)];
                if(button === this._nextButton) {
                    if(el !== this._listItems[this._listLength - 1] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.nextElementSibling.classList.add('shown');
                        this._switchToNextMarker(currentMarker, index);
                        if(el.nextElementSibling) {
                            if(el.previousElementSibling) {
                                el.previousElementSibling.classList.remove('beforeShown');
                            }
                            el.classList.add('beforeShown');
                        }
                        this._toggleButton();
                        return false
                    }
                    return true
                }
                if(button === this._prevButton) {
                    if((el) !== this._listItems[0] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.previousElementSibling.classList.add('shown');
                        this._switchToPrevMarker(currentMarker, index);
                        if(el.previousElementSibling.previousElementSibling) {
                            el.previousElementSibling.classList.remove('beforeShown');
                            el.previousElementSibling.previousElementSibling.classList.add('beforeShown');
                        } else {
                            el.previousElementSibling.classList.remove('beforeShown');
                        }
                        this._toggleButton();
                        return false
                    }
                    return true
                }
            })
        })
    }
    _switchToNextMarker(currentMarker) {
        currentMarker.classList.remove('active');
        currentMarker.nextElementSibling.classList.add('active');
        this._rightScrollMarkers();
    }
    _switchToPrevMarker (currentMarker) {
        currentMarker.classList.remove('active');
        currentMarker.previousElementSibling.classList.add('active');
        this._leftScrollMarkers();
    }
    _addInitialScroll() {
        const halfOfMarkers = this._markers.offsetWidth / 2;
        const halfOfScroll = this._markers.scrollWidth / 2;
        if(this._markers.children.length % 2 === 0) {
            this._markers.scrollLeft += halfOfScroll - halfOfMarkers + halfOfMarkers / 5;
        } else {
            this._markers.scrollLeft += halfOfScroll - halfOfMarkers;
        }
    }
    _rightScrollMarkers (){
        const markerWidth = this._markers.offsetWidth / 5;
        this._markers.scrollLeft +=  markerWidth;
    }
    _leftScrollMarkers () {
        const markerWidth = this._markers.offsetWidth / 5;
        this._markers.scrollLeft -=  markerWidth;
    }
    _onMarkerClick(el, marker) {
        marker.addEventListener('click', () => {
            const shownClass = 'shown';
            const beforeShownClass = 'beforeShown';
            const activeClass = 'active';
            const beforeShown = document.querySelector(`.${beforeShownClass}`);
            document.querySelector(`.${activeClass}`).classList.remove(activeClass);
            document.querySelector(`.${shownClass}`).classList.remove(shownClass);
            el.classList.add(shownClass);
            marker.classList.add(activeClass);
            if(beforeShown) {
                beforeShown.classList.remove(beforeShownClass);
            }
            if(el.previousElementSibling) {
                el.previousElementSibling.classList.add(beforeShownClass);
            }
            this._toggleButton();
        })
    }
    _createMarker(el) {
        const marker = document.createElement('div');
        marker.classList.add('marker');
        if(el.className.includes('shown')) {
            marker.classList.add('active');
        }
        this._onMarkerClick(el, marker);
        this._markers.appendChild(marker);
    }
    _addMarkers() {
        this._listItems.forEach((el, index) => this._createMarker(el, index))
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = new Slider({
        _list: document.querySelector('.js--slider__list'),
        _prevButton: document.querySelector('.js--slider__previous'),
        _nextButton: document.querySelector('.js--slider__next'),
        _markers: document.querySelector('.js--markers')
    });
    slider.init();
})