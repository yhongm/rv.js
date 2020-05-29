"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yrvUtil = require("./yrvUtil");

var _yrvUtil2 = _interopRequireDefault(_yrvUtil);

var _yrvComponent = require("./yrvComponent");

var _yrvComponent2 = _interopRequireDefault(_yrvComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author yhongm
 * the 'RV' class is the 'yrv' framwork main entrance
 */
var RV = function (_YrvComponent) {
    _inherits(RV, _YrvComponent);

    function RV(el, componentParam) {
        _classCallCheck(this, RV);

        var _this = _possibleConstructorReturn(this, (RV.__proto__ || Object.getPrototypeOf(RV)).call(this, componentParam));

        _this.el = el;
        return _this;
    }
    /**
     * run rv
     */


    _createClass(RV, [{
        key: "run",
        value: function run(callback) {
            var root = _yrvUtil2.default.isString(this.el) ? document.querySelector(this.el) : this.el;
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
            return new Proxy(new _yrvComponent2.default(option, false), {
                set: function set(obj, prop, value) {
                    obj[prop] = value;
                    return true;
                },
                get: function get(obj, prop) {
                    if (prop === "this") {
                        return obj;
                    }
                    // if (prop.startsWith("_")) {
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
}(_yrvComponent2.default);

exports.default = RV;