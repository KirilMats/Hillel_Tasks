'use strict';
function Clock({_hours, _minutes, _seconds, _stop, _resume}) {
    this._time = undefined;
    this.init = function () {
        this._displayTime();
        this._resumeClock();
        this._startClock();
        this._stopClock(this._time);
    }
    this._displayTime = function () {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        _hours.innerHTML = hours < 10 ? `0${hours}` : hours;
        _minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        _seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    }
    this._resumeClock = function () {
        _resume.addEventListener('click', e => {
            this._startClock();
        })
    }
    this._startClock = function () {
        this._time = setInterval(() => {
            this._displayTime();
        }, 1000)
    }
    this._stopClock = function () {
        _stop.addEventListener('click', e => {
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