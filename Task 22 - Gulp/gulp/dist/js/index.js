'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WeatherWidget = /*#__PURE__*/function () {
  function WeatherWidget(props) {
    _classCallCheck(this, WeatherWidget);
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
  _createClass(WeatherWidget, [{
    key: "init",
    value: function init() {
      this.loadUsersCity();
      this.getUsersCity();
      this.getCity();
    }
  }, {
    key: "loadUsersCity",
    value: function loadUsersCity() {
      var usersCity = JSON.parse(localStorage.getItem(this._localStorageKeyName));
      if (usersCity) {
        this.city = usersCity;
        this.getWeatherData();
      }
    }
  }, {
    key: "togglePreloader",
    value: function togglePreloader() {
      this._preloader.toggleClass('show');
    }
  }, {
    key: "getUsersCity",
    value: function getUsersCity() {
      var _this = this;
      if (!this.city) {
        var ax = axios.create();
        var response = ax.get("https://extreme-ip-lookup.com/json/?key=xcpOqpa0tcmKcQKbXGdC");
        response.then(function (res) {
          _this.city = res.data.city;
          localStorage.setItem(_this._localStorageKeyName, JSON.stringify(_this.city));
          _this.getWeatherData();
        })["catch"](function () {
          console.log("Unable to get user's city, the city is set to Lviv by default.");
          _this.city = 'Lviv';
          _this.getWeatherData();
        });
      }
    }
  }, {
    key: "getCity",
    value: function getCity() {
      var _this2 = this;
      this._cityForm.on('submit', function (e) {
        e.preventDefault();
        var cityInput = _this2._cityForm.find('.js--city-input');
        if (cityInput.val()) {
          _this2.city = cityInput.val();
          _this2.getWeatherData();
          e.currentTarget.reset();
        }
      });
    }
  }, {
    key: "getWeatherData",
    value: function getWeatherData() {
      var _this3 = this;
      this.togglePreloader();
      var ax = axios.create();
      var response = ax.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(this.city, "&units=metric&APPID=5d066958a60d315387d9492393935c19"));
      response.then(function (res) {
        _this3.displayData(res.data);
        _this3.togglePreloader();
      })["catch"](function () {
        console.log("ERROR, 404 - Not Found");
        _this3._city.html('404 - Not Found');
        _this3.displayData(undefined);
        _this3.togglePreloader();
      });
    }
  }, {
    key: "displayDate",
    value: function displayDate(data) {
      if (data) {
        // const zeroDate = new Date().toLocaleString("en-US", { timeZone: 'Europe/London' });
        var date = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var month = monthNames[date.getMonth()];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var dayOfMonth = date.getDate();
        var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var dayOfWeek = dayNames[date.getDay() - 1];
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
        var time = "".concat(hours, ":").concat(+minutes > 10 ? minutes : '0' + minutes);
        this._date.html("".concat(dayOfMonth, "&nbsp;&zwnj;&nbsp;").concat(month, "&nbsp;&zwnj;&nbsp;").concat(dayOfWeek, "&nbsp;&zwnj;&nbsp;").concat(time));
      } else {
        this._date.html('---');
      }
    }
  }, {
    key: "getWindDirection",
    value: function getWindDirection(deg) {
      if (deg) {
        var dirNames = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        var dir = undefined;
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
        this._windDirection.html("".concat(dir, " (").concat(deg, "&#176;)"));
      } else {
        this._windDirection.html('---');
      }
    }
  }, {
    key: "displayData",
    value: function displayData(data) {
      if (data) {
        this.displayDate(data);
        this.getWindDirection(data.wind.deg);
        this._city.html(this.city);
        this._city.css("color", "#fff");
        this._humidity.html("".concat(data.main.humidity, "%"));
        this._pressure.html("".concat(data.main.pressure, " hPa"));
        this._windSpeed.html("".concat(data.wind.speed, " km/h"));
        this._icon.attr('src', "./src/images/".concat(data.weather[0].icon, ".svg"));
        this._desc.html(data.weather[0].description);
        this._temp.html("".concat(Math.round(data.main.temp), "&#8451;"));
        this._feelsLike.html("".concat(Math.round(data.main.feels_like), "&#8451;"));
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
  }]);
  return WeatherWidget;
}();
$(document).ready(function () {
  var weatherWidget = new WeatherWidget({
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
});