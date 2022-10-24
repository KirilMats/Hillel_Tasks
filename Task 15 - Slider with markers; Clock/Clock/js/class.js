'use strict';
class Clock {
    constructor({_hours, _minutes, _seconds, _stop, _resume}) {
        this._time = undefined;
        this._hours = _hours;
        this._minutes = _minutes;
        this._seconds = _seconds;
        this._stop = _stop;
        this._resume = _resume;
    }
    init() {
        this._displayTime();
        this._resumeClock();
        this._startClock();
        this._stopClock(this._time);
        this._disableButton(this._resume);
    }
    _displayTime() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        this._hours.innerHTML = hours < 10 ? `0${hours}` : hours;
        this._minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        this._seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    }
    _disableButton(button) {
        if(button === this._resume) {
            this._resume.setAttribute('disabled', '');
        } else if(button === this._stop) {
            this._stop.setAttribute('disabled', '');
        }
    }
    _enableButton(button) {
        if(button === this._resume) {
            this._resume.removeAttribute('disabled');
        } else if(button === this._stop) {
            this._stop.removeAttribute('disabled');
        }
    }
    _resumeClock() {
        this._resume.addEventListener('click', e => {
            this._startClock();
            this._disableButton(this._resume);
            this._enableButton(this._stop);
        })
    }
    _startClock() {
        this._time = setInterval(() => this._displayTime(), 1000)
    }
    _stopClock() {
        this._stop.addEventListener('click', e => {
            clearInterval(this._time);
            this._disableButton(this._stop);
            this._enableButton(this._resume);
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const clock = new Clock({
        _hours: document.querySelector('.js--hours'),
        _minutes: document.querySelector('.js--minutes'),
        _seconds: document.querySelector('.js--seconds'),
        _stop: document.querySelector('.js--clock__button_stop'),
        _resume: document.querySelector('.js--clock__button_resume')
    });
    clock.init();
})