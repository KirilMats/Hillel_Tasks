"use strict";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
document.addEventListener('DOMContentLoaded', function () {
  var User = /*#__PURE__*/function () {
    function User() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Error';
      var fName = arguments.length > 1 ? arguments[1] : undefined;
      var lName = arguments.length > 2 ? arguments[2] : undefined;
      var age = arguments.length > 3 ? arguments[3] : undefined;
      _classCallCheck(this, User);
      for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        args[_key - 4] = arguments[_key];
      }
      this.userData = [id, fName, lName, age].concat(args);
    }
    _createClass(User, [{
      key: "checkCount",
      value: function checkCount() {
        this.userData.length < 5 ? console.error('Less than 5 arguments') : '';
      }
    }, {
      key: "getFirstThree",
      value: function getFirstThree() {
        console.log(this.userData.slice(0, 3).join('-'));
      }
    }, {
      key: "getAllAfterThird",
      value: function getAllAfterThird() {
        var allAfterThird = new Map();
        this.userData.slice(3).forEach(function (el, i) {
          typeof el === "undefined" ? el = 'Error' : '';
          allAfterThird.set(i, el);
        });
        console.log(allAfterThird);
      }
    }]);
    return User;
  }();
  var userData = [undefined, 'Nick', 'Fix', 23, 'Married', 'Employed', '+123432456', 180];
  var user = _construct(User, userData);
  user.checkCount();
  user.getFirstThree();
  user.getAllAfterThird();
});