"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * the map object use to save likily (key,value) data
 */
var YrvMap = /*#__PURE__*/function () {
  function YrvMap(name) {
    _classCallCheck(this, YrvMap);

    this.length = 0;
    this.name = name;
    this.map = new Object();
  }

  _createClass(YrvMap, [{
    key: "put",
    value: function put(key, value) {
      if (!(key in this.map)) {
        this.length++;
      }

      this.map[key] = value;
    }
  }, {
    key: "get",
    value: function get(key) {
      return key in this.map ? this.map[key] : null;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (key in this.map) {
        delete this.map[key];
        this.length--;
      }
    }
  }, {
    key: "hasKey",
    value: function hasKey(key) {
      return key in this.map;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      var _this = this;

      Object.keys(this.map).forEach(function (mapKey) {
        callback(_this.map[mapKey]);
      });
    }
  }, {
    key: "forEachKV",
    value: function forEachKV(callback) {
      var _this2 = this;

      Object.keys(this.map).forEach(function (mapKey) {
        callback(mapKey, _this2.map[mapKey]);
      });
    }
    /*
    * filter value by callback()
      if callback return true 
     */

  }, {
    key: "filterV",
    value: function filterV(callback) {
      var value = undefined;
      this.forEachKV(function (k, v) {
        if (callback(k, v) == true) {
          value = v;
        } else {}
      });
      return value;
    }
  }, {
    key: "size",
    value: function size() {
      return this.length;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.length = 0;
      this.map = new Object();
    }
  }]);

  return YrvMap;
}();

var _default = YrvMap;
exports["default"] = _default;