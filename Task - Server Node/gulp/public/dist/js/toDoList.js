'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ORIGIN = "http://localhost:5001";
var ToDo = /*#__PURE__*/function () {
  function ToDo(_ref) {
    var _this = this;
    var _input = _ref._input,
      _list = _ref._list,
      _form = _ref._form,
      _savePanel = _ref._savePanel,
      _addPanel = _ref._addPanel,
      _panelsCheckbox = _ref._panelsCheckbox,
      _priorityOptions = _ref._priorityOptions;
    _classCallCheck(this, ToDo);
    _defineProperty(this, "_onDeleteButtonClick", function (id) {
      document.querySelector('.controls__delete').addEventListener('click', function (e) {
        _this._deleteToDo(e, id);
      });
    });
    _defineProperty(this, "_deleteToDo", function (e, id) {
      var toDo = e.target.closest('.toDoList__toDoItem');
      toDo.remove();
      this._deleteFromServer(id);
    });
    _defineProperty(this, "_disableSavePanel", function () {
      this._savePanel.classList.add('disabled');
    });
    this._input = _input;
    this._list = _list;
    this._form = _form;
    this._savePanel = _savePanel;
    this._addPanel = _addPanel;
    this._panelsCheckbox = _panelsCheckbox;
    this._priorityOptions = _priorityOptions;
  }
  _createClass(ToDo, [{
    key: "init",
    value: function init() {
      this._onSubmit();
      this._keepSavePanelDisabled();
      this._toggleAddNewTask();
      this._hideInput();
      this._keepInputFocused();
      this._loadFromServer();
    }
  }, {
    key: "_loadFromServer",
    value: function () {
      var _loadFromServer2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        var _this2 = this;
        var response, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(id ? "".concat(ORIGIN, "/todos/").concat(id) : "".concat(ORIGIN, "/todos"), {
                  method: "GET"
                });
              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();
              case 5:
                data = _context.sent;
                if (id) {
                  this._addToDo(data);
                } else {
                  data.forEach(function (todo) {
                    _this2._addToDo(todo);
                  });
                }
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _loadFromServer(_x) {
        return _loadFromServer2.apply(this, arguments);
      }
      return _loadFromServer;
    }()
  }, {
    key: "_loadToServer",
    value: function () {
      var _loadToServer2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(todo) {
        var response, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch("".concat(ORIGIN, "/todos"), {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(todo)
                });
              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.json();
              case 5:
                data = _context2.sent;
                this._loadFromServer(data._id);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _loadToServer(_x2) {
        return _loadToServer2.apply(this, arguments);
      }
      return _loadToServer;
    }()
  }, {
    key: "_updateToServer",
    value: function () {
      var _updateToServer2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(todo) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetch("".concat(ORIGIN, "/todos/").concat(todo.id), {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "PUT",
                  body: JSON.stringify(todo)
                });
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function _updateToServer(_x3) {
        return _updateToServer2.apply(this, arguments);
      }
      return _updateToServer;
    }()
  }, {
    key: "_deleteFromServer",
    value: function () {
      var _deleteFromServer2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return fetch("".concat(ORIGIN, "/todos/").concat(id), {
                  method: "DELETE"
                });
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function _deleteFromServer(_x4) {
        return _deleteFromServer2.apply(this, arguments);
      }
      return _deleteFromServer;
    }()
  }, {
    key: "_getJSONTodo",
    value: function _getJSONTodo() {
      return {
        text: this._input.value,
        checked: false,
        priority: this._getSelectedPriority()
      };
    }
  }, {
    key: "_onSubmit",
    value: function _onSubmit() {
      var _this3 = this;
      this._form.addEventListener('submit', function (event) {
        event.preventDefault();
        var todo = _this3._getJSONTodo();
        var value = _this3._input.value;
        if (value) {
          _this3._loadToServer(todo);
        }
        _this3._input.value = '';
        _this3._resetPriority();
        _this3._disableSavePanel();
        _this3._panelsCheckbox.checked = '';
      });
    }
  }, {
    key: "_addToDo",
    value: function _addToDo(todo) {
      var selectedPriority = todo ? todo.priority : this._getSelectedPriority();
      var toDo = this._createTodo(todo ? todo.text : this._input.value, selectedPriority);
      this._list.insertAdjacentHTML('afterbegin', toDo);
      this._onCompleteCheckboxChange(todo ? todo._id : '');
      this._onDeleteButtonClick(todo ? todo._id : '');
      if (todo.checked) {
        document.querySelector('.js--toDoItem-form__checkbox').checked = 'checked';
        this._completeToDo();
      }
    }
  }, {
    key: "_createTodo",
    value: function _createTodo(toDoText, selectedPriority) {
      return "\n            <div class=\"toDoList__toDoItem toDoItem\">\n                <form class=\"toDoItem__form toDoItem-form\" action=\"#\">\n                    <label class=\"toDoItem-form__label\" >\n                        <input class=\"toDoItem-form__checkbox js--toDoItem-form__checkbox\" type=\"checkbox\" name=\"toDoItem-form__checkbox\">\n                        <div class=\"toDoItem-form__text-priority\">\n                            <p class=\"toDoItem-form__text\">".concat(toDoText, "</p>\n                            <span class=\"toDoItem-form__priority toDoItem-form__priority_").concat(selectedPriority.toLowerCase(), "\">").concat(selectedPriority, "</span>\n                        </div>\n                        <div class=\"toDoItem-form__controls controls\">\n                            <button class=\"controls__edit\" type=\"button\"><img class=\"pencil-icon\" src=\"./src/images/pencil.svg\" alt=\"\"></button>\n                            <button class=\"controls__delete\" type=\"button\"><img class=\"bucket-icon\" src=\"./src/images/bucket.svg\" alt=\"\"></button>\n                        </div>\n                    </label>\n                </form>\n            </div>\n        ");
    }
  }, {
    key: "_onCompleteCheckboxChange",
    value: function _onCompleteCheckboxChange(id) {
      var _this4 = this;
      document.querySelector('.js--toDoItem-form__checkbox').addEventListener('change', function (e) {
        return _this4._completeToDo(e.target, id);
      });
    }
  }, {
    key: "_completeToDo",
    value: function _completeToDo(checkbox, id) {
      var toDoCheckbox = checkbox || document.querySelector('.js--toDoItem-form__checkbox');
      var toDoText = toDoCheckbox.nextElementSibling.firstElementChild;
      var toDoItem = toDoCheckbox.closest('.toDoItem');
      toDoText.classList.toggle('completed');
      toDoCheckbox.checked ? this._list.appendChild(toDoItem) : this._list.insertBefore(toDoItem, this._list.firstElementChild);
      if (id) {
        var todo = {
          text: toDoText.textContent,
          checked: toDoCheckbox.checked ? true : false,
          priority: toDoText.nextElementSibling.textContent,
          id: id
        };
        this._updateToServer(todo);
      }
    }
  }, {
    key: "_keepSavePanelDisabled",
    value:
    //Keeping Save Panel disabled until the value is not empty
    function _keepSavePanelDisabled() {
      var _this5 = this;
      this._input.addEventListener('input', function () {
        if (_this5._input.value === '') {
          _this5._savePanel.classList.add('disabled');
        } else {
          _this5._savePanel.classList.remove('disabled');
        }
      });
    }
  }, {
    key: "_makeInputFocused",
    value: function _makeInputFocused() {
      this._input.focus();
    }
  }, {
    key: "_toggleAddNewTask",
    value: function _toggleAddNewTask() {
      var _this6 = this;
      this._addPanel.addEventListener('click', function (event) {
        _this6._panelsCheckbox.checked = 'true';
        _this6._makeInputFocused();
      });
    }
  }, {
    key: "_hideInput",
    value: function _hideInput() {
      var _this7 = this;
      document.querySelector('.container').addEventListener('click', function (event) {
        if (event.target.parentElement !== _this7._addPanel && !event.target.className.includes('input') && !event.target.className.includes('save')) {
          _this7._panelsCheckbox.checked = '';
        }
      });
    }
  }, {
    key: "_getSelectedPriority",
    value: function _getSelectedPriority() {
      var selectedPriority;
      this._priorityOptions.forEach(function (option) {
        if (option.checked) {
          selectedPriority = option.nextElementSibling.textContent;
        }
      });
      return selectedPriority;
    }
  }, {
    key: "_resetPriority",
    value: function _resetPriority() {
      this._priorityOptions[0].checked = 'true';
    }
  }, {
    key: "_keepInputFocused",
    value: function _keepInputFocused() {
      var _this8 = this;
      this._priorityOptions.forEach(function (option) {
        option.addEventListener('change', function () {
          _this8._makeInputFocused();
        });
      });
    }
  }]);
  return ToDo;
}();
document.addEventListener('DOMContentLoaded', function () {
  var toDo = new ToDo({
    _input: document.querySelector('.js--toDoList-form__input_add'),
    _list: document.querySelector('.js--toDoList'),
    _form: document.querySelector('.js--toDoList__form'),
    _savePanel: document.querySelector('.js--toDoList-form__label_save'),
    _addPanel: document.querySelector('.toDoList-form__label_add'),
    _panelsCheckbox: document.querySelector('.js--toDoList-form__checkbox'),
    _priorityOptions: document.querySelectorAll('.js--priority__input')
  });
  toDo.init();
});