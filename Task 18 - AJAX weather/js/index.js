'use strict';
class WeatherWidget {
    constructor(props) {
        this._date = props._date;
        this._time = props._time;
        this._humidity = props._humidity;
        this._pressure = props._pressure;
        this._windSpeed = props._windSpeed;
        this._windDirection = props._windDirection;
        this._icon = props._icon;
        this._temp = props._temp;
        this._feelsLike = props._feelsLike;
        this._desc = props._desc;
        this._city = props._city;
        this._cityForm = props._cityForm;
        this._localStorageKeyName = props._localStorageKeyName;
        this._preloader = props._preloader;
        this.city = undefined;
    }
    init() {
        this.loadUsersCity();
        this.getUsersCity();
        this.getCity();
    }
    loadUsersCity() {
        const usersCity = JSON.parse(localStorage.getItem(this._localStorageKeyName));
        if (usersCity) {
            this.city = usersCity;
            this.getWeatherData();
        }
    }
    togglePreloader() {
        this._preloader.toggleClass('show');
    }
    getUsersCity() {
        if(!this.city) {
            const ax = axios.create();
            const response = ax.get(`https://extreme-ip-lookup.com/json/?key=xcpOqpa0tcmKcQKbXGdC`);
            response
                .then((res) => {
                    this.city = res.data.city;
                    localStorage.setItem(this._localStorageKeyName, JSON.stringify(this.city));
                    this.getWeatherData();
                })
                .catch(() => {
                    console.log("Unable to get user's city, the city is set to Lviv by default.");
                    this.city = 'Lviv';
                    this.getWeatherData();
                });
        }
    }
    getCity() {
        this._cityForm.on('submit', (e) => {
            e.preventDefault();
            const cityInput = this._cityForm.find('.js--city-input');
            if(cityInput.val()) {
                this.city = cityInput.val();
                this.getWeatherData();
                e.currentTarget.reset();
            }
        });
    }
    getWeatherData() {
        this.togglePreloader();
        const ax = axios.create();
        const response = ax.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=5d066958a60d315387d9492393935c19`);
        response
            .then((res) => {
                this.displayData(res.data);
                this.togglePreloader();
            })
            .catch(() => {
                console.log("ERROR, 404 - Not Found");
                this._city.html('404 - Not Found');
                this.displayData(undefined);
                this.togglePreloader();
            })
    }
    displayDate(data) {
        if(data) {
            // const zeroDate = new Date().toLocaleString("en-US", { timeZone: 'Europe/London' });
            const date = new Date;
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const month = monthNames[date.getMonth()];
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const dayOfMonth = date.getDate();
            const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            let dayOfWeek = dayNames[date.getDay() - 1];
            // const timezones = {
            //     '-43200': -12,
            //     '-39600': -11,
            //     '46800': 13,
            //     '50400': 14};
            // for (let val in timezones) {
            //     if(+val === data.timezone) {
            //         hours += timezones[val];
            //     }
            // }
            const time = `${hours}:${+minutes > 10 ? minutes : '0' + minutes}`;
            this._date.html(`${dayOfMonth}&nbsp;&zwnj;&nbsp;${month}&nbsp;&zwnj;&nbsp;${dayOfWeek}&nbsp;&zwnj;&nbsp;${time}`);
        } else {
            this._date.html('---');
        }
    }
    getWindDirection(deg) {
        if(deg) {
            const dirNames = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
            let dir = undefined;
            switch (true) {
                case deg < 22.5 || deg === 360:
                    dir = dirNames[0];
                    break;
                case deg >= 22.5 && deg < 45:
                    dir = dirNames[1];
                    break;
                case deg >= 45 && deg < 67.5:
                    dir = dirNames[2];
                    break;
                case deg >= 67.5 && deg < 90:
                    dir = dirNames[3];
                    break;
                case deg >= 90 && deg < 112.5:
                    dir = dirNames[4];
                    break;
                case deg >= 112.5 && deg < 135:
                    dir = dirNames[5];
                    break;
                case deg >= 135 && deg < 157.5:
                    dir = dirNames[6];
                    break;
                case deg >= 157.5 && deg < 180:
                    dir = dirNames[7];
                    break;
                case deg >= 180 && deg < 202.5:
                    dir = dirNames[8];
                    break;
                case deg >= 202.5 && deg < 225:
                    dir = dirNames[9];
                    break;
                case deg >= 225 && deg < 247.5:
                    dir = dirNames[10];
                    break;
                case deg >= 247.5 && deg < 270:
                    dir = dirNames[11];
                    break;
                case deg >= 270 && deg < 292.5:
                    dir = dirNames[12];
                    break;
                case deg >= 292.5 && deg < 315:
                    dir = dirNames[13];
                    break;
                case deg >= 315 && deg < 337.5:
                    dir = dirNames[14];
                    break;
                case deg >= 337.5 && deg < 360:
                    dir = dirNames[15];
                    break;
            }
            this._windDirection.html(`${dir} (${deg}&#176;)`);
        } else {
            this._windDirection.html('---');
        }
    }
    displayData(data) {
        if(data) {
            this.displayDate(data);
            this.getWindDirection(data.wind.deg)
            this._city.html(this.city);
            this._city.css("color", "#fff");
            this._humidity.html(`${data.main.humidity}%`);
            this._pressure.html(`${data.main.pressure} hPa`);
            this._windSpeed.html(`${data.wind.speed} km/h`);
            this._icon.attr('src', `./src/images/${data.weather[0].icon}.svg`);
            this._desc.html(data.weather[0].description);
            this._temp.html(`${Math.round(data.main.temp)}&#8451;`);
            this._feelsLike.html(`${Math.round(data.main.feels_like)}&#8451;`);
        } else {
            this.displayDate(data);
            this.getWindDirection(data);
            this._city.css("color", "#fff");
            this._humidity.html('---');
            this._pressure.html('---');
            this._windSpeed.html('---');
            this._icon.attr('src', './src/images/not_found.svg');
            this._desc.html('---');
            this._temp.html('---');
            this._feelsLike.html('---');
        }
    }
}
$(document).ready(function () {
    const weatherWidget = new WeatherWidget({
        _date: $('.js--weather__date'),
        _humidity: $('.js--weather__humidity'),
        _pressure: $('.js--weather__pressure'),
        _windSpeed: $('.js--weather__wind-speed'),
        _windDirection: $('.js--weather__wind-dir'),
        _icon: $('.js--weather__icon'),
        _temp: $('.js--weather__temp'),
        _feelsLike: $('.js--weather__feels-like'),
        _desc: $('.js--weather__desc'),
        _city: $('.js--weather__city'),
        _cityForm: $('.js--city-form'),
        _preloader: $('.js--preloader'),
        _localStorageKeyName: 'usersCity'
    });
    weatherWidget.init();
})