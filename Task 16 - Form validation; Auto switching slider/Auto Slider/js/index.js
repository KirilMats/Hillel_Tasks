'use strict';
class Slider {
    constructor({_list, _prevButton, _nextButton, _markers, autoSwitch, autoSwitchTime}) {
        this._prevButton = _prevButton;
        this._nextButton = _nextButton;
        this._markersList = _markers;
        this._listLength = _list.children.length;
        this._listItems = Array.from(_list.children);
        this.autoSwitch = autoSwitch;
        this.autoSwitchTime = autoSwitchTime;
    }
    init() {
        this._addInitialClasses();
        this._onSwitchToNextSlide();
        this._onSwitchToPrevSlide();
        this._addMarkers();
        this._autoSwitchSlide();
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
        const firstSlide = this._listItems[0];
        firstSlide.classList.add('shown');
        this._prevButton.classList.add('disabled');
    }
    _resetAutoSwitchSlide() {
        clearInterval(this.autoSwitch);
    }
    _autoSwitchSlide() {
        if(this.autoSwitch) {
            this.autoSwitch = setInterval(() => {
                this._switchToNextSlideHandler();
            }, this.autoSwitchTime);
        }
    }
    _switchToNextSlideHandler() {
        const active = document.querySelector('.shown');
        const afterActive = active.nextElementSibling;
        const beforeActive = active.previousElementSibling;
        this._switchSlide({active: active, next: afterActive, beforeNext: beforeActive});
        if(afterActive) {
            this._switchToNextMarker();
        }
    }
    _switchToPrevSlideHandler() {
        const active = document.querySelector('.shown');
        const beforeActive = active.previousElementSibling;
        let beforeBeforeActive;
        if(beforeActive) {
            beforeBeforeActive = beforeActive.previousElementSibling;
            this._switchToPrevMarker();
        }
        this._switchSlide({active: active, next: beforeActive, beforeBeforeNext: beforeBeforeActive});
    }
    _onSwitchToNextSlide() {
        this._nextButton.addEventListener('click', () => {
            this._switchToNextSlideHandler();
        });
    }
    _onSwitchToPrevSlide() {
        this._prevButton.addEventListener('click', () => {
            this._switchToPrevSlideHandler();
        });
    }
    _switchSlide({active, next, beforeNext, beforeBeforeNext}) {
        if(next) {
            active.classList.remove('shown');
            if (next.className.includes('beforeShown')) {
                next.classList.remove('beforeShown');
                next.classList.add('shown');
            } else {
                next.classList.add('shown');
                active.classList.add('beforeShown');
                if(beforeNext) {
                    beforeNext.classList.remove('beforeShown');
                }
            }
            if(beforeBeforeNext) {
                beforeBeforeNext.classList.add('beforeShown');
            }
        }
        this._toggleButton();
        this._resetAutoSwitchSlide();
        this._autoSwitchSlide();
    }
    _switchToNextMarker() {
        const currentMarker = document.querySelector('.active');
        currentMarker.classList.remove('active');
        currentMarker.nextElementSibling.classList.add('active');
        this._rightScrollMarkers(currentMarker);
    }
    _switchToPrevMarker () {
        const currentMarker = document.querySelector('.active');
        currentMarker.classList.remove('active');
        currentMarker.previousElementSibling.classList.add('active');
        this._leftScrollMarkers(currentMarker);
    }
    _rightScrollMarkers (currentMarker){
        const _markers = Array.from(this._markersList.children);
        const markerWidth = this._markersList.offsetWidth / 5;
        if(_markers.indexOf(currentMarker) > 3){
            this._markersList.scrollLeft += markerWidth;
        }
    }
    _leftScrollMarkers (currentMarker) {
        const _markers = Array.from(this._markersList.children);
        const markerWidth = this._markersList.offsetWidth / 5;
        if(_markers.indexOf(currentMarker) < _markers.length - 4) {
            this._markersList.scrollLeft -= markerWidth;
        }
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
            this._resetAutoSwitchSlide();
            this._autoSwitchSlide();
        })
    }
    _createMarker(activeMarker) {
        const marker = document.createElement('div');
        marker.classList.add('marker');
        if(activeMarker.className.includes('shown')) {
            marker.classList.add('active');
        }
        this._onMarkerClick(activeMarker, marker);
        this._markersList.appendChild(marker);
    }
    _addMarkers() {
        this._listItems.forEach((el) => this._createMarker(el))
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = new Slider({
        _list: document.querySelector('.js--slider__list'),
        _prevButton: document.querySelector('.js--slider__previous'),
        _nextButton: document.querySelector('.js--slider__next'),
        _markers: document.querySelector('.js--markers'),
        autoSwitch: true,
        autoSwitchTime: 5000
    });
    slider.init();
})