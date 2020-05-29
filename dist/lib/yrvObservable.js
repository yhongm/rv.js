"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YrvObservable = /*#__PURE__*/function () {
  function YrvObservable(name) {
    _classCallCheck(this, YrvObservable);

    this.name = name;
    this.updateFunctions = [];
  }

  _createClass(YrvObservable, [{
    key: "add",
    value: function add(observableUpdate) {
      this.updateFunctions.push(observableUpdate);
    }
  }, {
    key: "has",
    value: function has(observableUpdate) {
      return observableUpdate in this.updateFunctions;
    }
  }, {
    key: "invoke",
    value: function invoke() {
      this.updateFunctions.forEach(function (fun) {
        fun();
      });
    }
  }]);

  return YrvObservable;
}();

var _default = YrvObservable;
exports["default"] = _default;