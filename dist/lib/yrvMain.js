"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

var _yrvComponent = _interopRequireDefault(require("./yrvComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @author yhongm
 * the 'RV' class is the 'yrv' framwork main entrance
 */
var RV = /*#__PURE__*/function (_YrvComponent) {
  _inherits(RV, _YrvComponent);

  var _super = _createSuper(RV);

  function RV(el, componentParam) {
    var _this;

    _classCallCheck(this, RV);

    _this = _super.call(this, componentParam);
    _this.el = el;
    return _this;
  }
  /**
   * run rv
   */


  _createClass(RV, [{
    key: "run",
    value: function run(callback) {
      var root = _yrvUtil["default"].isString(this.el) ? document.querySelector(this.el) : this.el;
      root.appendChild(this._render());
      callback(this);

      this._updatedom();

      this._rv_ev_run();
    }
    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */

  }], [{
    key: "component",
    value: function component(option) {
      return new Proxy(new _yrvComponent["default"](option, false), {
        set: function set(obj, prop, value) {
          obj[prop] = value;
          return true;
        },
        get: function get(obj, prop) {
          if (prop === "this") {
            return obj;
          } // if (prop.startsWith("_")) {
          //     // throw new Error("the prop start with _ is a inner function or data,please not call that")
          //     return
          // }


          return obj[prop];
        },
        apply: function apply(target, thisArg, argumentsList) {
          target(argumentsList);
        }
      });
    }
  }]);

  return RV;
}(_yrvComponent["default"]);

var _default = RV;
exports["default"] = _default;