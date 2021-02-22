"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvDomUtil = _interopRequireDefault(require("./yrvDomUtil"));

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

var _yrvParse = _interopRequireDefault(require("./yrvParse"));

var _yrvMap = _interopRequireDefault(require("./yrvMap"));

var _yrvPatch = _interopRequireDefault(require("./yrvPatch"));

var _yrvDiff = _interopRequireDefault(require("./yrvDiff"));

var _yrvElement = _interopRequireDefault(require("./yrvElement"));

var _yrvRoute = _interopRequireDefault(require("./yrvRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author yhongm
 * the 'YrvComponent' class use to 'yrv' framwork  descpration component  
 */
var YrvComponent = /*#__PURE__*/function () {
  function YrvComponent(componentParam) {
    var ismain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, YrvComponent);

    var template = componentParam.template,
        style = componentParam.style,
        props = componentParam.props,
        name = componentParam.name,
        data = componentParam.data,
        methods = componentParam.methods,
        watch = componentParam.watch,
        onRun = componentParam.onRun,
        onDomChange = componentParam.onDomChange,
        onMount = componentParam.onMount,
        onUnMount = componentParam.onUnMount,
        onInit = componentParam.onInit;
    this.isMainRvComponent = ismain;
    this.template = template.trim();
    this.name = name;

    if (this.isMainRvComponent) {
      this.name = "main";
    }

    this.isParsedHtml = false;
    this.style = style.trim();
    this._rdom = {};
    this.props = props;
    this.data = data;
    this._parentContext = undefined;
    this.methods = methods;
    this.componentRun = onRun;
    this.componentDomChange = onDomChange;
    this.componentInit = onInit;
    this.mountLifeCycle = onMount;
    this.unMountLifeCycle = onUnMount;
    this.watchObj = watch;
    this._cloneMethods = _yrvUtil["default"].cloneObj(methods);
    this._cloneWatchObj = _yrvUtil["default"].cloneObj(watch);
    this.paramObj = {}; // the paramObj

    this.belongComponentName = "main";
    this.componentkey = name;
    this._initInfo = false;
    this.componentUniqueTag = this.name; //the clone tag is unique

    this._isRender = false;
    this._isUpdate = false;
    this._isRun = false;
    this._eventListener = {};

    if (this.template.startsWith("<%%template%%>") && this.template.endsWith("<%%/template%%>")) {
      this.template = this.template.replace("<%%template%%>", "");
      this.template = this.template.replace("<%%/template%%>", "");
    } else {
      throw new Error("write error,component:" + this.name + ",html template grammar  error,the RV  framework  html template begin with <%%template%%> and end with <%%/template%%> ");
    }

    if (this.style.startsWith("<%%style%%>") && this.style.endsWith("<%%/style%%>")) {
      this.style = this.style.replace("<%%style%%>", "");
      this.style = this.style.replace("<%%/style%%>", "");
    } else {
      throw new Error("write error,component:" + this.name + ",style template grammar  error,the RV  framework  style template begin with <%%style%%> and end with <%%/style%%>");
    }

    _yrvUtil["default"].addStyle2Head(this.style, this.name);

    this._init();
  }

  _createClass(YrvComponent, [{
    key: "_init",
    value: function _init() {
      this.context = {
        componentName: this.name,
        componentData: this.data,
        componentUniqueTag: this.componentUniqueTag,
        route: undefined,
        eventListener: this._eventListener
      };
      this.parse = new _yrvParse["default"](this.context);
      this.rvDomUtil = new _yrvDomUtil["default"](this.context);
      this.observeMap = new _yrvMap["default"](this.name + "ComponentObserveMap");
      this.yrvPatch = new _yrvPatch["default"](this.context);
      this.yrvDiff = new _yrvDiff["default"](this.context);
    }
  }, {
    key: "_belong",
    value: function _belong(belongComponent) {
      this.belongComponentName = belongComponent;
    }
  }, {
    key: "getParentComponentName",
    value: function getParentComponentName() {
      return this.belongComponentName;
    }
  }, {
    key: "getComponentUniqueTag",
    value: function getComponentUniqueTag() {
      return this.componentUniqueTag;
    }
  }, {
    key: "route",
    value: function route(routeConfigs) {
      this.context.route = new _yrvRoute["default"](this.name);
      this.context.route.register(routeConfigs);
    }
  }, {
    key: "use",
    value: function use(rvComponentObjProxy) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var needClone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rvComponentObj;

      if (needClone) {
        rvComponentObj = rvComponentObjProxy["this"]._cloneNew(key);
      } else {
        rvComponentObj = rvComponentObjProxy;
      }

      this.parse.useCustomComponent(rvComponentObj);
    }
  }, {
    key: "$ref",
    value: function $ref(componentName, componentkey) {
      var componentQueue = this.parse.componentMap.get(componentName);

      if (componentQueue && componentQueue.length > 1 && componentkey) {
        return componentQueue.filter(function (component) {
          return component.key == componentkey;
        })[0];
      } else {
        return componentQueue[0];
      }
    }
  }, {
    key: "_registerEvent",
    value: function _registerEvent() {
      var _this = this;

      this._eventListener[this.name + "_routeChange"] = function (value) {
        _this.context.route.go(value);

        _this._parseHtmlTemplate(true);

        _this.context.route.getNeedRenderComponent()._rv_ev_run();

        _this._updatedom();
      };
    }
    /**
     * the '$routeChange' function only use page component
     * @param routeInfo 
     * @param parentRouteChange if true the parent page compoent route change ,if false the current page component route change
     */

  }, {
    key: "$routeChange",
    value: function $routeChange(routeInfo) {
      var parentRouteChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (parentRouteChange) {
        this.getParentContext().eventListener[this.getParentContext().componentName + "_routeChange"](routeInfo);
      } else {
        this._eventListener[this.name + "_routeChange"](routeInfo);
      }
    }
    /**
     * emit event to component 
     * @param {*} event 
     * @param {*} toParent if true emit event to parent component,if false emit event to current component
     */

  }, {
    key: "$emit",
    value: function $emit(event) {
      var toParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      /**
              * this function use to child component send event to parent component
              * *params name   this is event name
              * *params value  this is event value
              * call $sendEvent(name,value) send event
              * 
              */
      var name = event.name,
          value = event.value;

      if (toParent) {
        if (this.getParentContext() && this.getParentContext().eventListener[name]) {
          this.getParentContext().eventListener[name](value);
        }
      } else {
        if (this._eventListener[name]) {
          this._eventListener[name](value);
        }
      }
    }
    /**
     * receive event from component
     * @param event event name
     * @param fromParent if true receive event from parent component ,if false receive event from current component
     * @param callback event callback function
     * 
     */

  }, {
    key: "$on",
    value: function $on(event, callback) {
      var fromParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (fromParent) {
        if (this.getParentContext()) {
          this.getParentContext().eventListener[event] = function (value) {
            callback(value);
          };
        }
      } else {
        this._eventListener[event] = function (value) {
          callback(value);
        };
      }
    }
  }, {
    key: "_defineMethod",
    value: function _defineMethod(thatThis) {
      var _this2 = this;

      if (!thatThis) {
        thatThis = this;
      }

      var _loop = function _loop() {
        var method = _Object$keys[_i];
        _this2.methods[method] = _this2._cloneMethods[method].bind(thatThis); //the method this point to  this rv component object

        var methodHandler = {
          apply: function apply(target, thisArg, argumentsList) {
            return target(argumentsList);
          }
        };

        _this2._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this2.name, "_").concat(method))] = function (value) {
          _this2.methods[method].call(thatThis, value);
        };

        _this2._eventListener["".concat(_this2.name, "_").concat(method)] = function (value) {
          _this2.methods[method].call(thatThis, value);
        };
      };

      for (var _i = 0, _Object$keys = Object.keys(this.methods); _i < _Object$keys.length; _i++) {
        _loop();
      }

      for (var _i2 = 0, _Object$keys2 = Object.keys(this.watchObj); _i2 < _Object$keys2.length; _i2++) {
        var watchFun = _Object$keys2[_i2];
        this.watchObj[watchFun] = this._cloneWatchObj[watchFun].bind(thatThis);
      }

      var _loop2 = function _loop2() {
        var data = _Object$keys3[_i3];

        _this2._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this2.name, "_").concat(data, "change"))] = function (value) {
          _this2.data[data] = value;
        };
      };

      for (var _i3 = 0, _Object$keys3 = Object.keys(this.data); _i3 < _Object$keys3.length; _i3++) {
        _loop2();
      }
    }
  }, {
    key: "_setParentContext",
    value: function _setParentContext(context) {
      this._parentContext = context;
    }
  }, {
    key: "getParentContext",
    value: function getParentContext() {
      return this._parentContext;
    }
  }, {
    key: "_clearMethods",
    value: function _clearMethods() {
      for (var _i4 = 0, _Object$keys4 = Object.keys(this.methods); _i4 < _Object$keys4.length; _i4++) {
        var method = _Object$keys4[_i4];
        delete this.methods[method];
      }
    }
  }, {
    key: "_parseHtmlTemplate",
    value: function _parseHtmlTemplate() {
      var isforce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.isParsedHtml || isforce) {
        this.parse.parseHtmlTemplate(this.template.trim());
        this.isParsedHtml = true;
      }
    }
  }, {
    key: "_getDomTree",
    value: function _getDomTree() {
      this.parse.setComponentUniqueKey(this.componentkey + "_" + this.getComponentUniqueTag());
      return this.parse.getHtmlDom();
    }
  }, {
    key: "_getComponentContainer",
    value: function _getComponentContainer() {
      return this.parse.mComponentContainer;
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this3 = this;

      this._parseHtmlTemplate();

      this._applyRealDataVdom();

      this._yrvElement = this.rvDomUtil.getYrvElement(this._rdom, function (el, props, belong, componentUniqueTag) {
        _this3._hookRender(el, props, belong, componentUniqueTag);
      }, function (isRvent, eventPropName, evnetPropValue, value) {
        if (isRvent) {
          if (eventPropName === "watch") {
            _this3._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this3.name, "_").concat(evnetPropValue, "change"))](value);
          }
        } else {
          _this3._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this3.name, "_").concat(evnetPropValue))](value);
        }
      });
      this.w = this._yrvElement.render(this._getComponentContainer());
      this._isRender = true;
      return this.w;
    }
  }, {
    key: "_handleComponentPropEvent",
    value: function _handleComponentPropEvent(props) {
      var _this4 = this;

      Object.keys(props).forEach(function (propKey) {
        if (_yrvUtil["default"].isRvEventProp(propKey) && !_this4.methods[propKey.slice(2)]) {
          _this4.methods[propKey.slice(2)] = function (param) {
            _this4.getParentContext().eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this4.getParentContext().componentName, "_").concat(props[propKey]))](param);
          };
        }
      });
    }
  }, {
    key: "_applyRealDataVdom",
    value: function _applyRealDataVdom() {
      var _this5 = this;

      this._getComponentContainer().forEach(function (componentContainer) {
        Object.keys(componentContainer.component.props).forEach(function (componentProp) {
          var propValue = componentContainer.prop[componentProp];

          if (_yrvUtil["default"].isPlaceHolder(propValue)) {
            propValue = _this5.data[_yrvUtil["default"].getPlaceHolderValue(propValue)];
          }

          componentContainer.component.props[componentProp] = propValue;
        });

        componentContainer.component._rv_ev_domChange();
      });

      this._applyTruthFulData();
    }
  }, {
    key: "h",
    value: function h(tag, props, children) {
      return new _yrvElement["default"](tag, props, children);
    }
  }, {
    key: "_diff",
    value: function _diff(oldYrvElement, newYrvElement) {
      this.yrvDiff.setComponentContainer(this._getComponentContainer());
      this.yrvDiff.goDiff(oldYrvElement, newYrvElement);
      return this.yrvDiff.patches;
    }
  }, {
    key: "_patch",
    value: function _patch(node, patches) {
      this.yrvPatch.setComponentContainer(this._getComponentContainer());
      this.yrvPatch.apply(node, patches);
    }
  }, {
    key: "_updatedom",
    value: function _updatedom() {
      var _this6 = this;

      if (!this._isUpdate && this._isRender) {
        this._isUpdate = true;

        this._applyRealDataVdom();

        var _newYrvElement = this.rvDomUtil.getYrvElement(this._rdom, function (el, props, belong, componentUniqueTag) {
          _this6._hookRender(el, props, belong, componentUniqueTag);
        }, function (isRvent, eventPropName, evnetPropValue, value) {
          if (isRvent) {
            if (eventPropName === "watch") {
              _this6._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this6.name, "_").concat(evnetPropValue, "change"))](value);
            }
          } else {
            _this6._eventListener[_yrvUtil["default"].generateHashMNameByMName("".concat(_this6.name, "_").concat(evnetPropValue))](value);
          }
        });

        var diff = this._diff(this._yrvElement, _newYrvElement);

        this._patch(this.w, diff);

        this._yrvElement = _newYrvElement;

        this._yrvElement._calcCount(this._getComponentContainer());

        this._isUpdate = false;
      }
    }
  }, {
    key: "_hookRender",
    value: function _hookRender(el, props, belong, componentUniqueTag) {}
  }, {
    key: "_applyTruthFulData",
    value: function _applyTruthFulData() {
      this._rdom = this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom;
    }
  }, {
    key: "_rv_ev_run",
    value: function _rv_ev_run() {
      if (this.componentRun && !this._isRun) {
        if (this.context.route !== undefined) {
          this._registerEvent();
        }

        this.componentRun.call(this);
        this._isRun = true;
      }

      this.parse.componentMap.forEachKV(function (name, componentQueue) {
        componentQueue.forEach(function (component) {
          if (!component._isRun) {
            component._rv_ev_run();
          }
        });
      });

      this._getComponentContainer().forEach(function (componentInfo) {
        if (!componentInfo.component._isRun) {
          componentInfo.component._rv_ev_run();
        }
      });

      if (this.context.route !== undefined) {
        this.context.route.getRoutes().forEach(function (routeConfig) {
          //routeConfig.component._rv_ev_run()
          if (routeConfig.component.context.route !== undefined) {
            routeConfig.component._registerEvent();
          }
        });
      }
    }
  }, {
    key: "_rv_ev_init_props",
    value: function _rv_ev_init_props() {
      if (this.componentInit && !this._initInfo) {
        this.componentInit.call(this);
        this._initInfo = true;
      }
    }
    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the domtree will change ,this function will call by the yrv.js framework call
     * this event function call before the applyTruthFulData call ,so do something about data
     */

  }, {
    key: "_rv_ev_domChange",
    value: function _rv_ev_domChange() {
      this._rv_ev_init_props();

      if (this.componentDomChange) {
        this.componentDomChange.call(this, this.paramObj);
      }
    }
    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the component mount ,this function will call
     */

  }, {
    key: "_rv_ev_mount",
    value: function _rv_ev_mount() {
      if (this.mountLifeCycle) {
        this.mountLifeCycle.call(this);
      }

      this.parse.componentMap.forEachKV(function (name, componentQueue) {
        componentQueue.forEach(function (component) {
          component._rv_ev_mount();
        });
      });
    }
  }, {
    key: "_rv_ev_un_mount",
    value: function _rv_ev_un_mount() {
      if (this.unMountLifeCycle) {
        this.unMountLifeCycle.call(this);
      }

      this.parse.componentMap.forEachKV(function (name, componentQueue) {
        componentQueue.forEach(function (component) {
          component._rv_ev_un_mount();
        });
      });
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "_getDom",
    value: function _getDom() {
      return this._rdom;
    }
  }, {
    key: "_getProp",
    value: function _getProp() {
      return this.props;
    }
  }, {
    key: "_cloneData",
    value: function _cloneData() {
      return _yrvUtil["default"].clone(this.data);
    }
  }, {
    key: "_cloneNew",
    value: function _cloneNew(key) {
      var cloneObj = _yrvUtil["default"].deepinCloneObj(this);

      if (key !== "") {
        cloneObj.componentkey = key;
      }

      cloneObj.componentUniqueTag = "".concat(cloneObj.name, "_").concat(cloneObj.componentkey, "_rv_").concat(String(new Date() / 1).slice(-2)).concat(Math.round(Math.random() * 90) + 10);
      cloneObj.context = {
        componentName: cloneObj.name,
        componentData: cloneObj.data,
        componentUniqueTag: cloneObj.componentUniqueTag,
        route: this.context.route,
        eventListener: cloneObj._eventListener //the component route object not allow clone,because the route include components ,the components  will not clone by route clone
        //so the route only use in page component

      };
      cloneObj.parse.updateContext(cloneObj.context);
      cloneObj.rvDomUtil.updateContext(cloneObj.context);

      cloneObj._defineMethod(cloneObj);

      _yrvUtil["default"].observeComponent(cloneObj, function () {
        cloneObj._updatedom();
      });

      return cloneObj;
    }
  }]);

  return YrvComponent;
}();

var _default = YrvComponent;
exports["default"] = _default;