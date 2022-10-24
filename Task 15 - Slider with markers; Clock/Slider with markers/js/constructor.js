'use strict';
function Slider({_list, _prevButton, _nextButton, _markers}) {
    this._listLength = _list.children.length;
    this._listItems = Array.from(_list.children);
    const [_listItems, _listLength] = [this._listItems, this._listLength];
    this.init = function () {
        this._switchSlide(_nextButton);
        this._switchSlide(_prevButton);
        this._addInitialClasses();
        this._addMarkers();
        this._addInitialScroll();
    }
    this._disableButton = function (button) {
        button.classList.add('disabled');
        button.setAttribute('disabled', '');
    }
    this._enableButton = function (button) {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    }
    this._toggleButton = function () {
        if(_listItems[_listLength-1].className.includes('shown')) {
            this._disableButton(_nextButton);
        } else {
            this._enableButton(_nextButton);
        }
        if(_listItems[0].className.includes('shown')) {
            this._disableButton(_prevButton);
        } else {
            this._enableButton(_prevButton);
        }
    }
    this._addInitialClasses = function () {
        const middleSlide = this._listItems[Math.floor(this._listItems.length/2)];
        middleSlide.classList.add('shown');
        middleSlide.previousElementSibling.classList.add('beforeShown');
    }
    this._switchSlide = function (button) {
        button.addEventListener('click', () => {
            _listItems.every((el) => {
                const currentMarker = document.querySelectorAll('.marker')[_listItems.indexOf(el)];
                if(button === _nextButton) {
                    if(el !== _listItems[_listLength - 1] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.nextElementSibling.classList.add('shown');
                        this._switchToNextMarker(currentMarker);
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
                if(button === _prevButton) {
                    if((el) !== _listItems[0] && el.className.includes('shown')) {
                        el.classList.remove('shown');
                        el.previousElementSibling.classList.add('shown');
                        this._switchToPrevMarker(currentMarker);
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
    this._switchToNextMarker = function (currentMarker) {
        currentMarker.classList.remove('active');
        currentMarker.nextElementSibling.classList.add('active');
        this._rightScrollMarkers();
    }
    this._switchToPrevMarker = function (currentMarker) {
        currentMarker.classList.remove('active');
        currentMarker.previousElementSibling.classList.add('active');
        this._leftScrollMarkers();
    }
    this._addInitialScroll = function () {
        const halfOfMarkers = this._markers.offsetWidth / 2;
        const halfOfScroll = this._markers.scrollWidth / 2;
        if(this._markers.children.length % 2 === 0) {
            this._markers.scrollLeft += halfOfScroll - halfOfMarkers + halfOfMarkers / 5;
        } else {
            this._markers.scrollLeft += halfOfScroll - halfOfMarkers;
        }
    }
    this._rightScrollMarkers = function (){
        const markerWidth = _markers.offsetWidth / 5;
        _markers.scrollLeft +=  markerWidth;
    }
    this._leftScrollMarkers = function () {
        const markerWidth = _markers.offsetWidth / 5;
        _markers.scrollLeft -=  markerWidth;
    }
    this._onMarkerClick = function (el, marker) {
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
    this._createMarker = function (el) {
        const marker = document.createElement('div');
        marker.classList.add('marker');
        if(el.className.includes('shown')) {
            marker.classList.add('active');
        }
        this._onMarkerClick(el, marker);
        _markers.appendChild(marker);
    }
    this._addMarkers = function () {
        _listItems.forEach((el, index) => this._createMarker(el, index))
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