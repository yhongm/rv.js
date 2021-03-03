"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

var _yrvElement = _interopRequireDefault(require("./yrvElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
var YrvDomUtil = /*#__PURE__*/function () {
  function YrvDomUtil(context) {
    _classCallCheck(this, YrvDomUtil);

    this.context = {}; //this Context use to save global info 

    this.index = 0;
    this.indexArrayOp = [];
  }

  _createClass(YrvDomUtil, [{
    key: "updateContext",
    value: function updateContext(newContext) {
      this.context = newContext;
    }
  }, {
    key: "getYrvElement",
    value: function getYrvElement(virtualDom, renderCallback, eventCallback) {
      var _this = this;

      var children = [];

      for (var child in virtualDom.children) {
        var childVirtualDom = virtualDom.children[child];

        if (childVirtualDom instanceof Array) {
          childVirtualDom.forEach(function (singleChildDom) {
            children.push(_this.getYrvElement(singleChildDom, renderCallback, eventCallback));
          });
        } else if (childVirtualDom instanceof Object) {
          children.push(this.getYrvElement(childVirtualDom, renderCallback, eventCallback));
        } else {
          children.push(childVirtualDom);
        }
      }

      return new _yrvElement["default"](virtualDom.tag, virtualDom.props, children, virtualDom.belong, virtualDom.componentUniqueTag, virtualDom.uniqueTag, virtualDom.isComponent, renderCallback, eventCallback);
    }
  }, {
    key: "applyTruthfulData",
    value: function applyTruthfulData(dom) {
      var _this2 = this;

      if ("for" in dom.props) {
        var dataArray = [];
        var dataSingle;

        if (_yrvUtil["default"].isForIn(dom.props['for'])) {
          if ("childDomDatakey" in dom) {
            dataArray = dom.data;
            dataSingle = dom.childDomDatakey;
          } else if ("domDataKey" in dom) {
            if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
              dataArray = dom.data;
              dataSingle = dom.props['for'].split(" _in_ ")[0];
            } else {
              throw new Error("domData key error");
            }
          } else {
            var forExpressRight = dom.props['for'].split(" _in_ ")[1];

            if (_yrvUtil["default"].isDotOperatorExpression(forExpressRight)) {
              var forERKey = forExpressRight.split(".")[0];
              var forERValue = forExpressRight.split(".")[1];

              if (forERKey in this.context.componentData) {
                dataArray = this.context.componentData[forERKey][forERValue];
              } else {
                throw new Error("the for directive use error,the Dot Operator Express only in global context data");
              }
            } else {
              dataArray = this.context.componentData[forExpressRight];
            }

            dataSingle = dom.props['for'].split(" _in_ ")[0];
          }
        } else {
          throw new Error("the for directive use error");
        }

        var objs = [];

        if (dataArray) {
          dataArray.forEach(function (data) {
            var obj = _this2.vdom2rdom(dom, data, dataSingle);

            if (obj.props.hasOwnProperty("for")) {
              // warning, goto there,tell me the DOM used 'for' directive ,we need to  delete 'for' props 
              //警告,运行到此处已经说明处理过for指令。删除for指令,避免不同组件通过此for指令寻找不属于他的真实数据,会引发异常
              //todo props childDomData ,domData
              delete obj.props["for"];
            }

            if (obj.props.hasOwnProperty("domData")) {
              delete obj.props.domData;
            }

            objs.push(obj);
          });
        } else {
          throw new Error("the for directive only use in Array data");
        }

        var vDomObj = {
          isFor: true,
          rdom: objs
        };
        return vDomObj;
      } else {
        var data;
        var childDomDatakey;

        if ("data" in dom) {
          data = dom.data;
          childDomDatakey = dom.childDomDatakey;
        } else {
          data = this.context.componentData;
          childDomDatakey = undefined;
        }

        var obj = this.vdom2rdom(dom, data, childDomDatakey);
        var _vDomObj = {
          isFor: false,
          rdom: obj
        };
        return _vDomObj;
      }
    }
    /**
     * virtual dom 2 real data dom
     * @param {*} dom 
     * @param {*} data 
     * @param {*} dataSingle 
     * @param {*} tdata 
     */

  }, {
    key: "vdom2rdom",
    value: function vdom2rdom(dom, data, dataSingle) {
      this.index += 1;
      var obj = {};
      obj.tag = dom.tag;
      obj.children = [];
      obj.props = {};
      obj.belong = dom.belong;
      obj.componentUniqueTag = dom.componentUniqueTag;
      obj.uniqueTag = dom.uniqueTag;
      obj.isComponent = dom.isComponent;
      var props = Object.keys(dom.props);

      for (var prop in props) {
        var value = props[prop];

        if (value === "style") {
          var style = dom.props[value];

          if (style.indexOf(";") > -1) {
            var styles = style.split(";");
            obj.props[value] = this.handleArrayStyle(data, styles, dataSingle);
          } else {
            obj.props[value] = this.handleSingleStyle(data, style, dataSingle);
          }
        } else {
          if (_yrvUtil["default"].isPlaceHolder(dom.props[value])) {
            var propValue = _yrvUtil["default"].getPlaceHolderValue(dom.props[value]);

            if (!_yrvUtil["default"].isDotOperatorExpression(propValue)) {
              obj.props[value] = data[propValue];
            } else {
              var propKey = propValue.split(".")[0];
              var propValue = propValue.split(".")[1];

              if (propKey in this.context.componentData) {
                obj.props[value] = this.context.componentData[propKey][propValue];
              } else {
                obj.props[value] = data[propValue];
              }
            }
          } else if (_yrvUtil["default"].isOperatorExpression(dom.props[value])) {
            obj.props[value] = _yrvUtil["default"].getOperatorExpression(dom.props[value], data, dataSingle, this.context);
          } else {
            obj.props[value] = dom.props[value];
          }
        }
      }

      for (var child in dom.children) {
        if (_yrvUtil["default"].isString(dom.children[child])) {
          if (_yrvUtil["default"].isPlaceHolder(dom.children[child])) {
            var childValue = _yrvUtil["default"].getPlaceHolderValue(dom.children[child]);

            if (!_yrvUtil["default"].isDotOperatorExpression(childValue)) {
              obj.children[child] = _yrvUtil["default"].getNotUndefinedContent(data[childValue]);
            } else {
              var childValueKey = childValue.split(".")[0];
              var childValueValue = childValue.split(".")[1];

              if (childValueKey in this.context.componentData) {
                obj.children[child] = _yrvUtil["default"].getNotUndefinedContent(this.context.componentData[childValueKey][childValueValue]);
              } else {
                obj.children[child] = _yrvUtil["default"].getNotUndefinedContent(data[childValueValue]);
              }
            }
          } else if (_yrvUtil["default"].isOperatorExpression(dom.children[child])) {
            obj.children[child] = _yrvUtil["default"].getNotUndefinedContent(_yrvUtil["default"].getOperatorExpression(dom.children[child], data, dataSingle, this.context));
          } else {
            obj.children[child] = _yrvUtil["default"].getNotUndefinedContent(dom.children[child]);
          }
        } else {
          if (dom.children[child] instanceof Object) {
            if ("childDomData" in dom.props) {
              if (dom.props.childDomData == "$this") {
                dom.children[child].data = data;
              } else {
                dom.children[child].childDomDatakey = dom.props.childDomData;
                dom.children[child].data = data;
              }
            } else if ("domData" in dom.props) {
              if ("nofor" in dom.children[child].props) {
                dom.children[child].data = data;
              } else {
                dom.children[child].domDataKey = dom.props.domData;
                dom.children[child].data = data;
              }
            }
          }

          var domObj = this.applyTruthfulData(dom.children[child]);

          if (domObj.isFor) {
            domObj.rdom.forEach(function (rdom) {
              obj.children.push(rdom);
            });
          } else {
            obj.children[child] = domObj.rdom;
          }
        }
      }

      return obj;
    }
  }, {
    key: "handleSingleStyle",
    value: function handleSingleStyle(data, style, dataSingle) {
      var newStyle = '';

      if (dataSingle) {
        var styleKey = style.split(":")[0];
        var styleValue = style.split(":")[1];

        if (_yrvUtil["default"].isPlaceHolder(styleValue)) {
          if (_yrvUtil["default"].getPlaceHolderValue(styleValue).indexOf(dataSingle) != -1) {
            newStyle = styleKey + ":" + data[_yrvUtil["default"].getPlaceHolderValue(styleValue).split(".")[1]];
          } else {
            newStyle = styleKey + ":" + data[_yrvUtil["default"].getPlaceHolderValue(styleValue)];
          }
        } else {
          newStyle = style;
        }
      } else {
        var _styleKey = style.split(":")[0];
        var _styleValue = style.split(":")[1];

        if (_yrvUtil["default"].isPlaceHolder(_styleValue)) {
          newStyle = _styleKey + ":" + data[_yrvUtil["default"].getPlaceHolderValue(_styleValue)];
        } else {
          newStyle = style;
        }
      }

      return newStyle;
    }
  }, {
    key: "handleArrayStyle",
    value: function handleArrayStyle(data, styles, dataSingle) {
      var newStyleArray = "";

      var _iterator = _createForOfIteratorHelper(styles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var style = _step.value;
          var newStyle = this.handleSingleStyle(data, style, dataSingle);
          newStyleArray += newStyle + ";";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return newStyleArray;
    }
  }]);

  return YrvDomUtil;
}();

var _default = YrvDomUtil;
exports["default"] = _default;