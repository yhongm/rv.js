"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YrvElement = /*#__PURE__*/function () {
  /**
   * virtual dom object constructor
   * @param {*} tag  the html tag name
   * @param {*} props  the prop (key，style..)
   * @param {*} children child data
   * @param {*} belong
   * @param {*} componentUniqueTag
   * @param {*} renderCallback the renderCallback can hook render 
   */
  function YrvElement(tag, props, children, belong, componentUniqueTag, uniqueTag, isComponent, renderCallback) {
    _classCallCheck(this, YrvElement);

    this.tag = tag;
    this.belong = belong;
    this.componentUniqueTag = componentUniqueTag;
    this.uniqueTag = uniqueTag;
    this.isComponent = isComponent;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;
    this.renderCallback = renderCallback;

    if (_yrvUtil["default"].isHtmlTag(this.tag) && !this.key) {
      throw new Error("".concat(tag, " ... html tag in component ").concat(this.belong, " the key is undefined"));
    }

    var count = 0;
    this.children.forEach(function (child) {
      if (child instanceof YrvElement) {
        count += child.count;
      }

      count++;
    });
    this.count = count;
  }
  /**
  * the method use to virtual dom  rende to real dom
  */


  _createClass(YrvElement, [{
    key: "render",
    value: function render(componentContainer) {
      var _this = this;

      var el;

      if (this.isComponent) {
        el = componentContainer.filter(function (component) {
          return component.componentUniqueTag === _this.uniqueTag;
        })[0].component._render();
      } else {
        el = document.createElement(this.tag);
        var props = this.props;

        if (this.renderCallback) {
          this.renderCallback(el, props, this.belong, this.componentUniqueTag);
        }

        this._innerHandlerProps(el, props);
      }

      this.children.forEach(function (child) {
        var childEl = child instanceof YrvElement ? child.render(componentContainer) : document.createTextNode(child);

        if (child instanceof YrvElement && child.props && "slot" in child.props) {
          _this._handleSlotDom(el, childEl, child.props.slot);
        } else {
          el.appendChild(childEl);
        }
      });

      this._calcCount(componentContainer);

      return el;
    }
  }, {
    key: "_calcCount",
    value: function _calcCount(componentContainer) {
      var _this2 = this;

      var count = 0;

      if (!this.isComponent) {
        this.children.forEach(function (child) {
          if (child instanceof YrvElement) {
            child._calcCount(componentContainer);

            if (child.isComponent) {
              var componentTemp = componentContainer.filter(function (component) {
                return component.componentUniqueTag === child.uniqueTag;
              });

              if (componentTemp.length > 0) {
                var component = componentTemp[0].component;
                count += component._yrvElement.count;
                child.count = component._yrvElement.count;
              }
            } else {
              count += child.count;
            }
          }

          count++;
        });
        this.count = count;
      } else {
        var componentTemp = componentContainer.filter(function (component) {
          return component.componentUniqueTag === _this2.uniqueTag;
        });

        if (componentTemp.length > 0) {
          var component = componentTemp[0].component;
          this.count = component._yrvElement.count;
        } else {}
      }
    }
  }, {
    key: "_handleSlotDom",
    value: function _handleSlotDom(node, slotDom, slotPosition) {
      var _this3 = this;

      var position = slotPosition;
      var positionIndex = -1;

      if (position === "default") {
        positionIndex = _yrvUtil["default"].toArray(node.childNodes).findIndex(function (childNode) {
          if (childNode.tagName !== "SLOT") {
            _this3._handleSlotDom(childNode, slotDom, slotPosition);
          }

          return childNode.tagName == "SLOT";
        });
      } else {
        positionIndex = _yrvUtil["default"].toArray(node.childNodes).findIndex(function (childNode) {
          if (childNode.tagName !== "SLOT") {
            _this3._handleSlotDom(childNode, slotDom, slotPosition);
          }

          return childNode.tagName == "SLOT" && childNode.getAttribute("name") === position;
        });
      }

      if (positionIndex > -1) {
        node.replaceChild(slotDom, node.childNodes[positionIndex]);
      }
    }
    /**
     * this method use to handle props for dom
     * 
     * @param {*} el 
     * @param {*} props 
     */

  }, {
    key: "_innerHandlerProps",
    value: function _innerHandlerProps(el, props) {
      var _this4 = this;

      var _loop = function _loop(propName) {
        if (!_yrvUtil["default"].isRvJsProp(propName)) {
          if (_yrvUtil["default"].isRvEvent(propName)) {
            evantName = propName.slice(3);

            if (evantName == "watch") {
              //this prop use to watch element value change in real time and auto to modify data
              if (el instanceof HTMLInputElement) {
                _yrvUtil["default"].addElementEventListener(el, "input", function (e) {
                  _yrvUtil["default"].createAndSendSimpleRvEvent(_yrvUtil["default"].generateHashMNameByMName("".concat(_this4.belong, "_").concat(_this4.componentUniqueTag, "_").concat(props[propName], "change")), el.value);
                });
              } else {
                console.log("RV warning:the rv-watch only use in input label");
              }
            } else {
              _yrvUtil["default"].addElementEventListener(el, evantName, function (e) {
                Object.defineProperty(e, "element", {
                  value: el
                });

                _yrvUtil["default"].createAndSendSimpleRvEvent(_yrvUtil["default"].generateHashMNameByMName("".concat(_this4.belong, "_").concat(_this4.componentUniqueTag, "_").concat(props[propName])), e);
              });
            }
          } else {
            if (props[propName] !== undefined) {
              _yrvUtil["default"].setAttr(el, propName, props[propName]);
            }
          }
        }
      };

      for (var propName in props) {
        var evantName;

        _loop(propName);
      }
    }
  }]);

  return YrvElement;
}();

var _default = YrvElement;
exports["default"] = _default;