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
    }
    _displayTime() {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        this._hours.innerHTML = hours < 10 ? `0${hours}` : hours;
        this._minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        this._seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    }
    _resumeClock() {
        this._resume.addEventListener('click', e => {
            this._startClock();
        })
    }
    _startClock() {
        this._time = setInterval(() => {
            this._displayTime();
        }, 1000)
    }
    _stopClock() {
        this._stop.addEventListener('click', e => {
            clearInterval(this._time);
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